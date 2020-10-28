const { Model, DataTypes } = require('sequelize')

class Detail extends Model {
    static init(sequelize) {
        super.init({
            description: DataTypes.TEXT,
            number: DataTypes.INTEGER,
            is_deleted: DataTypes.BOOLEAN
        }, {
            sequelize,
            modelName: 'ta_detail',
            freezeTableName: true

        })

    }

    static associate(models) {
        this.belongsTo(models.tb_house, { foreignKey: 'house_id', as: 'house'})
        this.belongsTo(models.tb_user, { foreignKey: 'type_detail_id', as: 'type_detail'})
    }

}

module.exports = Detail