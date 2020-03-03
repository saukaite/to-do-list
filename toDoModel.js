const mongoose = require("mongoose")

let ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

let ToDoModel = mongoose.model("ToDoItems", ToDoSchema)

module.exports = ToDoModel
