const User = require('../models/User')
const House = require('../models/House')
const Picture = require("../models/Picture")


module.exports = {

    async createImage(req, res) {

        const { originalname: name, size, filename: key} = req.file
    
        const { user_id, house_id } = req.params
    
        try {
            const picture = await Picture.create({ user_id, house_id, name, size, key, url:'' })
            return res.json(picture)
        } catch (error) {
            return res.status(400).json({ err: error.message })
        }
        
    }
}