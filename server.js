import express from "express"
import { config } from "dotenv";
import morgan from "morgan"
import connectDB from "./db.js";

config()

const app = express();
app.use(express.json())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const port = process.env.PORT || 5000;

app.get("/", (req, res)=> {
    res.send("We are live and ready!")
})

connectDB()
app.listen(port, () => {
    console.log(`Server on | Port ${port}`);
})