const express = require("express");

const User = require("../models/userModel");

const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const authMiddleWare = require("../middleware/authMiddleWare");
const router = express.Router();
//authentication
//registration
router.post("/register", async (req, res) => {
  try {
    //check if the user already exists

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("user already exists");
    }
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //new user + save it
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "user created successfuly",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    //get the user and checkconst router = express.Router();

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("user not found");
    }
    if (user.status === "blocked") {
      throw new Error("The user account is blocked , please contact admin");
    }

    //compare the password create token

    const valiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!valiedPassword) {
      throw new Error("incorrect passord");
    }
    const token = JWT.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "100d",
    });
    res.send({
      success: true,
      message: "loggod successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
//authrization
router.get("/get-current-user", authMiddleWare, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "user fetched successfuly",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get alla users
router.get("/get-users", authMiddleWare, async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
//update user status
router.put("/update-user-status/:id", authMiddleWare, async (req, res) => {
  try {
    const { status } = req.body;
    await User.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
