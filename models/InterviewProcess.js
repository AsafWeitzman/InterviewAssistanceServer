module.exports = (sequelize, DataTypes) => {
  const InterviewProcess = sequelize.define("InterviewProcess", {
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    step: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateAndTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatWentWell: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatCanBeImproved: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    actionItems: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return InterviewProcess;
};
