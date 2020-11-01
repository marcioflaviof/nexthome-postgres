require('dotenv').config()
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
            freezeTableName: true,
            hooks: {
                beforeCreate: (picture, options) => {
                    if(process.env.LOCAL){
                        if(!picture.url){
                            picture.url = `http://${process.env.DB_HOST}:${process.env.PORT}/files/${picture.key}`
                        } else {
                            if(!picture.url){
                                picture.url = `http://${process.env.DB_H_HOST}:${process.env.DB_H_PORT}/files/${picture.key}`
                        }
                    }
                }
            }
        }

    })

}

    static associate(models) {
        this.belongsTo(models.tb_user, { foreignKey: 'user_id', as: 'user'})
        this.hasMany(models.ta_available, { foreignKey: 'house_id', as: 'house'})
    }

}


module.exports = Picture