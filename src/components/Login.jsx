import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Background from "../images/cover.png";

import userLogin from "../services/userLoginService";

function Login(props) {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const [invalidLogin, setinvalidLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const onchange = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    // console.log(customerData)
  };
  const reload = () => {
    window.location.reload(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await userLogin(loginData);
    if (result) {
      localStorage.setItem("token", result.jwt);
      localStorage.setItem("type", result.type);
      console.log(props);
      switch (result.type) {
        case "Site Engineer":
          props.history.push("/site-engineer/view-msr");
          break;

        case "Site Supervisor":
          props.history.push("/site-supervisor");
          break;

        case "QS Department":
          props.history.push("/qs-dep");
          break;
        case "Purchasing Department":
          props.history.push("/pur-dep");
          break;
        case "Admin":
          props.history.push("/admin/stock");
          break;
        case "Supplier":
          props.history.push("/supplier");
          break;
        default:
          props.history.push("/");
      }
    } else {
      setinvalidLogin(true);
    }
    console.log(loginData);
    setLoading(false);
  };

  const style = {
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/image.png'})`

    //marginTop: "7%",
    paddingTop: "10%",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const formStyle = {
    backgroundColor: "rgb(0, 0, 0, 0.5)",
    padding: "50px 30px 50px 30px",
    color: "white",
    borderRadius: "20px",
  };

  console.log("URL", `${process.env.PUBLIC_URL + "/image.png"}`);

  return (
    <div className="row" style={style}>
      {/* {invalidLogin && (
        <center>
          <div class="alert alert-warning" role="alert">
            Please check you email and password.{" "}
          </div>
        </center>
      )} */}
      {/* <Link to="/user/login">
          <button type="button" className="btn btn-light">
            Not Registered Yet? Register
          </button>
        </Link> */}

      <div className="col-3"></div>
      <form className="container mt-5 mb-5 col-6" style={formStyle}>
        <center>
          <FontAwesomeIcon icon={faUserCircle} size="10x" />
        </center>

        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="email" className="col-5">
                  Email
                </label>
                <input
                  onChange={onchange}
                  value={loginData.email}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  onChange={onchange}
                  value={loginData.password}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button
                    onClick={submit}
                    type="submit"
                    className="btn btn-success"
                  >
                    Login
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="col-3"></div>
    </div>
  );
}

export default Login;
