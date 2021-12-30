import React from "react";
import "../css/headerStyle.css";
import Logo from "../images/logo3.png";

function ControlHeader() {
  const style = {
    backgroundColor: "#050A30",
    height: "100px",
    width: "100%",
    textAlign: "center",
    position: "relative",
    // paddingTop: "30px",
    color: "white",
  };
  // const style = {
  //   backgroundImage: `url(${Background})`,
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  // };
  return (
    <div style={style}>
      <div className="row">
        <div className="col-1"></div>

        <div className="col-10">
          <h5 style={{ paddingTop: "30px" }}>Success Constructions</h5>
          <p>Procurement Management System</p>
        </div>
        <div className="col-1">
          <img src={Logo} width="70px" style={{ paddingTop: "20px" }} />
        </div>
      </div>

      {/* <img src={logo} id="logo" height="100px" width="100px" />
      <div id="siteName">
        <h3 id="adminbrand">NINETEESCollection</h3>
        <h1 id="admintagline" style={{ color: "red" }}>
          <strong>Control Pannel</strong>
        </h1>
      </div> */}
    </div>
  );
}

export default ControlHeader;
