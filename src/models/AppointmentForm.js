module.exports = (sequelize, DataTypes) => {
  const AppointmentForm = sequelize.define(
    "AppointmentForm",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      //Have you visited us before?
      isNewPatient: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      //What can we help you with?
      helpWith: {
        type: DataTypes.ENUM(
          "not sure",
          "emergency/tooth pain",
          "dental implants consult",
          "invisalign consult",
          "teeth whitening",
          "teeth cleaning adult",
          "teeth cleaning child"
        ),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(22),
        allowNull: false,
      },
      //Is there anything else we should know?
      message: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: "appointment-forms",
      timestamps: true,
    }
  );

  return AppointmentForm;
};
