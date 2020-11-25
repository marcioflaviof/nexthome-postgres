const User = require("../models/User");
const House = require("../models/House");
const Available = require("../models/Available");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { max } = require("../models/House");

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

    async getUserHouses(req, res) {
        const { user_id } = req.params;
        const houses = await House.findAll({
            where: {
                user_id: user_id,
                is_deleted: false,
            },
        });

        if (!houses) return res.status(400).json({ err: "House not found" });

        return res.json(houses);
    },

    async getOneUserHouse(req, res) {
        const { user_id, house_id } = req.params;

        let houses;

        try {
            houses = await House.findOne({
                where: {
                    user_id: user_id,
                    house_id: house_id,
                    is_deleted: false,
                },
            });
        } catch (error) {
            return res.status(400).json({ err: error });
        }

        if (!houses) return res.status(400).json({ err: "House not found" });

        return res.json(houses);
    },

    async getHousesFilter(req, res) {
        let { to, min_price, max_price, bed, bath } = req.body;
        let array_and = [{ is_deleted: false }];

        if (to != null) {
            array_and.push({ to_sell: to });
        }

        if (bed >= 1) {
            array_and.push({ number_bedroom: bed });
        }

        if (bath >= 1) {
            array_and.push({ number_bath: bath });
        }

        if (!min_price || min_price < 0) {
            min_price = 0;
        }

        if (!max_price || max_price < 0) {
            max_price = 9999999999999999;
        }

        array_and.push({ price: { [Op.between]: [min_price, max_price] } });

        const houses = await House.findAll({
            where: { [Op.and]: array_and },
        });

        if (!houses) return res.status(400).json({ err: "House not found" });

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
            initial_hour,
            final_hour,
            day_week,
        } = req.body;
        const user = await User.findByPk(user_id);
        if (!user || user.is_deleted == true) {
            return res.status(400).json({ err: "User not found" });
        }

        let house = new House();
        let available;

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

            const house_id = house.id;

            available = await Available.create({
                house_id,
                initial_hour,
                final_hour,
                day_week,
            });
        } catch (error) {
            return res.status(400).json({ err: error.message });
        }

        return res.json({ house: house, available: available });
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
            is_deleted: false,
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
            is_deleted: false,
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
