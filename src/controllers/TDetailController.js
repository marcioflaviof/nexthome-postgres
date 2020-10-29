const TDetail = require('../models/TypeDetail')
const User = require('../models/User')

module.exports = {

    async getTDetail(req, res) {
        const tdetail = await TDetail.findByPk(req.params.id)
        if (!tdetail || tdetail.is_deleted) {
            return res.status(400).json({ err: 'Type detail not found' })
        }
        
        return res.json(tdetail)
    },

    async createTDetail(req, res) {

        const { user_id } = req.params
        const { name, description } = req.body
        const user = await User.findByPk(user_id)
        if (!user || user.is_deleted == true) {
            return res.status(400).json({ err: 'User not found' })
        }

        const tdetail = await TDetail.create({ user_id, name, description })

        return res.json(tdetail)
    },

    async updateTDetail(req, res) {

        const id = req.params.id
        const { name, description } = req.body

        const tdetail = await TDetail.findOne({where: {id: id}, include: 'user'})
        
        if(!tdetail || tdetail.is_deleted) {
            return res.status(400).json({ err: 'Type of detail not found' })
        }
        
        tdetail.update({ name, description })

        return res.json(tdetail)
    },

    async deleteTDetail(req, res) {
        const id = req.params.id

        const tdetail = await TDetail.findByPk(id)

        if(!tdetail || tdetail.is_deleted) {
            return res.status(400).json({ err: 'Type of detail not found' })
        }

        tdetail.update({is_deleted:true})
        
        return res.json(tdetail)
    }

}
