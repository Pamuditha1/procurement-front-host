import React, { useState } from "react";
import { Link } from "react-router-dom";
import addUser from "../../services/addUser";

function RegisterUser() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    contactNo: "",
    contactNo2: "",
    nic: "",
    address: "",
    type: "",
    password: "",
    firstpassword: "",
    repeatpassword: "",
    passError: "",
  });
  const roles = [
    "Select Role",
    "Site Supervisor",
    "Site Engineer",
    "QS Department",
    "Purchasing Department",
    "Supplier",
    "Admin",
  ];
  const [loading, setLoading] = useState(false);
  const [allowSubmit, setallowSubmit] = useState(true);

  const onchange = (e) => {
    if (e.target.name == "password") {
      setUserData({
        ...userData,
        ["firstpassword"]: e.target.value,
      });
      return;
    }

    if (e.target.name == "repeatpassword") {
      if (e.target.value == userData.firstpassword) {
        setUserData({
          ...userData,
          ["repeatpassword"]: e.target.value,
          ["password"]: e.target.value,
          ["passError"]: "",
        });
        setallowSubmit(true);
        return;
      } else {
        setUserData({
          ...userData,
          ["repeatpassword"]: e.target.value,
          ["passError"]: "Password is different to above",
        });
        setallowSubmit(false);
        return;
      }
    }
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    // console.log(userData)
  };
  const onchangeSelectRole = (e) => {
    setUserData({
      ...userData,
      type: e.target.value,
    });
    // console.log(productData)
  };
  const reload = () => {
    window.location.reload(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(userData);
    await addUser(userData);
    // addProduct(userData)
    console.log(userData);
    setLoading(false);
  };

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Add User
      </h6>
      <form className="container mt-5" autoComplete="off">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="username" className="col-5">
                  User Name
                </label>
                <input
                  onChange={onchange}
                  value={userData.productNo}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="username"
                  name="username"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="nic" className="col-5">
                  NIC
                </label>
                <input
                  onChange={onchange}
                  value={userData.nic}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="nic"
                  name="nic"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="email" className="col-5">
                  Email
                </label>
                <input
                  onChange={onchange}
                  value={userData.email}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="contactNo" className="col-5">
                  Contact No (Mobile)
                </label>
                <input
                  onChange={onchange}
                  value={userData.contact1}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="contactNo"
                  name="contactNo"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="contactNo2" className="col-5">
                  Contact No (Fixed)
                </label>
                <input
                  onChange={onchange}
                  value={userData.contact2}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="contactNo2"
                  name="contactNo2"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="address" className="col-5">
                  Address
                </label>
                <input
                  onChange={onchange}
                  value={userData.address}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="address"
                  name="address"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="type" className="col-5">
                  User Role
                </label>
                {/* <input onChange={onchange} value={productData.material} className="form-control col-11 ml-3" type="text" id="material" name="material"/> */}
                <select
                  onChange={onchangeSelectRole}
                  value={userData.type}
                  id="type"
                  name="type"
                  className="form-control col-11 ml-3"
                  required
                >
                  {roles.map((option) => {
                    return (
                      <option
                        key={option}
                        value={option}
                        style={{ textAlign: "center" }}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  onChange={onchange}
                  value={userData.firstpassword}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="repeatpassword" className="col-5">
                  Repeat Password
                </label>
                <input
                  onChange={onchange}
                  value={userData.repeatpassword}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="repeatpassword"
                  name="repeatpassword"
                />
                <p className="col-11 ml-3 " style={{ color: "red" }}>
                  {userData.passError}
                </p>
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button
                    onClick={submit}
                    type="submit"
                    className="btn btn-success"
                    disabled={!allowSubmit}
                  >
                    Register
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterUser;
