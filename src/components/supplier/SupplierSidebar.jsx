import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";
import "../../css/sideBar.css";
import ShowUser from "../ShowUser";

import po from "../../icons/po2.png";
import poB from "../../icons/po2B.png";

import getPOPendingPRCount from "../../services/getPOCreatedCount";

function SupplierSidebar() {
  const [clicked, setclicked] = useState("");
  const [numOfOrders, setnumOfOrders] = useState(0);

  useEffect(() => {
    setInterval(async () => {
      let count = await getPOPendingPRCount();
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
      <ShowUser />
      <Link to="/supplier/view-po">
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
          {numOfOrders > 0 && (
            <Badge className="ml-3" color="warning">
              {numOfOrders}
            </Badge>
          )}
        </p>
      </Link>
    </div>
  );
}

export default SupplierSidebar;
