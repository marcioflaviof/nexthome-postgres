const { Model, DataTypes } = require('sequelize')

class Visit extends Model {
    static init(sequelize) {
        super.init({
            day_hour_visit: DataTypes.DATE,
            is_confirmed: DataTypes.BOOLEAN,
            is_deleted: DataTypes.BOOLEAN
        }, {
            sequelize,
            modelName: 'ta_visit',
            freezeTableName: true

        })

    }

    static associate(models) {
        this.belongsTo(models.tb_user, { foreignKey: 'user_id', as: 'user'})
        this.belongsTo(models.tb_user, { foreignKey: 'house_id', as: 'house'})
    }

}

module.exports = Visit