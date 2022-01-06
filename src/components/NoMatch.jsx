import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  const style = {
    width: "100vh",
    height: "100vh",
    marginTop: "30%",
  };
  return (
    <div className="container text-center" style={style}>
      <h1>404 | Not Found</h1>
      <Link to="/">
        <small>Home</small>
      </Link>
    </div>
  );
}

export default NoMatch;
