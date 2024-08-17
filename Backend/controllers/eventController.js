const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location, maxParticipants } = req.body;
    const newEvent = new Event({
      name,
      description,
      date,
      location,
      maxParticipants,
      organizer: req.user.id,
    });
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name');
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { name, description, date, location, maxParticipants } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, location, maxParticipants },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.participants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    if (event.participants.length >= event.maxParticipants) {
      event.waitlist.push(req.user.id);
      await event.save();
      return res.json({ message: 'Added to waitlist' });
    }

    event.participants.push(req.user.id);
    await event.save();
    res.json({ message: 'Successfully registered for the event' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
