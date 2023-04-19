const PizzaController = require('../controllers/pizza.controller.js');


module.exports = function(app){
  app.get('/api/pizzas', PizzaController.getAllPizzas);
  app.get('/api/pizzas/:id', PizzaController.getPizza);
  app.post('/api/pizzas', PizzaController.createPizza);
  app.put('/api/pizzas/:id', PizzaController.updatePizza);
  app.delete('/api/pizzas/:id', PizzaController.deletePizza);
}

