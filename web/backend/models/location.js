const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Location = new Schema(
  {
    userId: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", Location, "locations");
