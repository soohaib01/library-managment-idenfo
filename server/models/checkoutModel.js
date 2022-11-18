const mongoose = require("mongoose");

const checkoutSchema = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  Username: {
    type: String,
    required: [true, "Please Provide Username"],
  },
  Mobile: {
    type: Number,
    required: [true, "Please Provide Mobile Number"],
  },
  NationalID: {
    type: Number,
    required: [true, "Please Provide Identification Number"],
  },
},{
  timestamps: true
});

module.exports = mongoose.model("Checkout", checkoutSchema);
