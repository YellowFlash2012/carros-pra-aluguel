import express from "express"
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";
import apicache from "apicache";

import Bookings from "../models/Bookings.js";

import protect from "../middleware/protect.js";
import Cars from "../models/Cars.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express();
const cache = apicache.middleware;

config()

// book a car
router.post("/", protect, async (req, res) => {
    
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
            const car = await Cars.findOne({ _id: req.body.car });
            car.bookedTimeSlots.push(req.body.bookedTimeSlots);
            await car.save()
    
            res.status(201).send("Booking was successful!")
        

    } catch (error) {
        return res.status(400).send(error);
    }
})

// access all my bookings
router.get("/", protect, cache("7 minutes"), async (req, res) => {
    try {
        const bookings = await Bookings.find().populate("car");
        // console.log(Bookings.populated("car"));

        res.status(200).send(bookings
        );
    } catch (error) {
        return res.status(400).json(error.message);
    }
});

export default router