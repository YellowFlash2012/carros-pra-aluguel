import express from "express"
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";
import apicache from "apicache";

import Bookings from "../modals/Bookings.js";
import carModel from "../modals/carModel.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express();
const cache = apicache.middleware;

config()


router.post("/", async (req, res) => {
    
    // const { token } = req.body;
    
    try {
        
        // stripe payment config
        // const customer = await stripe.customers.create({
        //     email: token.email,
        //     source: token.id
        // });
        
        // const payment = await stripe.charges.create({
        //     amount: req.body.totalDue * 100,
        //     currency: "usd",
        //     customer: customer.id,
        //     receipt_email: token.email
        // }, {
        //     idempotencyKey: uuidv4()
        // });
        
        
            req.body.transactionID = uuidv4();
            
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

router.get("/", cache("7 minutes"), async (req, res) => {
    try {
        const bookings = await Bookings.find().populate("car");
        console.log(bookings);

        res.status(200).send({
            message: "My bookings req successful!",
            data: bookings,
        });
    } catch (error) {
        return res.status(400).json(error);
    }
});

export default router