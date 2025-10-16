const { Model, DataTypes } = require('sequelize');

class club extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      shortName: DataTypes.STRING,
      founded: DataTypes.INTEGER,
      country: DataTypes.STRING,
      location: DataTypes.STRING,
      league: DataTypes.STRING,
      stadium: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      president: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING,
      phone: DataTypes.STRING,
      primaryColor: DataTypes.STRING,
      secondaryColor: DataTypes.STRING,
      description: DataTypes.TEXT,
      logo: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = club;