import jwt from "jsonwebtoken";
import User from "../models/User.js";

// protected routes (only logged-in users can access)
const protect = async (req, res, next) => {
  let token;

  try {
    // Check if request has an Authorization header with Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    }

    // If no token provided
    return res.status(401).json({ message: "Not authorized, no token" });
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;


