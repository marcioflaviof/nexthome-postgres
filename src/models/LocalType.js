const { Model, DataTypes } = require("sequelize");

class LocalType extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(50),
        is_deleted: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: "td_local_type",
        freezeTableName: true,
      }
    );
  }
}

module.exports = LocalType;
