import axios from "axios";
import DeleteButton from "./DeleteButton";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default ({ pizzas, setPizzas, removeFromDom}) => {
  const handleToggleDelivered = (pizzaId) => {
    const deliveredPizzas = pizzas.map((pizza, mapIdx) => {
      if (pizzaId === pizza._id) {
        const deliveredPiza = { ...pizza, isDelivered: !pizza.isDelivered };
        return deliveredPiza;
      }
      return pizza;
    });

    setPizzas(deliveredPizzas);
  };

  //get all pizzas in array to display on page
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pizzas")
      .then((res) => setPizzas(res.data));
  }, []);


  //need to update the isDelivered, and deliveryTime with a current time stamp
  //If not delivered, have "not delivered?"  no - need to add delivery time on page

  //Add validation that only allows a maximum of 10 undelivered pizzas at a time

  return (
    <div className="col-7 m-auto">
      <table className="table table-hover my-shadow">
        <thead className="table-head-color">
          <tr>
            <th scope="col">
              <h5 className="p-2">Delivery Time</h5>
            </th>
            <th scope="col">
              <h5 className="p-2">Pizza</h5>
            </th>
            <th scope="col">
              <h5 className="p-2">Size</h5>
            </th>
            <th scope="col">
              <h5 className="p-2">Delivered</h5>
            </th>
            <th scope="col">
              <h5 className="p-2">Actions</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizza, i) => (
            <tr key={i}>
              <td className="p-3">
                <h5>{pizza.deliveryTime}</h5>
              </td>
              <td className="p-3">
                <h5>{pizza.pizzaType}</h5>
              </td>
              <td className="p-3">
                <h5>{pizza.pizzaSize}</h5>
              </td>
              <td className="p-3">
                <div className="d-flex gap-3 align-items-center">
                  <h5>{pizza.isDelivered === true ? "Yes" : "No"}</h5>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={pizza.isDelivered}
                      name="isDelivered"
                      onChange={(e) => handleToggleDelivered(pizza._id)}
                    />
                </div>
                </div>
              </td>
              <td className="p-3">
                <p className="d-flex gap-3">
                  <DeleteButton
                    pizzaId={pizza._id}
                    deleteCallback={() => removeFromDom(pizza._id)}
                  />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
