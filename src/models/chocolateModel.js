const mongoose = require('../config/mongo');

const chocolateschema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    value: {
      type: Number,
    },
    details: {
      type: String,
    },
    image: {
      type: String,
    },
    registerUserId: {
      type: String,
    },
    updaterUserId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const chocolatemodel = mongoose.model('Chocolate', chocolateschema);

module.exports = chocolatemodel;
