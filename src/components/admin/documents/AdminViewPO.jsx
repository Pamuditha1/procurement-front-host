import React, {
  useState,
  useEffect,
} from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import getPOs from "../../../services/getPOs";

function AdminViewPO() {
  const [pos, setpos] = useState([]);

  useEffect(() => {
    async function fetchMSRs() {
      const results = await getPOs();
      setpos(results);
    }

    fetchMSRs();
  }, []);

  return (
    <div data-testid="adminviewpo">
      <h2 data-testid="adminpo-heading">Admin PO</h2>
      {pos?.length === 0 ? (
        <div
          className="container text-center"
          style={{ width: "793px" }}
        >
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
            <Link
              to="/admin/documents"
              style={{ marginLeft: "80%" }}
            >
              <button className="btn btn-outline-light">
                Back
              </button>
            </Link>
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
              {pos?.map((p) => {
                return (
                  <tr
                    style={{
                      textAlign: "center",
                    }}
                    key={p._id}
                  >
                    <td>
                      <Link
                        to={`/admin/documents/po/${p._id}`}
                      >
                        <button className="btn btn-primary">
                          View
                        </button>
                      </Link>
                    </td>
                    <td
                      className={
                        p.status === "Confirmed"
                          ? "text-success text-center"
                          : p.status ===
                            "Rejected"
                          ? "text-danger text-center"
                          : p.status ===
                              "Recreated" &&
                            "text-primary text-center"
                      }
                    >
                      {p.status}
                    </td>
                    <td className="text-center">
                      {p.poNo}
                    </td>
                    <td className="text-center">
                      {new Date(
                        p.timeStamp
                      ).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {new Date(
                        p.timeStamp
                      ).toLocaleTimeString()}
                    </td>
                    <td className="text-center">
                      {p.createdBy.username}
                    </td>
                    <td className="text-center">
                      {p.approvedBy
                        ? p.approvedBy.username
                        : "Pending..."}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default AdminViewPO;
