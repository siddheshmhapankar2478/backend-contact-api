import express from "express";
import {
  createContact,
  deleteContactById,
  getContactById,
  getContactsList,
  updateContactById,
  getUserSpecificContacts,
} from "../controllers/contact.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, createContact);
router.get("/list", isAuthenticated, getContactsList);
router.get("/", isAuthenticated, getContactById);
router.put("/:id", isAuthenticated, updateContactById);
router.delete("/:id", isAuthenticated, deleteContactById);
router.get("/user/:id", isAuthenticated, getUserSpecificContacts);

export default router;
