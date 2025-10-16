const { Model, DataTypes } = require('sequelize');

class player extends Model{
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
      nationality: DataTypes.STRING,
      document: DataTypes.STRING,
      email: DataTypes.STRING,
      position: DataTypes.STRING,
      shirtNumber: DataTypes.INTEGER,
      foot: DataTypes.ENUM('Direito', 'Esquerdo', 'Ambos'),
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      status: DataTypes.ENUM('Ativo', 'Lesionado', 'Suspenso', 'Aposentado'),
      contractEnd: DataTypes.DATEONLY,
      notes: DataTypes.TEXT,
      profileImage: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = player;