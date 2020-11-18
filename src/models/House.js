const { Model, DataTypes } = require("sequelize");

class House extends Model {
    static init(sequelize) {
        super.init(
            {
                land_size: DataTypes.STRING(30),
                price: DataTypes.FLOAT,
                address: DataTypes.STRING(1000),
                description: DataTypes.STRING(1000),
                number_bedroom: DataTypes.INTEGER,
                number_bath: DataTypes.INTEGER,
                to_sell: DataTypes.BOOLEAN,
                is_deleted: DataTypes.BOOLEAN,
            },
            {
                sequelize,
                modelName: "tb_house",
                freezeTableName: true,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.tb_user, { foreignKey: "user_id", as: "owner" });
        this.hasMany(models.ta_available, {
            foreignKey: "house_id",
            as: "availables",
        });
        this.hasMany(models.ta_picture, {
            foreignKey: "house_id",
            as: "house_picture",
        });
        this.hasMany(models.ta_detail, {
            foreignKey: "house_id",
            as: "house_detail",
        });

        this.hasMany(models.ta_visit, {
            foreignKey: "house_id",
            as: "house_visit",
        });
    }
}

module.exports = House;
