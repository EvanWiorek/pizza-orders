import React, { useEffect, useState } from "react";
import PizzaList from "../components/PizzaList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default ({
  pizzas,
  setPizzas,
  loaded,
  setLoaded,
  removeFromDom,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pizzas")
      .then((res) => {
        setPizzas(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const showOrders = () => {
    // navigate(0)
    axios
      .get("http://localhost:8000/api/pizzas")
      .then((res) => {
        setPizzas(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  const hideOrders = () => {
    const pizzaCount = pizzas.filter((pizza) => pizza.isDelivered === false);
    setPizzas(pizzaCount);
  };

  return (
    <div className="mt-3">
      <div className="d-flex align-items-center justify-content-between col-7 m-auto">
        <h3 className="mb-4 mt-4">Pizza Delivery List</h3>
        <div className="col-5 justify-content-between d-flex">
          <button className="btn btn-dark" onClick={hideOrders}>
            Hide Delivered Pizzas
          </button>
          <button className="btn btn-dark" onClick={showOrders}>
            Show Delivered Pizzas
          </button>
        </div>
      </div>
      {loaded && (
        <PizzaList
          pizzas={pizzas}
          setPizzas={setPizzas}
          removeFromDom={removeFromDom}
        />
      )}
    </div>
  );
};
