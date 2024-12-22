import mongoose from 'mongoose';

// Define the schema for the Event
const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date, // Date type to handle precise date and time
      required: true,
    },
    eventTime: {
      type: String, // Time in HH:MM format if needed
      required: true,
    },
    eventDuration: {
      type: Number, // Duration in hours
      required: true,
      min: 1, // Minimum 1 hour
    },
    location: {
      type: String, // Physical or virtual location
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: ['Workshop', 'Seminar', 'Sports', 'Cultural', 'Other'], // Categories for events
    },
    organizer: {
      type: String, // Admin/Faculty name or department
      required: true,
    },
    status: {
      type: String,
      default: 'Upcoming', // Default status is 'Upcoming'
      enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], // Statuses for events
    },
    sharedWith: {
      type: [String], // List of roles or departments to whom the event is shared
      default: [], // Empty array if not shared yet
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model for the Event using the schema
const Event = mongoose.model('Event', eventSchema);

export default Event;
