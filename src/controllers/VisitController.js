const House = require("../models/House");
const User = require("../models/User");
const Visit = require("../models/Visit");
const bcrypt = require("bcryptjs");
const { Op, where } = require("sequelize");

module.exports = {
    async getVisit(req, res) {
        const visit = await Visit.findByPk(req.params.id);

        if (!visit || visit.is_deleted == true) {
            return res.status(400).json({ err: "Visit not found" });
        }

        return res.json(visit);
    },

    async getVisitByUser(req, res) {
        const { user_id } = req.params;

        let visit;

        try {
            visit = await Visit.findAll({
                where: {
                    user_id: user_id,
                    is_deleted: false,
                },
                include: ["house", "user"],
                order: ["day_hour_visit"],
            });
        } catch (err) {
            return res.status(400).json({ err: err });
        }

        if (!visit) {
            return res.status(400).json({ err: "Visit not found" });
        }

        return res.json(visit);
    },

    async getVisitBySeller(req, res) {
        const { user_id } = req.params;

        let visits = [];

        try {
            visits = await House.findAll({
                where: {
                    user_id: user_id,
                    is_deleted: false,
                },
                include: {
                    association: "house_visit",
                    where: { is_deleted: false },
                    include: {
                        association: "user",
                        attributes: ["id", "name", "email", "cellphone"],
                    },

                    attributes: [
                        "day_hour_visit",
                        "is_confirmed",
                        "house_id",
                        "id",
                    ],
                    where: { is_deleted: false },
                },
            });
        } catch (err) {
            return res.status(400).json({ err: err });
        }

        return res.json({ houses: visits });
    },

    async createVisit(req, res) {
        const { day_hour_visit } = req.body;
        const { house_id, user_id } = req.params;

        let is_confirmed = false;

        const house = await House.findByPk(house_id);
        const user = await User.findByPk(user_id);

        if (!house || house.is_deleted == true) {
            return res.status(400).json({ err: "House not found" });
        }

        if (!user || user.is_deleted == true) {
            return res.status(400).json({ err: "User not found" });
        }

        let visit;

        try {
            visit = await Visit.create({
                house_id,
                user_id,
                day_hour_visit,
                is_confirmed,
            });
        } catch (error) {
            return res.status(400).json({ err: error.message });
        }

        return res.json(visit);
    },

    async updateVisitConfirmed(req, res) {
        const { id } = req.params;

        let is_confirmed = true;

        const visit = await Visit.findOne({
            where: {
                id: id,
                is_deleted: false,
            },
            include: {
                association: "house",
                include: { association: "owner" },
            },
        });

        if (!visit) {
            return res.status(400).json({ err: "Appointment not found" });
        }

        const date = visit.day_hour_visit;
        const house = visit.house_id;

        await Visit.update(
            { is_deleted: true },
            {
                where: {
                    [Op.and]: [{ day_hour_visit: date }, { house_id: house }],
                },
            }
        );
        visit.update({ is_confirmed: true });
        await Visit.update({ is_deleted: false }, { where: { id: id } });

        return res.json(visit);
    },

    async updateVisitHour(req, res) {
        const { day_hour_visit } = req.body;
        const { id } = req.params;

        let is_confirmed = false;

        const visit = await Visit.findOne({
            where: {
                id: id,
                is_deleted: false,
            },
            include: {
                association: "house",
                include: { association: "owner" },
            },
        });

        if (!visit || visit.is_deleted == true) {
            return res.status(400).json({ err: "Appointment not found" });
        }

        visit.update({ day_hour_visit, is_confirmed });
        return res.json(visit);
    },

    async deleteVisit(req, res) {
        const { id } = req.params;

        const visit = await Visit.findOne({
            where: {
                id: id,
                is_deleted: false,
            },
            include: {
                association: "house",
                include: { association: "owner" },
            },
        });

        if (!visit) {
            return res.status(400).json({ err: "Appointment not found" });
        }

        visit.update({ is_deleted: true });

        return res.json(visit);
    },
};
