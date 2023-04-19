const { response, request } = require("express");
const { Pizza } = require("../models/pizza.model.js");

module.exports.getAllPizzas = (request, response) => {
  Pizza.find()
    // .sort({ pizz: 1 })
    .then((pizzas) => response.status(200).json(pizzas))
    .catch((err) => response.status(400).json(err));
};

module.exports.getPizza = (request, response) => {
  Pizza.findOne({ _id: request.params.id })
    .then((pizza) => response.status(200).json(pizza))
    .catch((err) => response.status(400).json(err));
};

module.exports.createPizza = (request, response) => {
  const { pizzaType, pizzaSize, isDelivered, notes, deliveryTime } =
    request.body;
  Pizza.create({
    pizzaType,
    pizzaSize,
    isDelivered,
    notes,
    deliveryTime,
  })
    .then((pizza) => response.status(201).json(pizza))
    .catch((err) => response.status(400).json(err));
};

module.exports.updatePizza = (request, response) => {
  Pizza.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
  })
    .then((updatedPizza) => response.status(200).json(updatedPizza))
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.deletePizza = (request, response) => {
  Pizza.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.status(200).json(deleteConfirmation))
    .catch((err) => response.status(400).json(err));
};
