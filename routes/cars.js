import express from "express"
import carModel from "../modals/carModel.js"
import apicache from "apicache";

const router = express.Router()
const cache = apicache.middleware;

// get all cars 
router.get("/", cache("60 minutes"), async (req, res) => {
    try {
        const cars = await carModel.find();

        res.status(200).send({message:"All cars req successful!", data:{cars}})
    } catch (error) {
        return res.status(400).send({error:error})
    }
})

// add a new car
router.post("/", async (req, res) => {
    try {
        const newCar = new carModel(req.body);
        await newCar.save();
    
        res.status(201).send({ message: "New car added successfully!" });
        
    } catch (error) {
        return res
            .status(400)
            .json(
                "An error occured and your car could NOT be added right now!"
            );
    }
})

// edit details of a car
router.put("/:id", async (req, res) => {
    try {
        const car = await carModel.findById({ id: req.body._id });

        car.name = req.body.name;
        car.image = req.body.image;
        car.fuelType = req.body.fuelType;
        car.rentPerHour = req.body.rentPerHour;
        car.capacity = req.body.capacity;

        await car.save();

        res.send("Car edited successfully!");
    } catch (error) {
        return res.status(400).send(error)
    }
})

export default router