const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, passwordHash } = req.body || {};

    if (!name || !email || !passwordHash) {
      return res.status(400).json({
        success: false,
        message: "name, email and passwordHash are required"
      });
    }

    const user = await User.create({
      name,
      email,
      passwordHash,
      isLoggedIn: false
    });

    return res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    return next(error);
  }
});

router.post("/:id/login", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id"
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.isLoggedIn = true;
    await user.save();

    return res.json({
      success: true,
      message: "User logged in",
      user
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/:id/logout", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id"
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.isLoggedIn = false;
    await user.save();

    return res.json({
      success: true,
      message: "User logged out",
      user
    });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id/active", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id"
      });
    }

    const setPayload = {};

    if (typeof req.body?.name === "string" && req.body.name.trim()) {
      setPayload.name = req.body.name.trim();
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: setPayload
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      message: "User updated and marked active",
      user
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id"
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      user
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
