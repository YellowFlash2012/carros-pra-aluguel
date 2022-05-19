import express from "express"
import { config } from "dotenv";
import morgan from "morgan"
import cors from "cors"
import connectDB from "./db.js";
import carsRoutes from "./routes/cars.js"

config()

const app = express();
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const port = process.env.PORT || 5000;

app.get("/", (req, res)=> {
    res.send("We are live and ready!")
})

app.use("/api/v1/cars", carsRoutes)

connectDB()
app.listen(port, () => {
    console.log(`Server on | Port ${port}`);
})