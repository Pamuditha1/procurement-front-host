import React, { useState } from "react";
import { Link } from "react-router-dom";
// import registerSupplier from "../services/addSupplier";

function RegisterSupplier() {
  const [supplierData, setsupplierData] = useState({
    name: "",
    email: "",
    nic: "",
    contact1: "",
    contact2: "",
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
      setsupplierData({
        ...supplierData,
        ["firstpassword"]: e.target.value,
      });
      return;
    }

    if (e.target.name == "repeatpassword") {
      if (e.target.value == supplierData.firstpassword) {
        setsupplierData({
          ...supplierData,
          ["repeatpassword"]: e.target.value,
          ["password"]: e.target.value,
          ["passError"]: "",
        });
        setallowSubmit(true);
        return;
      } else {
        setsupplierData({
          ...supplierData,
          ["repeatpassword"]: e.target.value,
          ["passError"]: "Password is different to above",
        });
        setallowSubmit(false);
        return;
      }
    }
    setsupplierData({
      ...supplierData,
      [e.target.name]: e.target.value,
    });
    // console.log(supplierData)
  };
  const onchangeSelectRole = (e) => {
    setsupplierData({
      ...supplierData,
      type: e.target.value,
    });
    // console.log(productData)
  };
  const reload = () => {
    window.location.reload(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // await registerSupplier(supplierData);
    // // addProduct(customerData)
    console.log(supplierData);
    // setLoading(false);
  };

  return (
    <div>
      <h6 className="pl-5 pt-1 pb-1 mb-5">Add Supplier</h6>
      <form className="container mt-5" autoComplete="off">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="name" className="col-5">
                  Supplier Name
                </label>
                <input
                  onChange={onchange}
                  value={supplierData.productNo}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="nic" className="col-5">
                  NIC
                </label>
                <input
                  onChange={onchange}
                  value={supplierData.nic}
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
                  value={supplierData.email}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="contact1" className="col-5">
                  Contact No (Mobile)
                </label>
                <input
                  onChange={onchange}
                  value={supplierData.contact1}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="contact1"
                  name="contact1"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="contact2" className="col-5">
                  Contact No (Official)
                </label>
                <input
                  onChange={onchange}
                  value={supplierData.contact2}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="contact2"
                  name="contact2"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="address" className="col-5">
                  Address
                </label>
                <input
                  onChange={onchange}
                  value={supplierData.address}
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
                  value={supplierData.type}
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
              <div className="form-group col-12">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  onChange={onchange}
                  value={supplierData.firstpassword}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="repeatpassword" className="col-5">
                  Repeat Password
                </label>
                <input
                  onChange={onchange}
                  value={supplierData.repeatpassword}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="repeatpassword"
                  name="repeatpassword"
                />
                <p className="col-11 ml-3 " style={{ color: "red" }}>
                  {supplierData.passError}
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

export default RegisterSupplier;
