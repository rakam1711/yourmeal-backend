const { Users } = require('../database')
const jwt = require('jsonwebtoken')

const SECRET_KEY = "rakamSinghIsOP"

const protect = async (req, res, next) => {
  const { authorization } = req.headers

  if(!authorization) {
    res.json({ success: false, message: "User not logged in" }).status(404)
    return
  }

  const token = authorization.split(' ')[1]
  const data = jwt.decode(token, SECRET_KEY)

  const user = await Users.findById(data.userid)
  if(!user) {
    res.json({ success: false, message: "User does not exist "}).status(404)
  }

  req.user = data.userid
  next()
}

module.exports = protect