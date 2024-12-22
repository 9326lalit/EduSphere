import User from "../models/User.js";


export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Update User Sucssesfully!!!",
      updateUser,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Delete User Sucssesfully!!!",
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).send({
      success: true,
      message: "Get User Sucssesfully!!!",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    console.log("api call succesfully");
const userCount = await User.countDocuments(); // MongoDB query to count all users

    console.log("Total number of users:", userCount);
    
    const getAllUser = await User.find();
    
    console.log("Get all user", getAllUser)
    res.status(200).send({
      success: true,
      message: "Get All Users Sucssesfully!!!",
      amount: userCount, 
      getAllUser,
    });
  } catch (err) {
    next(err);
  }
};

