const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

module.exports = {
    async getUsers(req, res) {
        const users = await User.findAll({
            where: { is_deleted: false },
            include: "user_picture",
        });

        return res.json(users);
    },

    async getUser(req, res) {
        const user = await User.findOne({
            where: { id: req.params.id, is_deleted: false },
            include: "user_picture",
        });

        if (!user) {
            return res.status(400).json({ err: "User not found" });
        }

        return res.json(user);
    },

    async createUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, cellphone, cpf, address } = req.body;

        let user = await User.findOne({
            where: { email: email, is_deleted: false },
        });

        if (user) {
            return res.status(400).json({ err: "Couldn't register this user" });
        }
        try {
            user = await User.create({
                name,
                email,
                password,
                cellphone,
                cpf,
                address,
            });
        } catch (error) {
            return res.status(400).json({ err: error.message });
        }

        return res.json(user);
    },

    async updateUser(req, res) {
        const id = req.params.id;
        const { name, email, password, cellphone, cpf, address } = req.body;

        const user = await User.findByPk(id);

        if (!user || user.is_deleted == true) {
            return res.status(400).json({ err: "User not found" });
        }

        if (
            user.email == email &&
            bcrypt.compareSync(password, user.password)
        ) {
            user.update({ name, password, cellphone, cpf, address });

            return res.json(user);
        }

        return res.status(400).json({ err: "Can't update" });
    },

    async deleteUser(req, res) {
        const id = req.params.id;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({ err: "User not found" });
        }

        user.update({ is_deleted: true });

        return res.json(user);
    },
};
