import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";
import "../../css/sideBar.css";
import ShowUser from "../ShowUser";

import msr from "../../icons/msr2.png";
import msrB from "../../icons/msr2B.png";

import getMSRsCount from "../../services/getMSRScount";

function SSSidebar() {
  const [clicked, setclicked] = useState("");
  const [numOfOrders, setnumOfOrders] = useState(0);

  useEffect(() => {
    setInterval(async () => {
      let count = await getMSRsCount();
      setnumOfOrders(count);
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
  const s = {};
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
      <Link to="/site-supervisor/view-msr">
        <p
          onClick={onClick}
          id="view-msr"
          style={clicked == "view-msr" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <img
              src={msr}
              height="40px"
              width="40px"
              src={clicked == "view-msr" ? msrB : msr}
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

export default SSSidebar;
