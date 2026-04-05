const mongoose = require("mongoose");
const { softDeletePlugin } = require("../plugins/softDelete");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

noteSchema.plugin(softDeletePlugin);

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

module.exports = Note;
