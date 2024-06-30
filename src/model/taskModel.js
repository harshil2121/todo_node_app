const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true, default: null },
    status: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
