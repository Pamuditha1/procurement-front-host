import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import getOneMSR from "../../../services/getOneMSR";

function AdminViewMSRItems() {
  const [selectedMSR, setselectedMSR] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchMSR() {
      const results = await getOneMSR(id);
      setselectedMSR(results);
    }

    fetchMSR();
  }, [id]);

  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };

  return (
    <>
      {!selectedMSR ? (
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
            MSR
          </h6>
          <div className="row">
            <div className="col-8">
              <div className="row ml-3">
                <div className="col-3">MSR No : </div>
                <div className="col-8">
                  <strong>{selectedMSR.msrNo}</strong>
                </div>
              </div>
              <div className="row ml-3">
                <div className="col-3">Project : </div>
                <div className="col-8">
                  <strong>{selectedMSR.project.name}</strong>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-5">MSR Date : </div>
                <div className="col-7">
                  <strong>
                    {new Date(selectedMSR.timeStamp).toLocaleDateString()}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          {selectedMSR.status === "Rejected" && (
            <div className="row ml-3 mt-5">
              <p>
                <span style={{ color: "red" }}>Reasons for Rejecting : </span>{" "}
                {selectedMSR.reasons}
              </p>
            </div>
          )}

          <Table hover borderless className="mt-3">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {selectedMSR.items.map((p, index) => {
                return (
                  <tr key={p.no}>
                    <td className="text-center">
                      <strong>{index + 1}</strong>
                    </td>
                    <td className="text-center">{p.description}</td>
                    <td className="text-center">{p.unit}</td>
                    <td className="text-center">{p.quantity}</td>
                    <td className="text-center" style={remarksStyle}>
                      {p.remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Link to="/admin/documents/msrs">
            <Button color="warning" className="float-right mr-2">
              Close
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default AdminViewMSRItems;
