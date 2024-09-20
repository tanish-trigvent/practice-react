import jwt from "jsonwebtoken"

const genToken = (id) => {
    const data = { id: id };
    return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

export default genToken