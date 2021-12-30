import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

import getPRs from "../../services/getPRs";
import PDviewPRItems from "./QSviewPRItems";

function QSViewPR({ viewItems }) {
  const [prs, setprs] = useState([]);

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

  const viewModal = (items) => {
    viewItems(items);
  };

  return (
    <div>
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
            return (
              <tr style={{ textAlign: "center" }} key={p._id}>
                <td>
                  <Link to="/qs-dep/view-pr/items">
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

export default QSViewPR;
