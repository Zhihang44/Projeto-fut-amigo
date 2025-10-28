const { Model, DataTypes } = require('sequelize');

class Club extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shortName: DataTypes.STRING,
      founded: DataTypes.INTEGER,
      country: DataTypes.STRING,
      location: DataTypes.STRING,
      league: DataTypes.STRING,
      stadium: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      president: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      website: DataTypes.STRING,
      phone: DataTypes.STRING,
      primaryColor: DataTypes.STRING,
      secondaryColor: DataTypes.STRING,
      description: DataTypes.TEXT,
      logo: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'clubs',
      tableName: 'clubs',
      timestamps: true,
      underscored: true
    });
    return this;
  }

  static associate(models) {
    // Um clube tem muitos jogadores
    this.hasMany(models.players, { foreignKey: 'clubId', as: 'players' });
  }
}

module.exports = Club;