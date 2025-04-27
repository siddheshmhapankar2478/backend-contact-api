import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { registerUser, loginUser } from "./controllers/user.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log("Db connected"))
  .catch((err) => console.error(err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Home Page" });
});

app.post("/api/user/register", registerUser);

app.post("/api/user/login", loginUser);


const port = 5000;
app.listen(port, () => console.log(`Server is connected to ${port}`));
