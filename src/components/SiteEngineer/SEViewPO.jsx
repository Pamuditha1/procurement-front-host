import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import getPOs from "../../services/getPOs";

function SEViewPO() {
  const [pos, setpos] = useState(null);

  useEffect(() => {
    async function fetchMSRs() {
      const results = await getPOs();
      let confirmed = results.filter((r) => {
        if (r.status === "Confirmed") return true;
        return false;
      });
      setpos(confirmed);
    }

    fetchMSRs();
  }, []);

  return (
    <>
      {!pos ? (
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
                return (
                  <tr style={{ textAlign: "center" }} key={p._id}>
                    <td>
                      <Link to={`/site-engineer/view-po/${p._id}`}>
                        <button className="btn btn-primary">View</button>
                      </Link>
                    </td>
                    <td className="text-center">{p.poNo && p.poNo}</td>
                    {p.grnStatus === "Pending" ? (
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
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default SEViewPO;
