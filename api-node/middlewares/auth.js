import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
const auth = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;

        if (authToken) {
            const jwtSecretKey = process.env.JWT_SECRET_KEY;
            const data = await jwt.verify(
                authToken.replace("Bearer ", ""),
                jwtSecretKey
            );

            const user = await User.findOne({ _id: data.id });
            if (!user) {
                return res.status(401).json({ message: "Authorization denied" });
            }
            req.user = user;
            next();
        } else {
            console.log("no header");
            return res.status(401).json({ message: "Authentication required" });
        }
    } catch (error) {
        console.log("error.....")
        res.status(500).json({
            message: error.message ?? "Server error. Please try again later.",
        });
    }
};

export default auth;