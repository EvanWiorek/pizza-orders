const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');

const PizzaSchema = new mongoose.Schema(
  {
    pizzaType: {
      type: String,
      required: [true, "A pizza type must be selected."],
    },
    pizzaSize: {
      type: String,
      required: [true, "A pizza size must be selected."],
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      required: false,
      maxLength: [
        25,
        "Notes must contain max of 25 characters.",
      ],
    },
    deliveryTime: {
      type: Date,
      required: [true, "Date of delivery is required."],
      max: ['2023-04-29', "Cannot set delivery date after today's date."]
    }
  },
  { timestamps: true }
);

// PizzaSchema.plugin(uniqueValidator, {message: '{VALUE} is already on this list.'})

module.exports.Pizza = mongoose.model("Pizza", PizzaSchema);
