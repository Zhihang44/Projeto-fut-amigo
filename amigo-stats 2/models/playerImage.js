const { Model, DataTypes } = require('sequelize');

class PlayerImage extends Model {
  static init(sequelize) {
    super.init({
      playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'players',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'player_images',
      tableName: 'player_images',
      timestamps: true,
      underscored: true
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.players, { foreignKey: 'playerId', as: 'player' });
  }
}

module.exports = PlayerImage;