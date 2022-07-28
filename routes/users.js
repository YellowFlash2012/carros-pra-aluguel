import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import rateLimiter from "express-rate-limit";


import Users from "../models/Users.js";
import protect from "../middleware/protect.js";
import admin from "../middleware/admin.js";

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: "Too many requests from this IP address",
});

const router = express.Router();

router.post("/login", apiLimiter, async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Users.findOne({ email:email })

        if (!user) {
            return res.status(400).send("No such user found!")
        }

        const validPassword = await bcrypt.compare(password, user.password);
        

        if (!validPassword) {
            return res.status(400).send("Invalid Credentials");
        }
        
        // generate token
        const token=jwt.sign({_id:user._id},process.env.jwt_token)
        
            res.status(200).send({status:"success", message:"Login Successful", data:{userID:user._id,email:user.email,username:user.username, isAdmin:user.isAdmin}, token:token})
        
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.post("/register", apiLimiter, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await Users.findOne({ email });

        if (user) {
            return res.status(400).send("User with that email already exists!")
        }
        user = new Users(req.body);

        const salt = await bcrypt.genSalt(12);

        user.password = await bcrypt.hash(user.password, salt);
        
        await user.save()

        // generate token
        const token=jwt.sign({_id:user._id},process.env.jwt_token)

        res.status(201).send({status:"success",message:"New user registration successful!",data:{user:user,token:token}})
    } catch (error) {
        return res.status(400).json(error);
    }
})

// get all users
router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await Users.find();

        res.status(200).send(users)
        
    } catch (error) {
        
        return res.status(400).json(error);
    }
})

export default router