import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";
import "../../css/sideBar.css";

import ShowUser from "../ShowUser";
import getRejectedMSRCount from "../../services/getRejectedMSRCount";
import getPOsCount from "../../services/getConfirmedPOCount";

import msr from "../../icons/msr2.png";
import msrB from "../../icons/msr2B.png";
import du from "../../icons/du2.png";
import duB from "../../icons/du2B.png";
import po from "../../icons/po2.png";
import poB from "../../icons/po2B.png";
import grn from "../../icons/grn2.png";
import grnB from "../../icons/grn2B.png";

function SESidebar(props) {
  const [clicked, setclicked] = useState("");

  const [numOfOrders, setnumOfOrders] = useState(0);
  const [confirmedPOCount, setconfirmedPOCount] = useState(0);

  useEffect(() => {
    setInterval(async () => {
      let count = await getRejectedMSRCount();
      let poCount = await getPOsCount();
      setnumOfOrders(count);
      setconfirmedPOCount(poCount);
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
  const logoColor = {
    color: "white",
  };

  return (
    <div className="sidenav">
      <ShowUser {...props} />
      <Link to="/site-engineer/create-msr">
        <p
          onClick={onClick}
          id="create-msr"
          style={clicked === "create-msr" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="1x"
              style={clicked === "create-msr" ? onClickStyle : logoColor}
            />
            <img
              src={clicked === "create-msr" ? msrB : msr}
              height="35px"
              width="35px"
              className="ml-1"
              alt="msr"
            />
          </span>
          Create MSR
        </p>
      </Link>
      <Link to="/site-engineer/create-daily-usage">
        <p
          onClick={onClick}
          id="usage"
          style={clicked === "usage" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="1x"
              style={clicked === "usage" ? onClickStyle : logoColor}
            />
            <img
              src={clicked === "usage" ? duB : du}
              height="25px"
              width="25px"
              className="ml-1"
              alt="du"
            />
          </span>
          Daily Usage
        </p>
      </Link>

      <Link to="/site-engineer/view-msr">
        <p
          onClick={onClick}
          id="view-msr"
          style={clicked === "view-msr" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="35px"
              width="35px"
              src={clicked === "view-msr" ? msrB : msr}
              alt="msr"
            />
          </span>
          View MSR
          {numOfOrders > 0 && (
            <Badge className="ml-3" color="danger">
              {numOfOrders}
            </Badge>
          )}
        </p>
      </Link>

      <Link to="/site-engineer/view-po">
        <p
          onClick={onClick}
          id="view-po"
          style={clicked === "view-po" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="30px"
              width="30px"
              src={clicked === "view-po" ? poB : po}
              alt="po"
            />
          </span>
          View PO
          {confirmedPOCount > 0 && (
            <Badge className="ml-3" color="warning">
              {confirmedPOCount}
            </Badge>
          )}
        </p>
      </Link>
      <Link to="/site-engineer/view-grn">
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

export default SESidebar;
