import express from "express"
import Bookings from "../modals/Bookings.js";
import carModel from "../modals/carModel.js";
const router = express();

router.post("/", async (req, res) => {
    req.body.transactionID = Math.random().toString(16).substr(2, 8);

    try {
        const newBooking = new Bookings(req.body);
        await newBooking.save();

        // update cars model
        const car = await carModel.findOne({ _id: req.body.car });
        car.bookedTimeSlots.push(req.body.bookedTimeSlots);
        await car.save()

        res.status(201).send("Booking was successful!")
    } catch (error) {
        return res.status(400).send(error);
    }
})

export default router