const House = require("../models/House");
const Available = require("../models/Available");
const bcrypt = require("bcryptjs");
const date = require("date-and-time");

module.exports = {
    async createAvailable(req, res) {
        const { house_id } = req.params;

        const { initial_hour, final_hour, day_week } = req.body;

        const house = await House.findByPk(house_id);
        if (!house || house.is_deleted == true) {
            return res.status(400).json({ err: "House not found" });
        }
        // como regra de negócio só permitiremos cadastrar um dia da semana uma unica vez
        const available = await Available.findOne({
            where: { day_week: day_week, house_id: house_id },
        });
        if (available) {
            return res.status(400).json({ err: "Available already exists" });
        }

        let inserted_available;

        try {
            inserted_available = await Available.create({
                house_id,
                initial_hour,
                final_hour,
                day_week,
            });
        } catch (error) {
            return res.status(400).json({ err: error.message });
        }

        return res.json({ inserted_available });
    },

    async getDayAvailable(req, res) {
        const { house, day } = req.params;

        const date = new Date(day);

        const available = await Available.findOne({
            where: {
                house_id: house,
                day_week: date.getDay(),
                is_deleted: "false",
            },
        });
        return res.json(available);
    },

    async getHouseAvailable(req, res) {
        const { house } = req.params;
        const availables = await House.findAll({
            where: { id: house, is_deleted: "false" },
            attributes: ["id", "address", "description"],
            include: {
                association: "availables",
                attributes: ["initial_hour", "final_hour", "day_week"],
                where: { is_deleted: "false" },
            },
            order: [["availables", "day_week", "ASC"]],
        });
        return res.json(availables);
    },

    async getHours(req, res) {
        const { house_id, day } = req.params;

        let hours = [];
        let now = new Date(day);
        now.setDate(now.getDate() + 1);

        const available = await Available.findOne({
            where: {
                house_id: house_id,
                day_week: now.getDay(),
                is_deleted: "false",
            },
        });
        for (
            let index = available.initial_hour;
            index < available.final_hour;
            index++
        ) {
            now.setHours(index);
            hours.push(date.format(now, "YYYY/MM/DD HH:mm:ss"));
        }

        return res.json({ horas: hours });
    },

    async getDates(req, res) {
        const { house_id, day, range } = req.params;
        let now = new Date(day);
        now.setDate(now.getDate() + 1);

        if (range >= 31) {
            return res.status(400).json({ err: "No máximo 1 mês" });
        }

        let days = [];

        for (let index = 0; index < range; index++) {
            var available = await Available.findOne({
                where: {
                    house_id: house_id,
                    day_week: now.getDay(),
                    is_deleted: "false",
                },
            });
            try {
                for (
                    let index = available.initial_hour;
                    index < available.final_hour;
                    index++
                ) {
                    now.setHours(index);
                    days.push(date.format(now, "YYYY/MM/DD HH:mm:ss"));
                }
            } catch {}
            now.setDate(now.getDate() + 1);
        }

        return res.json({ dias: days });
    },

    async getNext(req, res) {
        const { house_id } = req.params;

        let now = new Date();
        now.setDate(now.getDate() + 1);

        try {
            for (let index = 0; index < 30; index++) {
                var available = await Available.findOne({
                    where: {
                        house_id: house_id,
                        day_week: now.getDay(),
                        is_deleted: "false",
                    },
                });

                if (available) {
                    return res.json(available);
                }
                now.setDate(now.getDate() + 1);
            }
        } catch (err) {
            return res.status(400).json({ err: err });
        }

        return res.status(400).json({ err: "Não há horários disponíveis" });
    },

    async updateAvailable(req, res) {
        const { id } = req.params;
        const { password, initial_hour, final_hour, day_week } = req.body;
        const available = await Available.findOne({
            where: {
                id: id,
                day_week: day_week,
            },
            include: {
                association: "house",
                include: { association: "owner" },
            },
        });

        if (!available || available.is_deleted == true) {
            return res.status(400).json({ err: "Available not found" });
        }

        if (!bcrypt.compareSync(password, available.house.owner.password)) {
            return res.status(400).json({ err: "Wrong password" });
        }

        available.update({ initial_hour, final_hour });

        return res.json(available);
    },

    async deleteAvailable(req, res) {
        const id = req.params.id;

        const { password } = req.body;

        const available = await Available.findOne({
            where: { id: id },
            include: {
                association: "house",
                include: { association: "owner" },
            },
        });

        if (!available || available.is_deleted == true) {
            return res.status(400).json({ err: "Available not found" });
        }

        if (
            !password ||
            !bcrypt.compareSync(password, available.house.owner.password)
        ) {
            return res.status(400).json({ err: "Wrong password" });
        }

        available.update({ is_deleted: true });

        return res.json(available);
    },
};
