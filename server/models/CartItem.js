const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    addTo: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    saveLater: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    Bought: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        status: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("CartItem", cartSchema);
