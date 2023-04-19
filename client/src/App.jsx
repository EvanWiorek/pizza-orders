import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import AddPizza from './views/AddPizza';
import Update from './views/Update';
import Navbar from './components/Navbar';
import Home from './views/Home';
import "./App.css";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  const removeFromDom = (pizzaId) => {
    setPizzas(pizzas.filter((pizza) => pizza._id != pizzaId));
  };


  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route element={<Home pizzas={pizzas} setPizzas={setPizzas} loaded={loaded} setLoaded={setLoaded} removeFromDom={removeFromDom} />} path="/" />
        <Route element={<AddPizza pizzas={pizzas} setPizzas={setPizzas} loaded={loaded} setLoaded={setLoaded} errors={errors} setErrors={setErrors} />} path="/pizzas" />
        <Route element={<Update errors={errors} setErrors={setErrors} />} path="/pizzas/:id/edit/" />
      </Routes>
    </div>
  );
}
export default App;
