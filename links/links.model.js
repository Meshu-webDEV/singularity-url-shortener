const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  uniqueid: {
    type: String,
    required: true,
    unique: true,
  },
  original: {
    type: String,
    required: true,
  },
  shortened: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    expires: 604800 * 4,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model('link', linkSchema);
