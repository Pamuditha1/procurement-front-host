import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import getPOs from "../../services/getPOs";
import ViewPOItems from "./ViewPOItems";

function SuppViewPO({ viewItems }) {
  const [pos, setpos] = useState([]);

  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalItems, setmodalItems] = useState([]);
  let userID = "";
  const jwt = localStorage.getItem("token");
  if (jwt) {
    userID = jwtDecode(jwt)._id;
  } else {
    userID = "";
  }

  useEffect(() => {
    async function fetchMSRs() {
      const results = await getPOs();
      let perResults = results.filter((r) => {
        if (r.supplier._id == userID) return true;
      });
      console.log("Supplier PO", results);
      setpos(perResults);
    }

    fetchMSRs();
  }, []);

  const viewModal = (p) => {
    viewItems(p);
    console.log("clicked");
    setmodalItems(p.items);
    // setisModalOpen(true);
  };

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        PO List
      </h6>

      <Table hover borderless>
        <thead className="text-center">
          <tr>
            <th>View</th>
            <th>Status</th>
            <th>PO No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Created</th>
            <th>Confirmed/ Rejected</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pos.map((p) => {
            // setsubTotal(subTotal + p.user.total)

            return (
              <tr style={{ textAlign: "center" }} key={p._id}>
                <td>
                  <Link to="/supplier/view-po/items">
                    <button
                      onClick={() => viewModal(p)}
                      className="btn btn-primary"
                    >
                      View
                    </button>
                  </Link>
                </td>
                <td
                  className="text-center"
                  className={
                    p.status == "Confirmed"
                      ? "text-success"
                      : p.status == "Rejected"
                      ? "text-danger"
                      : p.status == "Recreated" && "text-primary"
                  }
                >
                  {p.status}
                </td>
                <td className="text-center">{p.poNo}</td>
                <td className="text-center">
                  {new Date(p.timeStamp).toLocaleDateString()}
                </td>
                <td className="text-center">
                  {new Date(p.timeStamp).toLocaleTimeString()}
                </td>
                <td className="text-center">{p.createdBy.username}</td>
                <td className="text-center">
                  {p.approvedBy ? p.approvedBy.username : "Pending..."}
                </td>
              </tr>
            );
          })}
          {/* <tr>
            <ViewMSRItems
              isModalOpen={isModalOpen}
              setisModalOpen={setisModalOpen}
              msrs={modalItems}
            />
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
}

export default SuppViewPO;
