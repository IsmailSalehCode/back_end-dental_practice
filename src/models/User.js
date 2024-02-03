module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: true,
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(22),
      },
      otherContact: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },
      role: {
        type: DataTypes.ENUM("Manager", "Employee"),
        allowNull: false,
      },
      enabled: {
        allowNull: false,
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  User.prototype.comparePassword = function (password) {
    // return bcrypt.compareAsync(password, this.password)
    return password == this.password;
  };
  return User;
};
