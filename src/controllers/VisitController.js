const { where } = require('sequelize')
const House = require('../models/House')
const User = require('../models/User')
const Visit = require('../models/Visit')

module.exports = {

    async getVisit(req, res) {
        const visit = await Visit.findByPk(req.params.id)

        if (!visit || visit.is_deleted == true) {
            return res.status(400).json({ err: 'Visit not found' })
        }
        
        return res.json(visit)
    },


    async createVisit(req, res) {

        const { day_hour_visit, is_confirmed } = req.body
        const {house_id, user_id} = req.params

        const house = await House.findByPk(house_id)
        const user = await User.findByPk(user_id)
        if (!house || house.is_deleted == true || !user || user.is_deleted == true) {
            return res.status(400).json({ err: 'House not found' })
        }

        const visit  = await Visit.create({ house_id, user_id, day_hour_visit, is_confirmed })

        return res.json({inserted: visit})
    },

   
    async updateVisit(req, res) {

        const { day_hour_visit, is_confirmed } = req.body
        const { id } = req.params

        const visit = await Visit.findOne({where: {
            id: id}, 
            include: {association: 'house', include: {association: 'owner'}}})

        console.log(visit)
        
        if(!visit || visit.is_deleted == true) {
            return res.status(400).json({ err: 'Appointment not found' })
        }
        
        
        
        visit.update({ day_hour_visit, is_confirmed })

        return res.json(visit)
    },



}