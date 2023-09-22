const express = require('express');
const router = express.Router();
const {
  getContact,
  getContactbyId,
  createContact,
  updateContact,
  deleteContact,
} = require('./../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getContact).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

router
  .route('/:id')
  .get(getContactbyId)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
