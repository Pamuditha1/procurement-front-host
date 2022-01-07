import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import getPRs from "../../services/getPRs";

function PDViewPR() {
  const [prs, setprs] = useState([]);

  useEffect(() => {
    async function fetchPRs() {
      const results = await getPRs();
      setprs(results);
    }

    fetchPRs();
  }, []);

  return (
    <>
      {prs?.length === 0 ? (
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
              {prs?.map((p) => {
                return (
                  <tr style={{ textAlign: "center" }} key={p._id}>
                    <td>
                      <Link to={`/pur-dep/view-pr/${p._id}`}>
                        <button className="btn btn-primary">View</button>
                      </Link>
                    </td>

                    {p.poStatus === "Pending" ? (
                      <td className="text-warning">Pending...</td>
                    ) : (
                      <td className="text-success">{p.poStatus}</td>
                    )}
                    <td>{p.prNo}</td>
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
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default PDViewPR;
