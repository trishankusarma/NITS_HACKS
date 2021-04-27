const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    
    addTo: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        uniquie: true
      },
    ],
    saveLater: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        uniquie: true
      },
    ],
    Bought: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          uniquie: true
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

module.exports = CartItem = mongoose.model("CartItem", cartSchema);
