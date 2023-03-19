import db from '../database'
import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY:string = process.env.JWT_SECRET_KEY || "test123"

const protect = async (req:any, res:any, next:any) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.json({ success: false, errors: { message: "User not logged in" }, data: {} }).status(404);
    return;
  }

  const token = authorization.split(" ")[1];
  const data:any = jwt.verify(token, JWT_SECRET_KEY);

  const user = await db.Users.findById(data?.userid);
  if (!user) {
    res.json({ success: false, message: "User does not exist " }).status(404);
  }

  req.user = data.userid;
  next();
};

export default protect