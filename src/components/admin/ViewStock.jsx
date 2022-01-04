import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Loader from "react-loader-spinner";

import getItems from "../../services/getItems";

function ViewStock() {
  const [items, setitems] = useState(null);
  const [searchItem, setsearchItem] = useState("");

  useEffect(() => {
    async function fetchItems() {
      const results = await getItems();
      setitems(results);
    }

    fetchItems();
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      const results = await getItems();
      let searchI = searchItem.toLowerCase();
      if (searchI.trim() === "") {
        setitems(results);
        return;
      }
      let searched = results.filter((i) => {
        if (
          i.name.toLowerCase().includes(searchItem) ||
          i.code.includes(searchI)
        )
          return true;
        return false;
      });
      setitems(searched);
    }
  };
  const onChange = async (e) => {
    setsearchItem(e.target.value);
  };

  return (
    <>
      {!items ? (
        <div className="container text-center" style={{ width: "793px" }}>
          <Loader
            type="Puff"
            color="#050A30"
            height={100}
            width={100}
            timeout={5000}
          />
        </div>
      ) : (
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
            placeholder="Search Code, Item Name ..."
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
                return (
                  <>
                    <tr style={{ textAlign: "center" }} key={i._id}>
                      <td className="text-center">{i.code}</td>
                      <td className="text-center">{i.name}</td>
                      <td className="text-center">{i.unit}</td>
                      <td
                        style={{ backgroundColor: "yellow" }}
                        className={
                          parseInt(i.quantity) <= parseInt(i.reorderL) &&
                          i.projects.length > 0
                            ? "bg-danger text-light font-weight-bold"
                            : "text-center font-weight-bold"
                        }
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
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default ViewStock;
