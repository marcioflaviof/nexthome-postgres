const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user || user.is_deleted == true) {
      return res.status(400).json({ err: "User not found" });
    }

    if (user.email == email && bcrypt.compareSync(password, user.password)) {
      return res.json(user.id);
    }

    return res.status(400).json({ err: "Can't login" });
  },
};
