const { Model, DataTypes } = require('sequelize');

class UserPreference extends Model {
  static init(sequelize) {
    super.init({
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      emailNotifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      twoFactorAuth: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      theme: {
        type: DataTypes.ENUM('light', 'dark', 'system'),
        defaultValue: 'system'
      },
      language: {
        type: DataTypes.STRING,
        defaultValue: 'pt-BR'
      }
    }, {
      sequelize,
      modelName: 'user_preferences',
      tableName: 'user_preferences',
      timestamps: true,
      underscored: true
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
  }
}

module.exports = UserPreference;