const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING(50),
                email: DataTypes.STRING(50),
                password: {
                    type: DataTypes.STRING,
                    set(pwd) {
                        const salt = bcrypt.genSaltSync(8);
                        const password = bcrypt.hashSync(pwd, salt);
                        this.setDataValue("password", password);
                    },
                },
                cellphone: DataTypes.STRING(12),
                cpf: DataTypes.STRING(12),
                address: DataTypes.STRING(1000),
                is_deleted: DataTypes.BOOLEAN,
            },
            {
                sequelize,
                modelName: "tb_user",
                freezeTableName: true,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.ta_picture, {
            foreignKey: "user_id",
            as: "picture",
        });
    }
}

module.exports = User;
