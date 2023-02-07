require("dotenv/config")
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = require("./DB/db");
connectDB();
require("./bot/bot")
const routes = require("./routes");

const app = express(); 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"))
routes.forEach(router => app.use("/api/",router));


let port = process.env.PORT;
app.listen(port, ()=> console.log(`server is ${port} runinng`))
