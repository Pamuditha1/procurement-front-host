import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import "../../css/sideBar.css";
import ShowUser from "../ShowUser";

import pr from "../../icons/pr2.png";
import prB from "../../icons/pr2B.png";
import po from "../../icons/po2.png";
import poB from "../../icons/po2B.png";
import grn from "../../icons/grn2.png";
import grnB from "../../icons/grn2B.png";
import du from "../../icons/du2.png";
import duB from "../../icons/du2B.png";

import getPOPendingPRCount from "../../services/getPOPendingPRcount";
import getPORejectCount from "../../services/getPORejectedCount";

function PDSidebar() {
  const [clicked, setclicked] = useState("");
  const [numOfOrders, setnumOfOrders] = useState(0);
  const [poRejected, setpoRejected] = useState(0);

  useEffect(() => {
    setInterval(async () => {
      let count = await getPOPendingPRCount();
      setnumOfOrders(count);
    }, 5000);

    setInterval(async () => {
      let count = await getPORejectCount();
      setpoRejected(count);
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
      <Link to="/pur-dep/view-pr">
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
          {numOfOrders > 0 && (
            <Badge className="ml-3" color="warning">
              {numOfOrders}
            </Badge>
          )}
        </p>
      </Link>
      <Link to="/pur-dep/view-po">
        <p
          onClick={onClick}
          id="view-po"
          style={clicked === "view-po" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="35px"
              width="35px"
              src={clicked === "view-po" ? poB : po}
              alt="po"
            />
          </span>
          View PO
          {poRejected > 0 && (
            <Badge className="ml-3" color="danger">
              {poRejected}
            </Badge>
          )}
        </p>
      </Link>
      <Link to="/pur-dep/view-du">
        <p
          onClick={onClick}
          id="view-du"
          style={clicked === "view-du" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="35px"
              width="35px"
              src={clicked === "view-du" ? duB : du}
              alt="du"
            />
          </span>
          View DU
        </p>
      </Link>
      <Link to="/pur-dep/view-grn">
        <p
          onClick={onClick}
          id="view-grn"
          style={clicked === "view-grn" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="40px"
              width="40px"
              src={clicked === "view-grn" ? grnB : grn}
              alt="grn"
            />
          </span>
          View GRN
        </p>
      </Link>
    </div>
  );
}

export default PDSidebar;
