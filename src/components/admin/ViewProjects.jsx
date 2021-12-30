import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";
// import { AutoComplete, InputGroup, Icon } from "rsuite";
// import "rsuite/dist/styles/rsuite-default.css";

import getProjects from "../../services/getProjects";

function ViewProjects({ viewUser }) {
  const [projects, setprojects] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [isDisplay, setisDisplay] = useState("");
  const [updateItem, setupdateItem] = useState({});

  useEffect(() => {
    async function fetchItems() {
      const results = await getProjects();
      //   let suppliers = results.filter((r) => {
      //     if (r.type == "Supplier") return true;
      //   });
      //   console.log(results);
      setprojects(results);
    }

    fetchItems();
  }, []);

  //   const search = async (e) => {
  //     if (e.key === "Enter") {
  //       if (searchItem.trim() == "") {
  //         const results = await getUsers();
  //         setusers(results);
  //         return;
  //       }
  //       let searched = users.filter((i) => {
  //         if (i.name.includes(searchItem) || i.code.includes(searchItem))
  //           return true;
  //       });
  //       console.log(searched);
  //       setusers(searched);
  //     }
  //   };
  const onChange = async (e) => {
    setsearchItem(e.target.value);
  };
  // const viewModal = (i) => {
  //   setmodalItem(i);
  //   setisDisplay(id._id);
  // };
  const setUpdate = (i) => {
    viewUser(i);
  };

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Projects
      </h6>

      {/* <input
        value={searchItem}
        className="form-control mb-5 mt-5"
        onChange={onChange}
        onKeyDown={search}
        placeholder="Search ..."
      /> */}

      <Table hover borderless>
        <thead className="text-center">
          <tr>
            <th>Project No</th>
            <th>Name</th>
            <th>Location</th>
            <th>Client</th>
            <th>Contact No</th>
            <th>Suppliers</th>

            {/* <th>Email</th>
            <th>Address</th>
            <th>Projects</th> */}
          </tr>
        </thead>
        <tbody>
          {projects.map((i) => {
            // setsubTotal(subTotal + p.user.total)

            return (
              <>
                <tr style={{ textAlign: "center" }} key={i._id}>
                  <td className="text-center">{i.projectNo}</td>
                  <td className="text-center">{i.name}</td>
                  <td className="text-center">{i.location}</td>
                  <td className="text-center">{i.client}</td>
                  <td className="text-center">{i.clientCoNo}</td>
                  <td className="text-center">
                    {i.suppliers && i.suppliers.toString()}
                  </td>
                  {/* <td className="text-center">{i.email}</td>
                  <td className="text-center">{i.address}</td>
                  <td className="text-center">{i.projects}</td> */}
                  {/* <td>
                    <Link to="/admin/edit-user">
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

export default ViewProjects;
