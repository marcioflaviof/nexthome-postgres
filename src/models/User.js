const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            cellphone: DataTypes.STRING,
            cpf: DataTypes.STRING,
            address: DataTypes.STRING,
            is_deleted: DataTypes.BOOLEAN
        }, {
            sequelize,
            modelName: 'tb_user',
            freezeTableName: true

        })

    }

}

module.exports = User