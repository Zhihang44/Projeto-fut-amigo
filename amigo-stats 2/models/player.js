const { Model, DataTypes } = require('sequelize');

class Player extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nickname: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
      nationality: DataTypes.STRING,
      document: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      position: DataTypes.STRING,
      shirtNumber: DataTypes.INTEGER,
      foot: {
        type: DataTypes.ENUM('Direito', 'Esquerdo', 'Ambos'),
        defaultValue: 'Direito'
      },
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM('Ativo', 'Lesionado', 'Suspenso', 'Aposentado'),
        defaultValue: 'Ativo'
      },
      contractEnd: DataTypes.DATEONLY,
      notes: DataTypes.TEXT,
      profileImage: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'players',
      tableName: 'players',
      timestamps: true,
      underscored: true
    });
    return this;
  }

  static associate(models) {
    // Exemplo: Um jogador pertence a um clube
    // this.belongsTo(models.clubs, { foreignKey: 'clubId', as: 'club' });
    // Um jogador tem muitas imagens
    // this.hasMany(models.player_images, { foreignKey: 'playerId', as: 'images' });
  }
}

module.exports = Player;