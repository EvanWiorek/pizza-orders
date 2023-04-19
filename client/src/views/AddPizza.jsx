import React, { useEffect, useState } from "react";
import PizzaForm from "../components/PizzaForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default ({pizzas, setPizzas, loaded, setLoaded, errors, setErrors}) => {
  const navigate = useNavigate();

  const createPizza = (pizza) => {
    axios.post("http://localhost:8000/api/pizzas", pizza).then((res) => {
      setPizzas([...pizzas, res.data]),
      setErrors([]),
      navigate("/");
    })
    .catch((err) => {
      const errorResponse = err.response.data.errors;
      const errorArr = [];
      for (const key of Object.keys(errorResponse)) {
        errorArr.push(errorResponse[key].message);
      }
      setErrors(errorArr);
    })
  };

  // console.log(pizzas.length);

  return (
    <div className="m-auto card p-3 mt-3 mb-4 col-5 my-shadow">
      {/* <h1 className="text-center">Add a New Record</h1> */}
      <div className="m-auto col-10">
        <PizzaForm
          onSubmitProp={createPizza}
          pizzas={pizzas}
          initialPizzaType=""
          initialPizzaSize=""
          initialIsDelivered={false}
          initialNotes=""
          initialDeliveryTime=""
          initialNotesError=""
          initialDeliveryTimeError=""
          initialUndeliveredError=""
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
};