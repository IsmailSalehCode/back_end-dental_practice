const validCaptcha = require("./policies/validCaptcha");
const CFExists = require("./policies/CFExists");
const AFExists = require("./policies/AFExists");
const UserExists = require("./policies/UserExists");
const AppointmentDateTimeExists = require("./policies/AppointmentDateTimeExists");
const AppointmentDateTimeHasNotBeenTaken = require("./policies/AppointmentDateTimeHasNotBeenTaken");
const CFPolicy = require("./policies/CFPolicy");
const AuthPolicy = require("./policies/AuthPolicy");
const AuthController = require("./controllers/AuthController");
const ContactFormController = require("./controllers/ContactFormController");
const isAuthenticated = require("./policies/isAuthenticated");
const isManager = require("./policies/isManager");
const AppointmentPolicy = require("./policies/AppointmentPolicy");
const AppointmentController = require("./controllers/AppointmentController");
const UserController = require("./controllers/UserController");
const BusinessDetailsController = require("./controllers/BusinessDetailsController");
const SiteDesignConfigController = require("./controllers/SiteDesignConfigController");
module.exports = (app) => {
  // Site design config|wants appointment system to show, web alert
  app.get("/site-config-details", SiteDesignConfigController.get);
  app.patch(
    "/site-config-details",
    isAuthenticated,
    isManager,
    SiteDesignConfigController.edit
  );
  // Business details-wokring hours, phone for now
  app.get("/business-details", BusinessDetailsController.get);
  app.patch(
    "/business-details",
    isAuthenticated,
    isManager,
    BusinessDetailsController.edit
  );
  // ===================================
  //AUTH================================
  app.post("/login", AuthPolicy.login, validCaptcha, AuthController.login);
  // Only manager can register new users
  app.post(
    "/register",
    isAuthenticated,
    isManager,
    AuthPolicy.register,
    AuthController.register
  );

  app.get("/users", isAuthenticated, isManager, UserController.getUsers);

  app.patch(
    "/users/toggle/:id",
    isAuthenticated,
    isManager,
    UserExists,
    UserController.toggleUser
  );

  app.delete(
    "/users/delete/:id",
    isAuthenticated,
    isManager,
    UserExists,
    UserController.deleteUser
  );

  app.patch(
    "/users/edit/:id",
    isAuthenticated,
    isManager,
    UserExists,
    UserController.editUser
  );
  //=====================================
  //APPOINTMENTS=========================

  //anyone can get available datetimes
  app.get("/available-datetimes", AppointmentController.getAvailableDateTimes);

  //anyone can post/make an appointment
  app.post(
    "/appointment",
    AppointmentPolicy.addForm,
    AppointmentDateTimeExists,
    AppointmentDateTimeHasNotBeenTaken,
    AppointmentController.addForm
  );

  //Authenticated can make AppointmentDateTimes
  app.post(
    "/appointment-datetime",
    isAuthenticated,
    AppointmentPolicy.addDateTime,
    AppointmentController.addDateTime
  );
  //Auth can get all AppointmentDateTimes
  app.get(
    "/all-datetimes",
    isAuthenticated,
    AppointmentController.getDateTimes
  );
  //Auth can delete AppointmentDateTimes
  app.delete(
    "/appointment-datetime/delete/:id",
    isAuthenticated,
    AppointmentDateTimeExists,
    AppointmentController.deleteDateTime
  );

  //Auth can get specific Appointment
  app.get(
    "/specific-appointment/:id",
    isAuthenticated,
    AFExists,
    AppointmentController.getSpecificForm
  );

  //Auth can delete appointments
  app.delete(
    "/appointments/delete/:id",
    isAuthenticated,
    AFExists,
    AppointmentController.deleteForm
  );
  //=====================================
  //CONTACT FORM=========================
  //anyone can post/fill in a contact form
  app.post(
    "/contact-forms",
    CFPolicy.add,
    validCaptcha,
    ContactFormController.add
  );

  //Аuthenticated can get/check out cfs
  app.get("/all-contact-forms", isAuthenticated, ContactFormController.get);

  //Authenticated can delete cfs
  app.delete(
    "/contact-forms/delete/:id",
    isAuthenticated,
    CFExists,
    ContactFormController.delete
  );
  //=====================================
};
