import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Loader from "react-loader-spinner";

import getUsers from "../../services/getUsers";

function ViewSuppliers() {
  const [users, setusers] = useState(null);
  const [searchItem, setsearchItem] = useState("");

  useEffect(() => {
    async function fetchItems() {
      const results = await getUsers();
      let suppliers = results.filter((r) => {
        if (r.type === "Supplier") return true;
        return false;
      });
      setusers(suppliers);
    }

    fetchItems();
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      const results = await getUsers();
      let suppliers = results.filter((r) => {
        if (r.type === "Supplier") return true;
        return false;
      });
      let searchI = searchItem.toLowerCase();
      if (searchI.trim() === "") {
        setusers(suppliers);
        return;
      }
      let searched = suppliers.filter((i) => {
        if (
          i.username.toLowerCase().includes(searchI) ||
          i.contactNo.includes(searchI) ||
          i.email.toLowerCase().includes(searchI)
        )
          return true;
        return false;
      });
      setusers(searched);
    }
  };
  const onChange = async (e) => {
    setsearchItem(e.target.value);
  };

  return (
    <>
      {!users ? (
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
            Suppliers
          </h6>

          <input
            value={searchItem}
            className="form-control mb-5 mt-5"
            onChange={onChange}
            onKeyDown={search}
            placeholder="Search Name, Contact No, Email ..."
          />

          <Table hover borderless>
            <thead className="text-center">
              <tr>
                <th>Name</th>
                <th>Credit</th>
                <th>Contact No</th>
                <th>Email</th>
                <th>Address</th>
                <th>Projects</th>
              </tr>
            </thead>
            <tbody>
              {users.map((i) => {
                return (
                  <>
                    <tr style={{ textAlign: "center" }} key={i._id}>
                      <td className="text-center">{i.username}</td>
                      <td className="text-center text-danger">
                        Rs. {i.credit ? i.credit : 0}
                      </td>
                      <td className="text-center">{i.contactNo}</td>
                      <td className="text-center">{i.email}</td>
                      <td className="text-center">{i.address}</td>
                      <td className="text-center">{i.projects}</td>
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

export default ViewSuppliers;
