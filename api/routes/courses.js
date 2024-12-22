import express from 'express';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from '../controllers/courses.js'; // Ensure the file path is correct

const router = express.Router();

// Create a new course
router.post('/', createCourse);

// Update an existing course
router.put('/:id', updateCourse);

// Delete a course
router.delete('/:id', deleteCourse);

// Get a specific course by ID
router.get('/:id', getCourse);

// Get all courses with optional filters
router.get('/', getAllCourses);

export default router;
