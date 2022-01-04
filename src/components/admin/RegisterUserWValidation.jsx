import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import addUser from "../../services/addUser";

function RegisterUserWValidation() {
  const initialUser = {
    username: "",
    email: "",
    contactNo: "",
    contactNo2: "",
    nic: "",
    address: "",
    type: "",
    password: "",
    repeatpassword: "",
  };
  const formik = useFormik({
    initialValues: initialUser,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(25, "Maximum 25 characters")
        .required("Username is Required"),
      email: Yup.string().email("Invalid Email").required("Email is Required"),
      contactNo: Yup.string()
        .matches(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
          "Invalid Contact Number"
        )
        .required("Mobile Contact Number is Required"),
      contactNo2: Yup.string()
        .matches(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
          "Invalid Contact Number"
        )
        .required("Fixed Contact Number is Required"),
      nic: Yup.string()
        .matches(/^([0-9]{9}[X|V]|[0-9]{12})$/, "Invalid NIC")
        .required("NIC is required."),
      address: Yup.string().required("Address is Required"),
      type: Yup.string().required("User Type is Required"),
      password: Yup.string()
        .min(5, "Minimum 5 Characters")
        .required("Password is Required"),
      repeatpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's Not Match")
        .required("Repeat Password is Required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      const success = await addUser(values);
      if (success) {
        formik.resetForm();
      }
    },
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

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Register User
      </h6>
      <form
        onSubmit={formik.handleSubmit}
        className="container mt-5"
        autoComplete="off"
      >
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="username" className="col-5">
                  User Name
                </label>
                <input
                  autocomplete="new-password"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="username"
                  name="username"
                />
                {formik.errors.username && formik.touched.username && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.username}
                  </p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="nic" className="col-5">
                  NIC
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.nic}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="nic"
                  name="nic"
                  placeholder="xxxxxxxxxV"
                />
                {formik.errors.nic && formik.touched.nic && (
                  <p className="ml-5 mt-2 text-danger">{formik.errors.nic}</p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="email" className="col-5">
                  Email
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="email"
                  name="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="ml-5 mt-2 text-danger">{formik.errors.email}</p>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="contactNo" className="col-5">
                  Contact No (Mobile)
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contactNo}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  placeholder="07xxxxxxxx"
                />
                {formik.errors.contactNo && formik.touched.contactNo && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.contactNo}
                  </p>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="contactNo2" className="col-5">
                  Contact No (Fixed)
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.contactNo2}
                  className="form-control col-10"
                  type="text"
                  id="contactNo2"
                  name="contactNo2"
                  placeholder="0xxxxxxxxxx"
                />
                {formik.errors.contactNo2 && formik.touched.contactNo2 && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.contactNo2}
                  </p>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="address" className="col-5">
                  Address
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="address"
                  name="address"
                />
                {formik.errors.address && formik.touched.address && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.address}
                  </p>
                )}
              </div>

              <div className="form-group col-12">
                <label htmlFor="type" className="col-5">
                  User Role
                </label>

                <select
                  onChange={formik.handleChange}
                  value={formik.values.type}
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
                {formik.errors.type && formik.touched.type && (
                  <p className="ml-5 mt-2 text-danger">{formik.errors.type}</p>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  autocomplete="new-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="ml-5 mt-2 text-danger">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="repeatpassword" className="col-5">
                  Repeat Password
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.repeatpassword}
                  className="form-control col-10 ml-3"
                  type="password"
                  id="repeatpassword"
                  name="repeatpassword"
                />
                {formik.errors.repeatpassword &&
                  formik.touched.repeatpassword && (
                    <p className="ml-5 mt-2 text-danger">
                      {formik.errors.repeatpassword}
                    </p>
                  )}
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button
                    //onClick={submit}
                    type="submit"
                    className="btn btn-success"
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

export default RegisterUserWValidation;
