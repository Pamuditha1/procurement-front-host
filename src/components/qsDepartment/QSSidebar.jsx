import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import "../../css/sideBar.css";

import ShowUser from "../ShowUser";
import msr from "../../icons/msr2.png";
import msrB from "../../icons/msr2B.png";
import pr from "../../icons/pr2.png";
import prB from "../../icons/pr2B.png";

import getPRPendingMSRCount from "../../services/getPRPendingMSRCount";

function QSSidebar() {
  const [clicked, setclicked] = useState("");
  const [numOfOrders, setnumOfOrders] = useState(0);

  useEffect(() => {
    setInterval(async () => {
      let count = await getPRPendingMSRCount();
      setnumOfOrders(count);
    }, 5000);
  }, []);

  const onClickStyle = {
    backgroundColor: "white",
    opacity: "0.7",
    color: "black",
    fontWeight: "bold",
  };
  const s = {
    fontWeight: "bold",
  };
  const onClick = (e) => {
    setclicked(e.target.id);
  };

  return (
    <div className="sidenav">
      <ShowUser />
      <Link to="/qs-dep/view-msr">
        <p
          onClick={onClick}
          id="view-msr"
          style={clicked === "view-msr" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="40px"
              width="40px"
              src={clicked === "view-msr" ? msrB : msr}
              alt="msr"
            />
          </span>
          View MSR
          {numOfOrders > 0 && (
            <Badge className="ml-3" color="warning">
              {numOfOrders}
            </Badge>
          )}
        </p>
      </Link>
      <Link to="/qs-dep/view-pr">
        <p
          onClick={onClick}
          id="view-pr"
          style={clicked === "view-pr" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="35px"
              width="35px"
              src={clicked === "view-pr" ? prB : pr}
              alt="pr"
            />
          </span>
          View PR
        </p>
      </Link>
    </div>
  );
}

export default QSSidebar;
