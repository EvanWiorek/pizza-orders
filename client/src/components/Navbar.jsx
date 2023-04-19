import { useNavigate, useLocation } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navAddPizza = () => {
    navigate("/pizzas");
  };

  const navHome = () => {
    navigate("/");
  };

  if (location.pathname === "/") {
    return (
      <div className="my-navbar">
        <div className="navbar-content d-flex gap-5 align-items-center justify-content-between col-7 m-auto">
          <div className="d-flex gap-4">
            <h1 className="site-title">Pizza Order</h1>
          </div>
          <button className="btn btn-outline-light" onClick={navAddPizza}>
            Order a Pizza
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-navbar">
        <div className="navbar-content d-flex gap-5 align-items-center justify-content-between col-7 m-auto">
          <div className="d-flex gap-4">
            <h1 className="site-title">Pizza Order</h1>
          </div>
          <button className="btn btn-outline-light" onClick={navHome}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }
};
