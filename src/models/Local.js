const { Model, DataTypes } = require("sequelize");

class Local extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        is_deleted: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: "tb_local",
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.tb_local, { foreignKey: "local_id", as: "local" });
    this.hasMany(models.td_local_type, {
      foreignKey: "local_type_id",
      as: "localType",
    });
  }
}

module.exports = Local;
