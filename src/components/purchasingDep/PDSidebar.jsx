import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    // let count = await getOrdersCount()
    // setnumOfOrders(count)
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
    console.log(clicked);
  };

  return (
    <div className="sidenav">
      {/* <Link to="/admin/orders">
        <p
          onClick={onClick}
          id="orders"
          style={clicked == "orders" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faBell} size="2x" />
          </span>
          Orders
          {numOfOrders > 0 && (
            <Badge className="ml-3" color="warning">
              {numOfOrders}
            </Badge>
          )}
        </p>
      </Link> */}
      <ShowUser />
      <Link to="/pur-dep/view-pr">
        <p
          onClick={onClick}
          id="view-pr"
          style={clicked == "view-pr" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="35px"
              width="35px"
              src={clicked == "view-pr" ? prB : pr}
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
          style={clicked == "view-po" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="35px"
              width="35px"
              src={clicked == "view-po" ? poB : po}
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
          style={clicked == "view-du" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="35px"
              width="35px"
              src={clicked == "view-du" ? duB : du}
            />
          </span>
          View DU
        </p>
      </Link>
      <Link to="/pur-dep/view-grn">
        <p
          onClick={onClick}
          id="view-grn"
          style={clicked == "view-grn" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              height="40px"
              width="40px"
              src={clicked == "view-grn" ? grnB : grn}
            />
          </span>
          View GRN
        </p>
      </Link>

      {/* <Link to="/admin/viewitems">
        <p
          onClick={onClick}
          id="view-item"
          style={clicked == "view-item" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faImages} size="2x" />
          </span>
          View Items
        </p>
      </Link>
      <Link to="/admin/add-supplier">
        <p
          onClick={onClick}
          id="add-supp"
          style={clicked == "add-supp" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faHandshake} size="2x" />
          </span>
          Add Supplier
        </p>
      </Link>
      <Link to="/admin/inventory">
        <p
          onClick={onClick}
          id="inven"
          style={clicked == "inven" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faBoxes} size="2x" />
          </span>
          Inventory
        </p>
      </Link>
      <Link to="/admin/sales">
        <p
          onClick={onClick}
          id="sales"
          style={clicked == "sales" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" />
          </span>
          Sales
        </p>
      </Link> */}
      {/*<Link to="/user/members">
                <p><span style={{marginRight: 10}}><FontAwesomeIcon icon={faIdCard} size="2x"/></span>Members</p>
            </Link>
            <Link to="/user/payments/view">
                <p><span style={{marginRight: 10}}><FontAwesomeIcon icon={faMoneyCheckAlt} size="2x"/></span>Payments</p>
            </Link>
            <Link to="/user/receipt">
                <p><span style={{marginRight: 10}}><FontAwesomeIcon icon={faFileInvoiceDollar} size="2x"/></span>Receipt</p>
            </Link>        
            <Link to="/user/register-user">
                <p><span style={{marginRight: 10}}><FontAwesomeIcon icon={faRegistered} size="2x"/></span>Register User</p>
            </Link> */}
    </div>
  );
}

export default PDSidebar;
