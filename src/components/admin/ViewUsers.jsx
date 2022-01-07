import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import getUsers from "../../services/getUsers";

function ViewUsers({ viewUser }) {
  const [users, setusers] = useState([]);
  const [searchItem, setsearchItem] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const results = await getUsers();
      setusers(results);
    }
    fetchUsers();
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      const results = await getUsers();
      let searchI = searchItem.toLowerCase();
      if (searchI.trim() === "") {
        setusers(results);
        return;
      }
      let searched = results.filter((i) => {
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
  const setUpdate = (i) => {
    viewUser(i);
  };

  return (
    <>
      {users.length === 0 ? (
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
            Users
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
                <th>Contact No</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((i, index) => {
                if (i.email === "pamuditha@gmail.com") return false;
                return (
                  <React.Fragment key={index}>
                    <tr style={{ textAlign: "center" }} key={i._id}>
                      <td className="text-center">{i.username}</td>
                      <td className="text-center">{i.contactNo}</td>
                      <td className="text-center">{i.email}</td>
                      <td className="text-center">{i.address}</td>
                      <td className="text-center">{i.type}</td>
                      <td>
                        <Link to={`/admin/edit-user/${i._id}`}>
                          <button
                            onClick={() => setUpdate(i)}
                            className="btn btn-outline-warning"
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default ViewUsers;
