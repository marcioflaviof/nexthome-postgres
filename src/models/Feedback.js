const { Model, DataTypes } = require("sequelize");

class Feedback extends Model {
    static init(sequelize) {
        super.init(
            {
                score: DataTypes.INTEGER,
                description: DataTypes.TEXT,
                is_deleted: DataTypes.BOOLEAN,
            },
            {
                sequelize,
                modelName: "tb_feedback",
                freezeTableName: true,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.tb_user, { foreignKey: "user_id", as: "user" });
        this.belongsTo(models.tb_house, {
            foreignKey: "house_id",
            as: "house",
        });
    }
}

module.exports = Feedback;
