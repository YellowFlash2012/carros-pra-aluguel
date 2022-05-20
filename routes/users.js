import express from "express"
import bcrypt from "bcryptjs"
import Users from "../modals/usersModel.js";
const router = express.Router();

router.post("/login", async (req, res) => {
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
        
        
            res.status(200).send({status:"success", message:"Login Successful", data:{userID:user._id,email:user.email,username:user.username}})
        
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.post("/register", async (req, res) => {
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

        res.status(201).send({status:"success",message:"New user registration successful!"})
    } catch (error) {
        return res.status(400).json(error);
    }
})

export default router