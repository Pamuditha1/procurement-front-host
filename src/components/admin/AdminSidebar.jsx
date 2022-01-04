import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faPlusCircle,
  faCubes,
  faPeopleCarry,
  faUsers,
  faUserPlus,
  faBuilding,
  faPencilRuler,
  faFileInvoice,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";
import "../../css/sideBar.css";
import ShowUser from "../ShowUser";

import getItems from "../../services/getItems";

function AdminSidebar() {
  const [clicked, setclicked] = useState("");
  const [reorderItems, setreorderItems] = useState(0);

  useEffect(() => {
    async function fetchItems() {
      const results = await getItems();
      let count = 0;
      results.forEach((r) => {
        if (
          parseInt(r.quantity) <= parseInt(r.reorderL) &&
          r.projects.length > 0
        ) {
          count = count + 1;
        }
      });
      setreorderItems(count);
    }

    fetchItems();
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
      <Link to="/admin/documents">
        <p
          onClick={onClick}
          id="docs"
          style={clicked === "docs" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faFileInvoice} size="2x" />
          </span>
          Documents
        </p>
      </Link>
      <Link to="/admin/stock">
        <p
          onClick={onClick}
          id="stock"
          style={clicked === "stock" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faCubes} size="2x" />
          </span>
          View Stock
          {reorderItems > 0 && (
            <Badge className="ml-3" color="warning">
              {reorderItems}
            </Badge>
          )}
        </p>
      </Link>
      <Link to="/admin/suppliers">
        <p
          onClick={onClick}
          id="supp"
          style={clicked === "supp" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faPeopleCarry} size="2x" />
          </span>
          View Suppliers
        </p>
      </Link>
      <Link to="/admin/items">
        <p
          onClick={onClick}
          id="inven"
          style={clicked === "inven" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faPencilRuler} size="2x" />
          </span>
          View Items
        </p>
      </Link>
      <Link to="/admin/projects">
        <p
          onClick={onClick}
          id="view-project"
          style={clicked === "view-project" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faBuilding} size="2x" />
          </span>
          View Projects
        </p>
      </Link>
      <Link to="/admin/add-item">
        <p
          onClick={onClick}
          id="add-item"
          style={clicked === "add-item" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            <FontAwesomeIcon icon={faPencilRuler} size="1x" />
          </span>
          Add Item
        </p>
      </Link>
      <Link to="/admin/add-project">
        <p
          onClick={onClick}
          id="add-project"
          style={clicked === "add-project" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            <FontAwesomeIcon icon={faBuilding} size="1x" />
          </span>
          Add Project
        </p>
      </Link>
      <Link to="/admin/reports">
        <p
          onClick={onClick}
          id="reports"
          style={clicked === "reports" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faChartLine} size="2x" />
          </span>
          Reports
        </p>
      </Link>
      <Link to="/admin/view-users">
        <p
          onClick={onClick}
          id="view-user"
          style={clicked === "view-user" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faUsers} size="2x" />
          </span>
          View Users
        </p>
      </Link>
      <Link to="/admin/register-user">
        <p
          onClick={onClick}
          id="add-user"
          style={clicked === "add-user" ? onClickStyle : s}
        >
          <span style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faUserPlus} size="2x" />
          </span>
          Add User
        </p>
      </Link>
    </div>
  );
}

export default AdminSidebar;
