// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event.js';

const router = express.Router();

// Route to create a new event
router.post('/', async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      eventDate,
      eventTime,
      eventDuration,
      location,
      eventType,
      organizer,
      sharedWith,
    } = req.body;

    // Check if an event overlaps with the same date and time
    const existingEvent = await Event.findOne({
      eventDate,
      eventTime,
      location,
    });

    if (existingEvent) {
      return res.status(400).json({ message: 'An event is already scheduled at this location, date, and time.' });
    }

    // Create a new event using the Event model
    const newEvent = new Event({
      eventName,
      eventDescription,
      eventDate,
      eventTime,
      eventDuration,
      location,
      eventType,
      organizer,
      sharedWith,
    });

    // Save the event to the database
    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event', error });
  }
});

// Route to fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
});

// Route to fetch events by status
router.get('/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const events = await Event.find({ status });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events by status:', error);
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
});

// Route to approve an event
router.post('/:id/approve', async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { status: 'Ongoing' },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event approved successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error approving event:', error);
    res.status(500).json({ message: 'Failed to approve event', error });
  }
});

// Route to cancel an event
router.post('/:id/cancel', async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { status: 'Cancelled' },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event cancelled successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error canceling event:', error);
    res.status(500).json({ message: 'Failed to cancel event', error });
  }
});

// Route to update event details
router.put('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Failed to update event', error });
  }
});

export default router;
