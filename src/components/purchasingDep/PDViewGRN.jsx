import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

import getGRNs from "../../services/getGRNs";

function PDViewGRN({ viewItems }) {
  const [grns, setgrns] = useState([]);

  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalItems, setmodalItems] = useState([]);

  useEffect(() => {
    async function fetchMSRs() {
      const results = await getGRNs();
      //   let confirmed = results.filter((r) => {
      //     if (r.status == "Confirmed") return true;
      //   });
      //   console.log(results);
      setgrns(results);
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
        GRN List
      </h6>
      <Table hover borderless>
        <thead className="text-center">
          <tr>
            <th>View</th>
            <th>GRN No</th>
            <th>Delivered On</th>
            <th>Date</th>
            <th>Time</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {grns.map((p) => {
            // setsubTotal(subTotal + p.user.total)

            return (
              <tr style={{ textAlign: "center" }} key={p._id}>
                <td>
                  <Link to="/pur-dep/view-grn/items">
                    <button
                      onClick={() => viewModal(p)}
                      className="btn btn-primary"
                    >
                      View
                    </button>
                  </Link>
                </td>
                <td className="text-center">{p.grnNo}</td>
                <td className="text-center">
                  {new Date(p.deliveredOn).toLocaleDateString()}
                </td>
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

export default PDViewGRN;
