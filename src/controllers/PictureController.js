const User = require("../models/User");
const House = require("../models/House");
const Picture = require("../models/Picture");
const { where } = require("sequelize");

module.exports = {
    async getImage(req, res) {
        const picture = await Picture.findAll({ where: { is_deleted: false } });

        return res.json(picture);
    },

    async createImage(req, res) {
        const { originalname: name, size, filename: key } = req.file;

        const { user_id, house_id } = req.params;

        const user = await User.findOne({
            where: { id: user_id, is_deleted: false },
        });
        const house = await House.findOne({
            where: { id: house_id, is_deleted: false },
        });

        const picture = await Picture.findOne({
            where: {
                user_id: user_id,
            },
        });

        if (picture) {
            return res.status(400).json({ err: "Already have an image" });
        }

        if (!user && !house) {
            return res
                .status(400)
                .json({ err: "It's necessary one user or house" });
        } else {
            try {
                if (user) {
                    const picture = await Picture.create({
                        user_id,
                        name,
                        size,
                        key,
                        url: "",
                    });
                    return res.json(picture);
                }

                if (house) {
                    const picture = await Picture.create({
                        house_id,
                        name,
                        size,
                        key,
                        url: "",
                    });
                    return res.json(picture);
                }
            } catch (error) {
                return res.status(400).json({ err: error.message });
            }
        }
    },

    async deleteImage(req, res) {
        const picture = await Picture.findByPk(req.params.id);

        if (!picture) {
            return res.status(400).json({ err: "Picture not found" });
        }

        picture.destroy();

        return res.status(200).json({ deleted: true });
    },
};
