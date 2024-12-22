import contact from "../models/contact.js";

// Function to save a contact
export const saveContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newContact = new contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ message: "Contact saved successfully", contact: newContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Function to get all contacts
export const getContacts = async (req, res) => {
    try {
        const contacts = await contact.find(); // Fetches all contacts from the database
        res.status(200).json({ contacts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
// Function to delete a contact
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params; // Get the contact ID from the request parameters

        // Attempt to delete the contact by ID
        const deletedContact = await contact.findByIdAndDelete(id);
        
        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};