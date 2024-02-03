module.exports = (sequelize, DataTypes) => {
  const SiteDesignConfig = sequelize.define(
    "SiteDesignConfig",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wants_appointmentScheduling: {
        type: DataTypes.TINYINT,
        defaultValue: false,
        allowNull: false,
      },
      // web message -----------
      wants_webMessage: {
        type: DataTypes.TINYINT,
        defaultValue: false,
        allowNull: false,
      },
      text_webMessage: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      type_webMessage: {
        type: DataTypes.ENUM("success", "info", "warning", "error"),
        allowNull: true,
      },
      isProminent_webMessage: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      isDense_webMessage: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      // ---------------------
    },
    {
      tableName: "site-design-config",
      timestamps: false,
    }
  );

  return SiteDesignConfig;
};
