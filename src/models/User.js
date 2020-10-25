const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING(50),
            email: DataTypes.STRING(50),
            password: DataTypes.STRING(50),
            cellphone: DataTypes.STRING(12),
            cpf: DataTypes.STRING(12),
            address: DataTypes.STRING(1000),
            is_deleted: DataTypes.BOOLEAN
        }, {
            sequelize,
            modelName: 'tb_user',
            freezeTableName: true

        })

    }


}

module.exports = User