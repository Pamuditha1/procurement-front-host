import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

import getPOs from "../../services/getPOs";
import SEViewPOItems from "./SEViewPOItems";

function SEViewPO({ viewItems }) {
  const [pos, setpos] = useState([]);

  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalItems, setmodalItems] = useState([]);

  useEffect(() => {
    async function fetchMSRs() {
      const results = await getPOs();
      let confirmed = results.filter((r) => {
        if (r.status == "Confirmed") return true;
      });
      console.log(results);
      setpos(confirmed);
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
            <th>PO No</th>
            <th>GRN Status</th>
            <th>Date</th>
            <th>Time</th>
            <th>Created</th>
            <th>Order Confirmed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pos.map((p) => {
            // setsubTotal(subTotal + p.user.total)

            return (
              <tr style={{ textAlign: "center" }} key={p._id}>
                <td>
                  <Link to="/site-engineer/view-po/items">
                    <button
                      onClick={() => viewModal(p)}
                      className="btn btn-primary"
                    >
                      View
                    </button>
                  </Link>
                </td>
                <td className="text-center">{p.poNo && p.poNo}</td>
                {p.grnStatus == "Pending" ? (
                  <td className="text-warning">Pending...</td>
                ) : (
                  <td className="text-success">{p.grnStatus}</td>
                )}
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

export default SEViewPO;
