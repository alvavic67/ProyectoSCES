const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema(
  {
    name: String,
    hours: String,
    day: String,
    date: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", Report);
