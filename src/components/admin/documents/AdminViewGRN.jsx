import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import getGRNs from "../../../services/getGRNs";

function AdminViewGRN() {
  const [grns, setgrns] = useState([]);

  useEffect(() => {
    async function fetchMSRs() {
      const results = await getGRNs();
      setgrns(results);
    }

    fetchMSRs();
  }, []);

  return (
    <>
      {grns?.length === 0 ? (
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
            GRN List{" "}
            <Link to="/admin/documents" style={{ marginLeft: "80%" }}>
              <button className="btn btn-outline-light">Back</button>
            </Link>
          </h6>
          <Table hover borderless>
            <thead className="text-center">
              <tr>
                <th>View</th>
                <th>GRN No</th>
                <th>Date</th>
                <th>Time</th>
                <th>Delivered On</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {grns?.map((p) => {
                return (
                  <tr style={{ textAlign: "center" }} key={p._id}>
                    <td>
                      <Link to={`/admin/documents/grn/${p._id}`}>
                        <button className="btn btn-primary">View</button>
                      </Link>
                    </td>
                    <td className="text-center">{p.grnNo}</td>

                    <td className="text-center">
                      {new Date(p.timeStamp).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {new Date(p.timeStamp).toLocaleTimeString()}
                    </td>
                    <td className="text-center">
                      {p.deliveredOn
                        ? new Date(p.deliveredOn).toLocaleDateString()
                        : "-"}
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

export default AdminViewGRN;
