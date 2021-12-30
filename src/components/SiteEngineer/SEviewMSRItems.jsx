import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import SEOneMSRItem from "./SEOneMSRItem";
import EditMSR from "./EditMSR";

function SEViewMSRItems({
  msrs,
  approveItem,
  rejectItem,
  selectedId,
  status,
  reasons,
  selectedMSR,
  oneMSR,
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

  const [msrsP, setmsrsP] = useState([]);
  useEffect(() => {
    setmsrsP(msrs);
  }, []);

  const [newMSR, setnewMSR] = useState([]);
  const addToEdit = (newItem) => {
    setnewMSR([...newMSR, newItem]);
  };

  const removeFromPR = (no) => {
    let list = newMSR;
    let filtered = list.filter((p) => {
      if (p.no != no) return true;
    });
    setnewMSR(filtered);
    console.log(no);
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
              <strong>{oneMSR.msrNo}</strong>
            </div>
          </div>
          <div className="row ml-3">
            <div className="col-3">Project : </div>
            <div className="col-8">
              <strong>{oneMSR.project.name}</strong>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-5">MSR Date : </div>
            <div className="col-7">
              <strong>{new Date(oneMSR.timeStamp).toLocaleDateString()}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="row ml-3 mt-5">
        <p>
          <span style={{ color: "red" }}>Reasons for Rejecting : </span>{" "}
          {oneMSR.reasons}
        </p>
      </div>

      <Table hover borderless className="mt-5">
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
          {msrs.map((p, index) => {
            // setsubTotal(subTotal + p.user.total)

            return (
              <SEOneMSRItem p={p} addToEdit={addToEdit} index={index} />
              // <tr key={p.no}>
              //   <td className="text-center">
              //     <strong>{p.no}</strong>
              //   </td>
              //   <td className="text-center">{p.description}</td>
              //   <td className="text-center">{p.unit}</td>
              //   <td className="text-center">{p.quantity}</td>
              //   <td className="text-center" style={remarksStyle}>
              //     {p.remarks}
              //   </td>
              //   <td className="text-center">{p.supplier}</td>
              // </tr>
            );
          })}
        </tbody>
      </Table>
      <Link to="/site-engineer/view-msr">
        <Button color="warning" className="float-right mr-2">
          Close
        </Button>
      </Link>

      <EditMSR
        newMSR={newMSR}
        addToEdit={addToEdit}
        removeFromPR={removeFromPR}
        selectedMSR={selectedMSR}
        oneMSR={oneMSR}
      />
    </div>
  );
}

export default SEViewMSRItems;
