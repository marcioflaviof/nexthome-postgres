const Local = require("../models/Local");

module.exports = {
    async getLocal(req, res) {
        const local = await Local.findByPk(req.params.id, {
            include: ["local", "localType"],
        });

        if (!local || local.is_deleted == true) {
            return res.status(400).json({ err: "Local not found" });
        }

        return res.json(local);
    },

    async createLocal(req, res) {
        const { local_type_id, local_id, name } = req.body;
        let local;

        try {
            local = await Local.create({
                local_type_id,
                local_id,
                name,
            });
        } catch (error) {
            return res.status(400).json({ err: error.message });
        }

        return res.json(local);
    },

    async updateLocal(req, res) {
        const id = req.params.id;
        const { local_type_id, local_id, name } = req.body;

        const local = await Local.findByPk(id);

        if (!local || local.is_deleted == true) {
            return res.status(400).json({ err: "Local not found" });
        }

        local.update({ local_type_id, local_id, name });

        return res.json(local);
    },

    async deleteLocal(req, res) {
        const id = req.params.id;

        const local = await Local.findByPk(id);

        if (!local) {
            return res.status(400).json({ err: "Local not found" });
        }

        local.update({ is_deleted: true });

        return res.json(local);
    },
};
