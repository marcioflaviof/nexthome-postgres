const User = require("../models/User");
const House = require("../models/House");
const Picture = require("../models/Picture");

module.exports = {
  async getImage(req, res) {
    const picture = await Picture.findAll({ where: { is_deleted: false } });

    return res.json(picture);
  },

  async createImage(req, res) {
    const { originalname: name, size, filename: key } = req.file;

    const { user_id, house_id } = req.params;

    const user = await User.findByPk(user_id);
    const house = await House.findByPk(house_id);

    if (!user && !house) {
      return res.status(400).json({ err: "It's necessary one user or house" });
    } else {
      try {
        const picture = await Picture.create({
          user_id,
          house_id,
          name,
          size,
          key,
          url: "",
        });
        return res.json(picture);
      } catch (error) {
        return res.status(400).json({ err: error.message });
      }
    }
  },

  async deleteImage(req, res) {
    const picture = await Picture.findByPk(req.params.id);

    picture.update({ is_deleted: true });

    return res.json(picture);
  },
};
