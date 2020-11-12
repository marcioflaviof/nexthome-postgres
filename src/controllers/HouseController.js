const User = require("../models/User");
const House = require("../models/House");
const bcrypt = require("bcryptjs");

module.exports = {
    async getHouse(req, res) {
        const house = await House.findOne({
            where: { id: req.params.id },
            include: ["owner", "house_picture", "house_detail"],
        });
        if (!house || house.is_deleted == true) {
            return res.status(400).json({ err: "House not found" });
        }

        return res.json(house);
    },

    async getHouses(req, res) {
        const houses = await House.findAll({
            where: { is_deleted: false },
            include: ["owner", "house_picture"],
        });

        return res.json(houses);
    },

    async createHouse(req, res) {
        const { user_id } = req.params;
        const {
            land_size,
            price,
            address,
            description,
            number_bedroom,
            number_bath,
            local,
            to_sell,
        } = req.body;
        const user = await User.findByPk(user_id);
        if (!user || user.is_deleted == true) {
            return res.status(400).json({ err: "User not found" });
        }

        let house;

        try {
            house = await House.create({
                user_id,
                land_size,
                price,
                address,
                description,
                number_bedroom,
                number_bath,
                local,
                to_sell,
            });
        } catch (error) {
            return res.status(400).json({ err: error.message });
        }

        return res.json(house);
    },

    async updateHouse(req, res) {
        const id = req.params.id;
        const {
            password,
            land_size,
            price,
            address,
            description,
            number_bedroom,
            number_bath,
            local,
            to_sell,
        } = req.body;

        const house = await House.findOne({
            where: { id: id },
            include: "owner",
        });

        if (!house || house.is_deleted == true) {
            return res.status(400).json({ err: "House not found" });
        }

        if (!bcrypt.compareSync(password, house.owner.password)) {
            return res.status(400).json({ err: "Wrong password" });
        }

        house.update({
            land_size,
            price,
            address,
            description,
            number_bedroom,
            number_bath,
            local,
            to_sell,
        });

        return res.json(house);
    },

    async deleteHouse(req, res) {
        const id = req.params.id;

        const { password } = req.body;

        const house = await House.findOne({
            where: { id: id },
            include: "owner",
        });

        if (!house || house.is_deleted == true) {
            return res.status(400).json({ err: "House not found" });
        }

        if (!bcrypt.compareSync(password, house.owner.password)) {
            return res.status(400).json({ err: "Wrong password" });
        }

        house.update({ is_deleted: true });

        return res.json(house);
    },
};
