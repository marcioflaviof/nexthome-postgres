const Detail = require('../models/Detail')
const House = require('../models/House')
const TypeDetail = require('../models/TypeDetail')

module.exports = {

    async getDetail(req, res) {
        const detail = await Detail.findByPk(req.params.id, {include:["house","type_detail"]})
        if (!detail || detail.is_deleted) {
            return res.status(400).json({ err: 'Type detail not found' })
        }
        
        return res.json(detail)
    },

    async createDetail(req, res) {

        const { house_id, type_detail_id } = req.params
        const { description, number } = req.body
        const house = await House.findByPk(house_id)
        const type_detail = await TypeDetail.findByPk(type_detail_id)
        if (!house || house.is_deleted) {
            return res.status(400).json({ err: 'House not found' })
        }

        if (!type_detail || type_detail.is_deleted) {
            return res.status(400).json({ err: 'Type Detail not found'})
        }

        let detail

        try {
            detail = await Detail.create({ house_id, type_detail_id, description, number })
            
        } catch (error) {
            return res.status(400).json({ err: error.message })
        }

        return res.json(detail)
    },

    async updateDetail(req, res) {

        const id = req.params.id
        const { description, number } = req.body

        const detail = await Detail.findOne({where: {id: id}, include: 'user', include: 'type_detail'})
        
        if(!detail || detail.is_deleted) {
            return res.status(400).json({ err: 'Type of detail not found' })
        }
        
        detail.update({ description, number })

        return res.json(detail)
    },

    async deleteDetail(req, res) {
        const id = req.params.id

        const detail = await Detail.findByPk(id)

        if(!detail || detail.is_deleted) {
            return res.status(400).json({ err: 'Detail not found' })
        }

        detail.update({is_deleted:true})
        
        return res.json(detail)
    }

}
