import express from "express";
import {
  createContact,
  deleteContactById,
  getContactById,
  getContactsList,
  updateContactById,
} from "../controllers/contact.js";

const router = express.Router();

router.post("/new", createContact);
router.get("/list", getContactsList);
router.get("/", getContactById);
router.put("/:id", updateContactById);
router.delete("/:id", deleteContactById);

export default router;
