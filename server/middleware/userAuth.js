const jwt = require("jsonwebtoken");
const { Vendor, User } = require("../models");
const auth = (role) => {
  return async (req, res, next) => {
    let Role;
    try {
      switch (role) {
        case "Vendor":
          Role = Vendor;
          break;
        case "User":
          Role = User;
          break;
        case "Admin":
          Role = "Admin";
          break;
      }
      if (Role === "Admin") {
        next();
        return;
      }
      let token = req.cookies.authorization;

      if (!token) {
        return res.json({
          user: null,
          error: "No Authorization token! Authorize to proceed",
        });
      }

      let data = jwt.verify(token, process.env.TOKEN_SECRET);

      if (!data) {
        return res.json({
          user: null,
          error: "Invalid token! Authorize to proceed",
        });
      }

      console.log(data);

      let user = await Role.findById(data._id);

      req.user = user;

      next();
    } catch (error) {
      return res.json({ user: null, error: "Internal Server Error!" });
    }
  };
};
module.exports = auth;
