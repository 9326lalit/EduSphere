import mongoose from 'mongoose';

// Define the schema for the Course model
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  syllabus: [
    {
      type: String
    }
  ],
  photos: [
    {
      type: String
    }
  ],
  reviews: [
    {
      user: {
        type: String
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String
      }
    }
  ]
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Define the Course model
const Courses = mongoose.model('Courses', courseSchema);

export default Courses;
