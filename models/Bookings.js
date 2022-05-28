import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectID, ref: "cars" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
    bookedTimeSlots: {
        from: { type: String },
        to: { type: String }
    },
    
    totalHours: { type: Number },
    totalDue: { type: Number },
    driverRequired:{type:Boolean},
    transactionID:{type:String}
    
}, { timestamps: true })

const Bookings = mongoose.model("bookings", bookingSchema);
export default Bookings