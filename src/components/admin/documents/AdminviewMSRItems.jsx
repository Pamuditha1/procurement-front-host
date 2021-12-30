import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";

function AdminViewMSRItems({
  msrs,
  approveItem,
  rejectItem,
  selectedId,
  status,
  selectedMSR,
}) {
  //   const toggle = () => setisModalOpen();

  const [reason, setreason] = useState("");
  const onchange = (e) => {
    setreason(e.target.value);
  };

  const displayStyle = {
    display: "",
  };

  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };

  const approve = () => {
    approveItem(selectedId);
  };
  const reject = () => {
    rejectItem(selectedId, reason);
  };

  return (
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
      {selectedMSR.status == "Rejected" && (
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
            {/* <th>Supplier</th> */}
          </tr>
        </thead>
        <tbody>
          {selectedMSR.items.map((p, index) => {
            // setsubTotal(subTotal + p.user.total)

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
                {/* <td className="text-center">{p.supplier}</td> */}
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
  );
}

export default AdminViewMSRItems;
