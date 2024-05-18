import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    const cookieString = req.headers.cookie;
    const token = cookieString.split('jwt=')[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorised! Not token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorised! Invalid token." });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    req.user = user;

    next();

  } catch (error) {
    console.log("Error in protectRoute milddleware!", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export default protectRoute;
