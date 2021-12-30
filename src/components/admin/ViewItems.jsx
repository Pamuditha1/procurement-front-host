import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";
// import { AutoComplete, InputGroup, Icon } from "rsuite";
// import "rsuite/dist/styles/rsuite-default.css";

import getItems from "../../services/getItems";

function ViewItems({ viewItem }) {
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
      if (searchItem.trim() == "") {
        const results = await getItems();
        setitems(results);
        return;
      }
      let searched = items.filter((i) => {
        if (i.name.includes(searchItem) || i.code.includes(searchItem))
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

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Items
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
            <th>Reorder Level</th>
            {/* <th>Quantity</th> */}
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
                  <td className="text-center">{i.reorderL}</td>
                  {/* <td className="text-center">{i.quantity}</td> */}
                  <td>
                    <Link to="/admin/items/edit">
                      <button
                        onClick={() => setUpdate(i)}
                        className="btn btn-outline-warning"
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewItems;
