const { Model, DataTypes } = require('sequelize');

class user extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM('admin', 'user'),
      lastLogin: DataTypes.DATE,
    }, {
      sequelize,
       timestamps: true,
       underscored: true,
    })
  }
  /*static associate(models){
    User.hasOne(models.UserPreference, { foreignKey: 'userId' });
    models.UserPreference.belongsTo(User, { foreignKey: 'userId' });
  }*/
}

module.exports = user;