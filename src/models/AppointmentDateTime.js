module.exports = (sequelize, DataTypes) => {
  const AppointmentDateTime = sequelize.define(
    "AppointmentDateTime",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "appointment-datetimes",
      timestamps: false,
    }
  );
  AppointmentDateTime.associate = function (models) {
    AppointmentDateTime.belongsTo(models.AppointmentForm, {
      foreignKey: "appointmentFormId",
      defaultValue: null,
      onDelete: "set null",
      //onDelete CASCADE ->undesired effect-> on delete appointment form -> appointment datetime gets deleted
      //i want it the other way around
      //appointment datetime deleted -> appointment form deleted
      //so that when an appointment form gets deleted, the appointment datetime simply becomes available (green). If the appointment datetime is deleted and it has a Form associated, borth
      //fixed by deleting the associated form (if there is one) in the async function (delete datetime)
    });
  };
  return AppointmentDateTime;
};
