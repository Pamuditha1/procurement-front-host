import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ShowUser(props) {
  const jwt = localStorage.getItem("token");
  const usern = jwtDecode(jwt).name;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    toast.dark("Logged Out Successfully");
    // props.history.push("/");
  };

  return (
    <div
      className="row mt-3 mb-3 ml-3 mr-3 border-bottom"
      style={{ color: "white" }}
    >
      <div className="col-4">
        <FontAwesomeIcon icon={faUser} size="3x" />
      </div>
      <div className="col-8">
        {usern}
        <Link to="/">
          <p onClick={logout}>Logout</p>
        </Link>
      </div>
    </div>
  );
}

export default ShowUser;
