import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Loader from "react-loader-spinner";

import getProjects from "../../services/getProjects";

function ViewProjects() {
  const [projects, setprojects] = useState([]);
  const [searchItem, setsearchItem] = useState("");

  useEffect(() => {
    async function fetchItems() {
      const results = await getProjects();
      setprojects(results);
    }

    fetchItems();
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      const results = await getProjects();
      let searchI = searchItem.toLowerCase();

      if (searchI.trim() === "") {
        setprojects(results);
        return;
      }
      let searched = results.filter((i) => {
        if (
          i.projectNo?.toLowerCase().includes(searchI) ||
          i.name?.toLowerCase().includes(searchI) ||
          i.client?.toLowerCase().includes(searchI) ||
          i.location.toLowerCase().includes(searchI)
        )
          return true;
        return false;
      });
      setprojects(searched);
    }
  };
  const onChange = async (e) => {
    setsearchItem(e.target.value);
  };

  return (
    <>
      {projects?.length === 0 ? (
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
            Projects
          </h6>

          <input
            value={searchItem}
            className="form-control mb-5 mt-5"
            onChange={onChange}
            onKeyDown={search}
            placeholder="Search Project No, Name, Client, Location ..."
          />

          <Table hover borderless>
            <thead className="text-center">
              <tr>
                <th>Project Code</th>
                <th>Name</th>
                <th>Location</th>
                <th>Client</th>
                <th>Contact No</th>
                <th>Suppliers</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((i, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr style={{ textAlign: "center" }} key={i._id}>
                      <td className="text-center">{i.projectNo}</td>
                      <td className="text-center">{i.name}</td>
                      <td className="text-center">{i.location}</td>
                      <td className="text-center">{i.client}</td>
                      <td className="text-center">{i.clientCoNo}</td>
                      <td className="text-center">
                        {i.suppliers && i.suppliers.toString()}
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

export default ViewProjects;
