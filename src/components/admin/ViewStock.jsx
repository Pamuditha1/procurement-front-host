import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";
// import { AutoComplete, InputGroup, Icon } from "rsuite";
// import "rsuite/dist/styles/rsuite-default.css";

import getItems from "../../services/getItems";

function ViewStock({ viewItem }) {
  const [items, setitems] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [isDisplay, setisDisplay] = useState("");
  const [updateItem, setupdateItem] = useState({});

  useEffect(() => {
    async function fetchItems() {
      const results = await getItems();
      //   console.log(results);
      setitems(results);
    }

    fetchItems();
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      let searchI = searchItem.toLowerCase();
      if (searchI.trim() == "") {
        const results = await getItems();
        setitems(results);
        return;
      }
      let searched = items.filter((i) => {
        if (
          i.name.toLowerCase().includes(searchItem) ||
          i.code.includes(searchI)
        )
          return true;
      });
      console.log(searched);
      setitems(searched);
    }
  };
  const onChange = async (e) => {
    setsearchItem(e.target.value);
  };
  // const viewModal = (i) => {
  //   setmodalItem(i);
  //   setisDisplay(id._id);
  // };
  const setUpdate = (i) => {
    viewItem(i);
  };

  const lessQty = {
    backgroundColor: "red",
    color: "white",
    padding: "3px",
  };

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Stock
      </h6>

      <input
        value={searchItem}
        className="form-control mb-5 mt-5"
        onChange={onChange}
        onKeyDown={search}
        placeholder="Search ..."
      />

      <Table hover borderless>
        <thead className="text-center">
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Unit</th>
            <th style={{ backgroundColor: "yellow" }}>Quantity</th>
            <th>Reorder Level</th>
            <th>Allocated Projects</th>
            <th>Suppliers</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => {
            // setsubTotal(subTotal + p.user.total)

            return (
              <>
                <tr style={{ textAlign: "center" }} key={i._id}>
                  <td className="text-center">{i.code}</td>
                  <td className="text-center">{i.name}</td>
                  <td className="text-center">{i.unit}</td>
                  <td
                    style={{ backgroundColor: "yellow" }}
                    className="text-center font-weight-bold"
                    className={
                      ((parseInt(i.quantity) <= parseInt(i.reorderL)) && i.projects.length > 0) &&
                      "bg-danger text-light font-weight-bold"
                    }
                  // style={i.quantity < i.reorderL && lessQty}
                  >
                    {i.quantity}
                  </td>
                  <td className="text-center">{i.reorderL}</td>
                  <td className="text-center">
                    {i.projects && i.projects.toString()}
                  </td>
                  <td className="text-center">
                    {i.suppliers && i.suppliers.toString()}
                  </td>

                  {/* <td>
                    <Link to="/admin/inventory/edit">
                      <button
                        onClick={() => setUpdate(i)}
                        className="btn btn-outline-warning"
                      >
                        Edit
                      </button>
                    </Link>
                  </td> */}
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewStock;
