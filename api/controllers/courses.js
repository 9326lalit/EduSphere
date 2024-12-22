import courses from '../models/courses.js';
// import cloudinary from '../config/cloudinary.js';

// Create a new course
export const createCourse = async (req, res, next) => {
  try {
    let photosUrl = null;

   
    const newCourse = new courses({
      ...req.body,
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    res.status(200).send({
      success: true,
      message: 'Course created successfully!',
      savedCourse,
    });
  } catch (err) {
    next(err);
  }
};

// Update an existing course
export const updateCourse = async (req, res, next) => {
  try {
    const updatedCourse = await courses.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Return the updated document
    );

    res.status(200).send({
      success: true,
      message: 'Course updated successfully!',
      updatedCourse,
    });
  } catch (err) {
    next(err);
  }
};

// Delete a course
export const deleteCourse = async (req, res, next) => {
  try {
    await courses.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: 'Course deleted successfully!',
    });
  } catch (err) {
    next(err);
  }
};

// Get a single course by ID
export const getCourse = async (req, res, next) => {
  try {
    const course = await courses.findById(req.params.id);

    if (!course) {
      return res.status(404).send({
        success: false,
        message: 'Course not found!',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Course retrieved successfully!',
      course,
    });
  } catch (err) {
    next(err);
  }
};

// Get all courses with optional filtering (by fee, duration, etc.)
export const getAllCourses = async (req, res, next) => {
  const { limit, min, max, duration } = req.query;

  try {
    const filter = {};

    // Filtering by fee range
    if (min && max) {
      filter.fee = { $gte: parseInt(min), $lte: parseInt(max) };
    }

    // Filtering by duration
    if (duration) {
      filter.duration = duration;
    }

    // Query to fetch courses based on filters
    const coursesList = await courses.find(filter).limit(parseInt(limit));
    const totalCourses = await courses.countDocuments(filter);

    res.status(200).send({
      success: true,
      message: 'Get All Courses Successfully!',
      coursesList,
      totalCourses,
    });
  } catch (err) {
    next(err);
  }
};
