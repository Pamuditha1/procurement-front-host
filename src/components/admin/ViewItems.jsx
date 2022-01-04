import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import getItems from "../../services/getItems";

function ViewItems() {
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
      if (searchItem.trim() === "") {
        setitems(results);
        return;
      }
      let searched = results.filter((i) => {
        if (i.name.toLowerCase().includes(searchI) || i.code.includes(searchI))
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
            Items
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
                <th>Reorder Level</th>
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
                      <td className="text-center">{i.reorderL}</td>
                      <td>
                        <Link to={`/admin/items/edit/${i._id}`}>
                          <button className="btn btn-outline-warning">
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
      )}
    </>
  );
}

export default ViewItems;
