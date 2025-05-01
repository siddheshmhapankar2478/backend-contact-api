import express from "express";
import {
  upsertContact,
  deleteContactById,
  getContactById,
  getContactsList,
  getUserSpecificContacts,
} from "../controllers/contact.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/update", isAuthenticated, upsertContact);
router.get("/list", isAuthenticated, getContactsList);
router.get("/", isAuthenticated, getContactById);
router.put("/update/:id", isAuthenticated, upsertContact);
router.delete("/:id", isAuthenticated, deleteContactById);
router.get("/user/:id", isAuthenticated, getUserSpecificContacts);

export default router;
