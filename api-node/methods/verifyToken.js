import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
const verifyToken = async (authToken) => {
    try {
        if (authToken) {
            const jwtSecretKey = process.env.JWT_SECRET_KEY;
            const data = await jwt.verify(
                authToken,
                jwtSecretKey
            );

            const user = await User.findOne({ _id: data.id });
            if (!user) {
                return { message: "Authorization denied" };
            }
            return user;

        } else {
            return { message: "Authentication required" };
        }
    } catch (error) {
        return {
            message: error.message ?? "Server error. Please try again later.",
        }
    }
};
export default verifyToken