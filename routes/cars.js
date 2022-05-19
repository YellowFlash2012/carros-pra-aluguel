import express from "express"
import carModel from "../modals/carModel.js"
import apicache from "apicache";

const router = express.Router()
const cache = apicache.middleware;

router.get("/", cache("60 minutes"), async (req, res) => {
    try {
        const cars = await carModel.find();

        res.status(200).send({message:"All cars req successful!", data:{cars}})
    } catch (error) {
        return res.status(400).send({error:error})
    }
})

export default router