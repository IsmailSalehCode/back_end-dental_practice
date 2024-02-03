module.exports = (sequelize, DataTypes) => {
  const ContactForm = sequelize.define(
    "ContactForm",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(300),
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: false,
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(22),
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING(1000),
      },
    },
    {
      tableName: "contact-forms",
      timestamps: true,
    }
  );
  return ContactForm;
};
