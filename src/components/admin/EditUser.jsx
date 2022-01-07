import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import updateUser from "../../services/updateUser";
import removeeUser from "../../services/removeUser";
import getOneUser from "../../services/getOneUser";

function EditUser({ history }) {
  const [user, setuser] = useState({});
  const { id } = useParams();
  const [loading, setloading] = useState(false);

  const [passData, setpassData] = useState({
    password: "",
    passwordT: "",
    passwordr: "",
    passError: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      const results = await getOneUser(id);
      setuser(results);
    }
    fetchUsers();
  }, [id]);

  const onchangePassword = (e) => {
    if (e.target.name === "password") {
      setpassData({
        ...passData,
        passwordT: e.target.value,
      });
      return;
    }

    if (e.target.name === "passwordr") {
      if (e.target.value === passData.passwordT) {
        setpassData({
          ...passData,
          password: e.target.value,
          passwordr: e.target.value,
          passError: "",
        });
        return;
      } else {
        setpassData({
          ...passData,
          passwordr: e.target.value,
          passError: "Password is different to above",
        });
        return;
      }
    }
  };

  const onchange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const removeUser = async (id) => {
    setloading(true);
    await removeeUser(id);
    history.push("/admin/view-users");
    setloading(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    setloading(true);
    let update = {
      user: user,
      pass: passData.password,
    };
    await updateUser(update);
    setloading(false);
  };
  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Update User
      </h6>
      <>
        {!user || loading ? (
          <div className="container text-center" style={{ width: "793px" }}>
            <Loader
              type="Puff"
              color="#050A30"
              height={100}
              width={100}
              timeout={5000}
            />
          </div>
        ) : (
          <form className="container mt-5" autoComplete="off">
            <div className="row">
              <div className="col-12">
                <button
                  onClick={() => removeUser(user._id)}
                  type="button"
                  className="btn btn-danger float-right"
                >
                  Remove User
                </button>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="form-group col-12">
                    <label htmlFor="username" className="col-5">
                      Name
                    </label>
                    <input
                      autoComplete="new-password"
                      autoFocus="off"
                      onChange={onchange}
                      value={user.username}
                      className="form-control col-11 ml-3"
                      type="text"
                      id="username"
                      name="username"
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="contactNo" className="col-5">
                      Contact No
                    </label>
                    <input
                      onChange={onchange}
                      value={user.contactNo}
                      className="form-control col-11 ml-3"
                      type="text"
                      id="contactNo"
                      name="contactNo"
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="email" className="col-5">
                      Email
                    </label>
                    <input
                      onChange={onchange}
                      value={user.email}
                      className="form-control col-11 ml-3"
                      type="text"
                      id="email"
                      name="email"
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="address" className="col-5">
                      Address
                    </label>
                    <input
                      onChange={onchange}
                      value={user.address}
                      className="form-control col-11 ml-3"
                      type="text"
                      id="address"
                      name="address"
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="password" className="col-5">
                      New Password
                    </label>
                    <input
                      autoComplete="new-password"
                      onChange={onchangePassword}
                      value={passData.passwordT}
                      className="form-control col-11 ml-3"
                      type="password"
                      id="password"
                      name="password"
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="passwordr" className="col-5">
                      Repeat Password
                    </label>
                    <input
                      onChange={onchangePassword}
                      value={passData.passwordr}
                      className="form-control col-11 ml-3"
                      type="password"
                      id="passwordr"
                      name="passwordr"
                    />
                    {passData.passError && (
                      <p className="col-11 ml-3 " style={{ color: "red" }}>
                        {passData.passError}
                      </p>
                    )}
                  </div>
                  <div className="form-group col-12 mt-3">
                    <center>
                      <Link to="/admin/view-users">
                        <button type="button" className="btn btn-dark m-5">
                          Back
                        </button>
                      </Link>
                      <button
                        onClick={submit}
                        type="submit"
                        className="btn btn-success"
                      >
                        Update
                      </button>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </>
    </div>
  );
}

export default EditUser;
