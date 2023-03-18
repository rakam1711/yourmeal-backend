const { Users } = require("../database");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "test123"

const protect = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.json({ success: false, errors: { message: "User not logged in" }, data: {} }).status(404);
    return;
  }

  const token = authorization.split(" ")[1];
  const data = jwt.decode(token, JWT_SECRET_KEY);

  const user = await Users.findById(data.userid);
  if (!user) {
    res.json({ success: false, message: "User does not exist " }).status(404);
  }

  req.user = data.userid;
  next();
};

module.exports = protect;
