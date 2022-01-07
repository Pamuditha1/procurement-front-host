import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import getMSRs from "../../services/getMSRs";

function SEViewMSR() {
  const [msrs, setmsrs] = useState([]);

  useEffect(() => {
    async function fetchMSRs() {
      const results = await getMSRs();
      setmsrs(results);
    }
    fetchMSRs();
  }, []);

  return (
    <>
      {msrs?.length === 0 ? (
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
            MSR List
          </h6>
          <Table hover borderless>
            <thead className="text-center">
              <tr>
                <th>View</th>
                <th>MSR No</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Created</th>
                <th>Approved/ Rejected</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {msrs?.map((p) => {
                return (
                  <tr style={{ textAlign: "center" }} key={p._id}>
                    <td>
                      <Link to={`/site-engineer/view-msr/${p._id}`}>
                        <button className="btn btn-primary">View</button>
                      </Link>
                    </td>
                    <td className="text-center">{p.msrNo && p.msrNo}</td>
                    <td
                      className={
                        p.status === "Approved"
                          ? "text-success text-center"
                          : p.status === "Rejected"
                          ? "text-danger text-center"
                          : p.status === "Recreated" &&
                            "text-primary text-center"
                      }
                    >
                      {p.status}
                    </td>
                    <td className="text-center">
                      {new Date(p.timeStamp).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {new Date(p.timeStamp).toLocaleTimeString()}
                    </td>
                    <td className="text-center">
                      {p.createdBy && p.createdBy.username}
                    </td>
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

export default SEViewMSR;
