import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({
  pizzas,
  initialPizzaType,
  initialPizzaSize,
  initialNotes,
  initialDeliveryTime,
  onSubmitProp,
  formTitle,
  initialNotesError,
  initialDeliveryTimeError,
  initialUndeliveredError,
  errors,
  setErrors,
}) => {
  const [pizzaType, setPizzaType] = useState(initialPizzaType);
  const [pizzaSize, setPizzaSize] = useState(initialPizzaSize);
  const [notes, setNotes] = useState(initialNotes);
  const [deliveryTime, setDeliveryTime] = useState(initialDeliveryTime);
  const [notesError, setNotesError] = useState(null);
  const [deliveryTimeError, setDeliveryTimeError] = useState(
    initialDeliveryTimeError
  );
  const [undeliveredError, setUndeliveredError] = useState(null);

  const navigate = useNavigate();

  const homeButton = () => {
    navigate("/");
    setErrors([]);
  };

  let formIsValid = false;
  formIsValid =
    deliveryTimeError === null &&
    notesError === null &&
    undeliveredError === null;

  const handlePizzaType = (e) => {
    setPizzaType(e.target.value);
  };

  const handlePizzaSize = (e) => {
    setPizzaSize(e.target.value);
  };

  const handleNotes = (e) => {
    setNotes(e.target.value);
    if (e.target.value.length === 0) {
      setNotesError(null);
    }
    else if (e.target.value.length > 0 && e.target.value < 25) {
      setNotesError(null);
    }
    else if (e.target.value.length > 25) {
      setNotesError("Notes must contain max of 25 characters.");
    } 
    else {
      setNotesError(null);
    }
  };

  const handleDeliveryTime = (e) => {
    setDeliveryTime(e.target.value);
    setDeliveryTimeError(null)
  };

  // console.log(pizzas);
  // console.log(formIsValid);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const pizzaCount = pizzas.filter((pizza) => pizza.isDelivered === false);
    if (pizzaCount.length >= 10) {
      setUndeliveredError("Max 10 deliveries, try again later.")
    }
    else if (undeliveredError === null) {
      onSubmitProp({ pizzaType, pizzaSize, notes, deliveryTime });
      if (errors === []) {
        navigate("/");
      }
    }

  };

  return (
    <div>
      <h2 className="text-center">{formTitle}</h2>
      <form onSubmit={onSubmitHandler}>
        {errors.map((err, index) => (
          <p key={index} style={{ color: "tomato" }} className="mt-2">
            {err}
          </p>
        ))}
        <div className="form-inputs d-flex justify-content-around">
          <div className="left-side col-7">
            <div className="form-floating">
              <select
                className="form-select"
                id="pizzaType"
                name="pizzaType"
                value={pizzaType}
                onChange={handlePizzaType}
              >
                <option hidden disabled value="">
                  Select Pizza
                </option>
                <option value="Pepperoni">Pepperoni</option>
                <option value="Cheese">Cheese</option>
                <option value="Combination">Combination</option>
                <option value="Philly Cheese Steak">Philly Cheese Steak</option>
                <option value="Hawaiian">Hawaiian</option>
                <option value="Veggie">Veggie</option>
              </select>
              <label htmlFor="pizzaType">Select Pizza Type:</label>
            </div>
            <div className="form-floating">
            <select
                className="form-select mt-4"
                id="pizzaSize"
                name="pizzaSize"
                value={pizzaSize}
                onChange={handlePizzaSize}
              >
                <option hidden disabled value="">
                  Select Size
                </option>
                <option value="Single">Single</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <label htmlFor="pizzaType">Select Size:</label>
            </div>
            <div className="form-floating mt-4">
              <input
                type="text"
                onChange={handleNotes}
                id="notes"
                value={notes}
                className="form-control mt-4"
                placeholder="Notes:"
              />
              <label>Notes:</label>
              {notesError ? (
                <p style={{ color: "tomato" }} className="mt-2">
                  {notesError}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="right-side col-4">
            <div className="deliveryTime">
              <div className="form-floating">
                <input
                  type="date"
                  onChange={handleDeliveryTime}
                  id="deliveryTime"
                  name="deliveryTime"
                  value={deliveryTime}
                  className="form-control"
                  placeholder="Last Name:"
                />
                <label>Delivery Time</label>
                {deliveryTimeError ? (
                  <p style={{ color: "tomato" }} className="mt-2">
                    {deliveryTimeError}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3 mt-4 justify-content-end">
        {undeliveredError ? (
                <p style={{ color: "tomato" }} className="mt-2">
                  {undeliveredError}
                </p>
              ) : (
                ""
              )}
          <input
            type="submit"
            className={`btn btn-outline-primary ${
              formIsValid ? "" : "disabled"
            }`}
          />
          <div>
            <button className="btn btn-outline-success" onClick={homeButton}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
