const LocalType = require("../models/LocalType");

module.exports = {
  async getLocalType(req, res) {
    const localType = await LocalType.findByPk(req.params.id);

    if (!localType || localType.is_deleted == true) {
      return res.status(400).json({ err: "Local Type not found" });
    }

    return res.json(localType);
  },

  async createLocalType(req, res) {
    const { name } = req.body;
    let localType;

    try {
      localType = await LocalType.create({
        name,
      });
    } catch (error) {
      return res.status(400).json({ err: error.message });
    }

    return res.json(localType);
  },

  async updateLocalType(req, res) {
    const id = req.params.id;
    const { name } = req.body;

    const localType = await LocalType.findByPk(id);

    if (!localType || localType.is_deleted == true) {
      return res.status(400).json({ err: "Local Type not found" });
    }

    localType.update({ name });

    return res.json(localType);
  },

  async deleteLocalType(req, res) {
    const id = req.params.id;

    const localType = await LocalType.findByPk(id);

    if (!localType) {
      return res.status(400).json({ err: "Local Type not found" });
    }

    localType.update({ is_deleted: true });

    return res.json(localType);
  },
};
