import React from "react";
import axios from "axios";

export default ({ pizzaId, deleteCallback }) => {
  const deletePizza = (e) => {
    axios
      .delete(`http://localhost:8000/api/pizzas/${pizzaId}`)
      .then((res) => {
        deleteCallback();
      });
  };

  return (
    <button className="btn btn-outline-danger" onClick={deletePizza}>
      Remove
    </button>
  );
};
