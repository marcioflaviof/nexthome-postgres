const { Model, DataTypes } = require("sequelize");

class Available extends Model {
  static init(sequelize) {
    super.init(
      {
        house_id: DataTypes.INTEGER,
        initial_hour: DataTypes.INTEGER,
        final_hour: DataTypes.INTEGER,
        day_week: DataTypes.INTEGER,
        is_deleted: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: "ta_available",
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.tb_house, { foreignKey: "house_id", as: "house" });
  }
}

module.exports = Available;
