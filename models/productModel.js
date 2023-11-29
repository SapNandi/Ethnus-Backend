const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  images: {
    url: {
      type: String,
    },
  },
  video: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Podcast", podcastSchema);
