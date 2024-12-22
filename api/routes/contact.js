import express from "express";
import { saveContact, getContacts, deleteContact } from "../controllers/contact.js";

const router = express.Router();

// Route to save a contact
router.post("/save", saveContact);

// Route to get all contacts
router.get("/all", getContacts);

router.delete("/:id" , deleteContact);

export default router;
