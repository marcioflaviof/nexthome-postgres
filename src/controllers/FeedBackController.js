const Feedback = require("../models/Feedback");

module.exports = {
    async getFeedback(req, res) {
        const { user_id, house_id } = req.params;

        let feedback;

        if (user_id != 0 && house_id != 0) {
            return res
                .status(400)
                .json({ err: "Must choose one user or house" });
        } else if (user_id != 0) {
            feedback = await Feedback.findByPk(user_id);
        } else if (house_id != 0) {
            feedback = await Feedback.findByPk(house_id);
        }

        if (!feedback || feedback.is_deleted) {
            return res.status(400).json({ err: "Feedback not found" });
        }

        return res.json(feedback);
    },

    async createFeeedback(req, res) {
        const { user_id, house_id, score, description } = req.body;

        if (user_id && house_id) {
            return res
                .status(400)
                .json({ err: "Must choose one user or house" });
        }

        let feedback;

        try {
            feedback = Feedback.create(user_id, house_id, score, description);
        } catch (err) {
            return res.status(400).json({ err: err });
        }

        return res.json(feedback);
    },

    async updateFedback(req, res) {
        const id = req.params.id;
        const { score, description } = req.body;

        const feedback = await Feedback.findOne({
            where: { id: id },
            include: "user",
            include: "house",
        });

        if (!feedback || feedback.is_deleted) {
            return res.status(400).json({ err: "Feedback not found" });
        }

        feedback.update({ score, description });

        return res.json(feedback);
    },

    async deleteFeedback(req, res) {
        const id = req.params.id;

        const feedback = await Feedback.findByPk(id);

        if (!feedback || feedback.is_deleted) {
            return res.status(400).json({ err: "Feedback not found" });
        }

        feedback.update({ is_deleted: true });

        return res.json(feedback);
    },
};
