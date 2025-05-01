import { Contact } from "../models/contact.js";

export const upsertContact = async (req, res) => {
  try {
    const id = req.params.id; // optional
    const { name, email, phone, type } = req.body;

    const requiredFields = ["name", "email", "phone", "type"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Check for duplicate name or phone for this user
    const duplicate = await Contact.findOne({
      _id: id ? { $ne: id } : { $exists: true },
      user: req.user,
      $or: [{ name }, { phone }],
    });

    if (duplicate) {
      const field = duplicate.name === name ? "Name" : "Phone number";
      return res.status(400).json({ message: `${field} already exists` });
    }

    let contact;
    if (id) {
      // Update case
      contact = await Contact.findByIdAndUpdate(
        id,
        { name, email, phone, type, user: req.user },
        { new: true }
      );
      if (!contact)
        return res.status(404).json({ message: "Contact not found" });

      return res.status(200).json({ message: "Contact updated successfully" });
    } else {
      // Create case
      contact = await Contact.create({
        name,
        email,
        phone,
        type,
        user: req.user,
      });
      return res.status(201).json({ message: "Contact created successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const getContactsList = async (req, res) => {
  const contactsList = await Contact.find();

  res.status(200).json({
    message: "Contact List Fetched Successfully",
    results: contactsList,
    count: contactsList.length,
  });
};

export const getContactById = async (req, res) => {
  const id = req.query.id;
  const contactData = await Contact.findById(id);

  if (!contactData)
    return res.status(400).json({ message: "No contact Found" });

  res.status(200).json({
    message: "Contact Fetched Successfully",
    data: contactData,
  });
};

export const deleteContactById = async (req, res) => {
  const id = req.params.id;

  const deletedContactData = await Contact.findByIdAndDelete(id);

  if (!deletedContactData)
    return res.status(400).json({ message: "No contact Found" });

  res.status(200).json({
    message: "Contact Deleted Successfully",
  });
};

export const getUserSpecificContacts = async (req, res) => {
  const id = req.params.id;
  const contactsList = await Contact.find({ user: id });

  res.status(200).json({
    message: "Contact Fetched Successfully",
    results: contactsList,
    count: contactsList.length,
  });
};
