import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user-route.js";
import contactRoutes from "./routes/contact-route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log("Db connected"))
  .catch((err) => console.error(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);





const port = 5000;
app.listen(port, () => console.log(`Server is connected to ${port}`));
