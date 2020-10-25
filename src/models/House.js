const { Model, DataTypes } = require('sequelize')

class House extends Model {
    static init(sequelize) {
        super.init({
            land_size: DataTypes.STRING(30),
            price: DataTypes.FLOAT,
            address: DataTypes.STRING(1000),
            description: DataTypes.STRING(1000),
            number_bedroom: DataTypes.INTEGER,
            number_bath: DataTypes.INTEGER,
            to_sell: DataTypes.BOOLEAN,
            is_deleted: DataTypes.BOOLEAN
        }, {
            sequelize,
            modelName: 'tb_house',
            freezeTableName: true

        })

    }

    static associate(models) {
        this.belongsTo(models.tb_user, { foreignKey: 'user_id', as: 'owner'})
    }

}

module.exports = House