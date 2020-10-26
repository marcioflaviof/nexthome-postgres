const User = require('../models/User')

module.exports = {
    async getUsers(req, res) {
        const users = await User.findAll()

        return res.json(users)
    },

    async getUser(req, res) {
        const user = await User.findByPk(req.params.id)

        if (!user || user.is_deleted == true) {
            return res.status(400).json({ err: 'User not found' })
        }
        
        return res.json(user)
    },

    async createUser(req, res) {
        const { name, email, password, cellphone, cpf, address } = req.body

        const user = await User.create({  name, email, password, cellphone, cpf, address })

        return res.json(user)
    },

    async updateUser(req, res) {
        const id = req.params.id
        const { name, email, password, cellphone, cpf, address } = req.body

        const user = await User.findByPk(id)
        
        if(!user || user.is_deleted == true) {
            return res.status(400).json({ err: 'User not found' })
        }

        if (user.email == email && user.password == password) {
            user.update({ id, name, password, cellphone, cpf, address })

            return res.json(user)
        }


        return res.status(400).json({ err: "Can't update"})
    },

    async deleteUser(req, res) {
        const id = req.params.id
        const { email, password } = req.body

        const user = await User.findByPk(id)

        if(!user) {
            return res.status(400).json({ err: 'User not found' })
        }

        if (user.email == email && user.password == password) {
            

            user.update({is_deleted:true})

            return res.json(user)
        }


        return res.status(400).json({ err: "Can't delete" })
    }
}