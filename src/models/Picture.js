const { Model, DataTypes } = require('sequelize')

class Picture extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            size: DataTypes.NUMBER,
            key: DataTypes.STRING,
            url: DataTypes.STRING,
            is_deleted: DataTypes.BOOLEAN
        }, {
            sequelize,
            modelName: 'ta_picture',
            freezeTableName: true

        })

    }

    static associate(models) {
        this.belongsTo(models.tb_user, { foreignKey: 'user_id', as: 'user'})
        this.hasMany(models.ta_available, { foreignKey: 'house_id', as: 'house'})
    }

}

module.exports = Picture