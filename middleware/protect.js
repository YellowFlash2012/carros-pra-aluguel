import jwt from "jsonwebtoken"
import Users from "../models/Users.js";

const protect = async (req, res, next) => {
    
    const id = req.body.user;

    const user = Users.findById(id, (err, docs) => {
        if (err) {
            console.error(err);
            return res.status(400).send("Access forbidden! You need to login");
        } else {
            console.log(docs);
            next()
        }
    });

    // console.log(id, user.email);
    
    // if (!user.username) {
    //     return res.status(400).send("Access forbidden! You need to login")
    // } 

    // next()
}

export default protect