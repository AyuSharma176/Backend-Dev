const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { title, content, ownerId } = req.body || {};

    if (!title || !content || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "title, content and ownerId are required"
      });
    }

    const note = await Note.create({ title, content, ownerId });

    return res.status(201).json({
      success: true,
      note
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      notes
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const notes = await Note.find({}, null, { includeDeleted: true }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      notes
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note id"
      });
    }

    const note = await Note.softDeleteById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    return res.json({
      success: true,
      message: "Note soft deleted",
      note
    });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id/restore", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note id"
      });
    }

    const note = await Note.restoreById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    return res.json({
      success: true,
      message: "Note restored",
      note
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
