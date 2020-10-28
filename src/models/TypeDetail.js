const { Model, DataTypes } = require('sequelize')

class TypeDetail extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING(50),
            description: DataTypes.TEXT,
            is_deleted: DataTypes.BOOLEAN
        }, {
            sequelize,
            modelName: 'td_type_detail',
            freezeTableName: true

        })

    }

    static associate(models) {
        this.belongsTo(models.tb_user, { foreignKey: 'user_id', as: 'user'})
    }

}

module.exports = TypeDetail