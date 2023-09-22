const asyncHandler = require('express-async-handler');
const Contact = require('../model/contactModel');

//@desc Get all Contacts
//@route GET /api/contacts
//@access Private

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create all Contacts
//@route POST /api/contacts
//@access Private

const createContact = asyncHandler(async (req, res) => {
  console.log('The request body is', req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All Fields are mandatory');
  }
  const contacts = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contacts);
});

//@desc GET a Contacts
//@route GET /api/contacts/:id
//@access Private

const getContactbyId = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not Found');
  }
  res.status(200).json(contact);
});

//@desc Update a Contacts
//@route PUT /api/contacts/:id
//@access Private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not Found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to update this contact');
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete a Contacts
//@route DELETE /api/contacts/:id
//@access Private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not Found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to delete this contact');
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContactbyId,
};
