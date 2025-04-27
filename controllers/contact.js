import { Contact } from "../models/contact.js";

export const createContact = async (req, res) => {
  try {
    const body = req.body;
    const requireFields = ["name", "email", "phone", "type"];

    for (const field of requireFields) {
      if (!body[field]) {
        return res.status(400).json({ message });
      }
    }

    const { name, email, phone, type } = body;

    const saveContact = await Contact.create({ name, email, phone, type });
    res.status(201).json({ message: "Contact Created Successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
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

export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const requireFields = ["name", "email", "phone", "type"];

  for (const field of requireFields) {
    if (!body[field]) {
      return res.status(400).json({ message });
    }
  }

  const { name, email, phone, type } = body;

  const updatedContactData = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true }
  );

  if (!updatedContactData)
    return res.status(400).json({ message: "No contact Found" });

  res.status(200).json({
    message: "Contact Updated Successfully",
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
