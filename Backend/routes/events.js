const express = require('express');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
} = require('../controllers/eventController');

const router = express.Router();

router.post('/', [auth.protect, isAdmin], createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', [auth.protect, isAdmin], updateEvent);
router.delete('/:id', [auth.protect, isAdmin], deleteEvent);
router.post('/:id/register', auth.protect, registerForEvent);

module.exports = router;
