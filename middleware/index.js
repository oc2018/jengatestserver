import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();
const secret = process.env.JWT_SECRET;
const auth = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"].split(" ")[1] ||
      req.headers["Authorization"].split(" ")[1];

    if (!token) return res.status(401).send(`You are not Authorized`);
    jwt.verify(token, secret);
    // console.log(decodedToken);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send(`Your Token is Expired or invalid`);
  }
};

export default auth;
