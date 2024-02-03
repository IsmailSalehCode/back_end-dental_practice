module.exports = async function (req, res, next) {
  //req.obj from AppointmentDateTimeExists
  const obj = req.obj;
  const taken = obj.appointmentFormId != null;
  if (taken) {
    console.log(
      "appointmentdatetime with id " + obj.id + " has been already taken"
    );
    return res.sendStatus(404);
    //user sees: your calendar is out of date, it will now be refreshed
  } else {
    return next();
  }
};
