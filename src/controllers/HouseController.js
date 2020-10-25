const User = require('../models/User')
const House = require('../models/House')

module.exports = {

    async createHouse(req, res) {

        const { user_id } = req.params

        const { land_size, price, address, description, number_bedroom, number_bath, local, to_sell } = req.body

        const user = await User.findByPk(user_id)

        if (!user || user.is_deleted == true) {
            return res.status(400).json({ err: 'User not found' })
        }

        const house = await House.create({  user_id, land_size, price, address, description, number_bedroom, number_bath, local, to_sell })

        return res.json(house)
    }

}