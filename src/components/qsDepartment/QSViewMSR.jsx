import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

import getMSRs from "../../services/getMSRs";
import QSViewMSRItems from "./QSviewMSRItems";

function QSViewMSR({ viewItems }) {
  const [msrs, setmsrs] = useState([]);

  const [isModalOpen, setisModalOpen] = useState(false);
  // const [modalItems, setmodalItems] = useState([]);

  useEffect(() => {
    async function fetchMSRs() {
      const results = await getMSRs();
      let approved = results.filter((m) => {
        if (m.status == "Approved") return true;
      });
      console.log("Approved", approved);
      setmsrs(approved);
    }

    fetchMSRs();
  }, []);

  const viewModal = (items, id, status, p) => {
    viewItems(items, id, status, p);
    // console.log("clicked");
    // setmodalItems(items);
    // setisModalOpen(true);
  };

  const pendingStyle = {
    color: "yellow",
  };
  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        MSR List
      </h6>
      <Table hover borderless>
        <thead className="text-center">
          <tr>
            <th>View</th>
            <th>PR Status</th>
            <th>MSR No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Created</th>
            <th>Approved</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {msrs.map((p) => {
            // setsubTotal(subTotal + p.user.total)

            return (
              <tr style={{ textAlign: "center" }} key={p._id}>
                <td>
                  <Link to="/qs-dep/view-msr/items">
                    <button
                      onClick={() => viewModal(p.items, p._id, p.status, p)}
                      className="btn btn-primary"
                    >
                      View
                    </button>
                  </Link>
                </td>
                {p.prStatus == "Pending" ? (
                  <td className="text-warning">Pending...</td>
                ) : (
                  <td className="text-success">{p.prStatus}</td>
                )}
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
                <td className="text-center">{p.msrNo && p.msrNo}</td>
                <td className="text-center">
                  {new Date(p.timeStamp).toLocaleDateString()}
                </td>
                <td className="text-center">
                  {new Date(p.timeStamp).toLocaleTimeString()}
                </td>
                <td className="text-center">
                  {p.createdBy && p.createdBy.username}
                </td>
                <td className="text-center">{p.approvedBy.username}</td>
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

export default QSViewMSR;
