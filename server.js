import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { registerUser, loginUser } from "./controllers/user.js";
import {
  createContact,
  getContactsList,
  getContactById,
  deleteContactById,
} from "./controllers/contact.js";
import { updateContactById } from "./controllers/contact.js";

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

app.get("/", (req, res) => {
  res.json({ message: "Home Page" });
});

app.post("/api/user/register", registerUser);
app.post("/api/user/login", loginUser);

app.post("/api/contact/new", createContact);
app.get("/api/contact/list", getContactsList);
app.get("/api/contact", getContactById);
app.put("/api/contact/:id", updateContactById);
app.delete("/api/contact/:id", deleteContactById);





const port = 5000;
app.listen(port, () => console.log(`Server is connected to ${port}`));
