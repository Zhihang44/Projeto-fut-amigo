const { Model, DataTypes } = require('sequelize');

class userPreference extends Model{
  static init(sequelize){
    super.init({
      userId: DataTypes.INTEGER,
      emailNotifications: DataTypes.BOOLEAN,
      twoFactorAuth: DataTypes.BOOLEAN,
      theme: DataTypes.ENUM('light', 'dark', 'system'),
      language: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models){
    userPreference.belongsTo(models.User, { foreignKey: 'userId' });
  } 

}

module.exports = userPreference;