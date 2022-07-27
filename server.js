import express from "express"
import { config } from "dotenv";
import morgan from "morgan"

import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";


import connectDB from "./db.js";
import carsRoutes from "./routes/cars.js"
import userRoutes from "./routes/users.js"
import bookingRoutes from "./routes/bookings.js"
import { errorHandler } from "./middleware/error.js";


config()

const app = express();
app.use(express.json())
// app.use(helmet());
app.use(xss());
app.use(mongoSanitize());


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

// app.get("/", (req, res)=> {
//     res.send("We are live and ready!")
// })

app.use("/api/v1/cars", carsRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/bookings", bookingRoutes)

app.use(errorHandler)

connectDB()
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode | Port ${PORT}`.yellow
            .bold
    );
})