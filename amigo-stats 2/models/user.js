const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM('admin', 'user'),
      lastLogin: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'users',
      timestamps: true,
      underscored: true,
    })
    return this;
  }
}

module.exports = User;