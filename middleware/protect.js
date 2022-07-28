import jwt from "jsonwebtoken"
import Users from "../models/Users.js";

const protect = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return "You can't do that!"
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.jwt_token);

        const user = await Users.findOne({ _id: payload._id });

        req.user = user;
        // console.log(req.user);
        next()
    } catch (error) {
        throw new Error("You are not authorized to do that!");
    }

}

export default protect