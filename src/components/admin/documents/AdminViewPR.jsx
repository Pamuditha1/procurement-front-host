import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

import getPRs from "../../../services/getPRs";
import AdminviewPRItems from "./AdminviewPRItems";

function AdminViewPR({ viewItems }) {
  const [prs, setprs] = useState([]);

  const [isModalOpen, setisModalOpen] = useState(false);
  // const [modalItems, setmodalItems] = useState([]);

  useEffect(() => {
    async function fetchPRs() {
      const results = await getPRs();
      // let approved = results.filter((m) => {
      //   if (m.status == "Approved") return true;
      // });
      // console.log("Approved", approved);
      setprs(results);
    }

    fetchPRs();
  }, []);

  const viewModal = (p) => {
    viewItems(p);
    // console.log("clicked");
    // setmodalItems(items);
    // setisModalOpen(true);
  };

  return (
    <div>
      <div className="row">
        <Link to="/admin/documents">
          <button className="btn btn-outline-dark">Back</button>
        </Link>
      </div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        PR List
      </h6>
      <Table hover borderless>
        <thead className="text-center">
          <tr>
            <th>View</th>
            <th>PO Status</th>
            <th>PR No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {prs.map((p) => {
            // setsubTotal(subTotal + p.user.total)

            return (
              <tr style={{ textAlign: "center" }} key={p._id}>
                <td>
                  <Link to="/admin/documents/prs/items">
                    <button
                      onClick={() => viewModal(p)}
                      className="btn btn-primary"
                    >
                      View
                    </button>
                  </Link>
                </td>

                {p.poStatus == "Pending" ? (
                  <td className="text-warning">Pending...</td>
                ) : (
                  <td className="text-success">{p.poStatus}</td>
                )}
                <td>{p.prNo}</td>
                {/* <td
                  className="text-center"
                  className={
                    p.status == "Approved"
                      ? "text-success"
                      : p.status == "Rejected" && "text-danger"
                  }
                >
                  {p.status}
                </td> */}
                <td className="text-center">
                  {new Date(p.timeStamp).toLocaleDateString()}
                </td>
                <td className="text-center">
                  {new Date(p.timeStamp).toLocaleTimeString()}
                </td>
                <td className="text-center">{p.createdBy.username}</td>
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

export default AdminViewPR;
