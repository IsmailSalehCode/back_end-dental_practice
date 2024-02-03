module.exports = (sequelize, DataTypes) => {
  const B_Details = sequelize.define(
    "B_Details",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      workingHours: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(300),
      },
    },
    {
      tableName: "business-details",
      timestamps: false,
    }
  );

  return B_Details;
};
