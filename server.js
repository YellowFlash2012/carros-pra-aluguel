import express from "express"
import { config } from "dotenv";
import morgan from "morgan"
import cors from "cors"
import path from "path";
import connectDB from "./db.js";
import carsRoutes from "./routes/cars.js"
import userRoutes from "./routes/users.js"
import bookingRoutes from "./routes/bookings.js"


config()

const app = express();
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;


// config for deployment
const __dirname = path.resolve();
if ((process.env.NODE_ENV === "production")) {
    app.use("/", express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client/build/index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}

app.get("/", (req, res)=> {
    res.send("We are live and ready!")
})

app.use("/api/v1/cars", carsRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/bookings", bookingRoutes)

connectDB()
app.listen(PORT, () => {
    console.log(`Server on | Port ${PORT}`);
})