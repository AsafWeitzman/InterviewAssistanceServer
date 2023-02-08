module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("password", hash(value));
      },
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.InterviewProcess);
  };
  return User;
};
