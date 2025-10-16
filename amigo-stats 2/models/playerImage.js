const { Model, DataTypes } = require('sequelize');

class playerImage extends Model{
  static init(sequelize){
    super.init({
      playerId: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = playerImage;