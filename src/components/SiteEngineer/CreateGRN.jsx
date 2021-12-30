import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import SEOnePOItem from "./SEOnePOItem";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { DatePicker } from "react-rainbow-components";

import createGRN from "../../services/createGRN";
import getNo from "../../services/getNoService";

function CreateGRN({ poData }) {
  const [grnNo, setgrnNo] = useState("");
  const [grnsList, setgrnsList] = useState([]);
  const [letSubmit, setletSubmit] = useState(false);
  const [remarks, setremarks] = useState("");
  const [deliveredOn, setdeliveredOn] = useState("");
  const [deliveredOnTime, setdeliveredOnTime] = useState("");

  useEffect(() => {
    async function fetchNo() {
      let no = await getNo("grn");
      setgrnNo(no);
    }
    fetchNo();
  }, []);

  const adtoGRNlist = (item, index) => {
    let list = grnsList;
    list.push(item);
    setgrnsList(list);
    if (poData.items.length == grnsList.length) {
      setletSubmit(true);
    }
    console.log("GRN List", grnsList);
  };

  function calculateGRNTotal() {
    console.log(poData);
  }

  const submitGRN = async () => {
    console.log("MSR", poData.msr._id);
    console.log("PR", poData.pr._id);
    console.log("PO", poData._id);
    console.log("GRN Items", grnsList);

    calculateGRNTotal();
    const jwt = localStorage.getItem("token");
    const userID = jwtDecode(jwt)._id;

    let grnData = {
      grnNo: grnNo,
      grnsList: grnsList,
      remarks: remarks,
      deliveredOn: deliveredOn,
      deliveredOnTime: deliveredOnTime,
      user: userID,
      msr: poData.msr._id,
      pr: poData.pr._id,
      po: poData._id,
      supplier: poData.supplier._id,
      paymentType: poData.poDetails.payment,
      project: poData.msr.project.projectNo,
      supplierName: poData.supplier.username,
      projectID: poData.msr.project._id,
    };
    console.log(grnData);
    await createGRN(grnData);
  };

  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };
  return (
    <div className="mt-5">
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Create GRN
      </h6>

      <div className="form-group row ml-3 mt-3">
        <label htmlFor="grnNo" className="col-2">
          GRN No
        </label>
        <input
          onChange={(e) => setgrnNo(e.target.value)}
          value={grnNo}
          className="form-control col-4 ml-3"
          type="text"
          id="grnNo"
          name="grnNo"
        />
      </div>
      <Table hover borderless>
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th>Description</th>
            <th>Unit</th>
            <th>Ordered Quantity</th>
            <th>Delevered Quantity</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {poData.items.map((p, index) => {
            return (
              <SEOnePOItem p={p} index={index} adtoGRNlist={adtoGRNlist} />
            );
          })}
        </tbody>
      </Table>
      <div className="row">
        <div className="form-group col-6">
          <label htmlFor="daliveryDate" className="col-5">
            Delivered On
          </label>
          <DatePicker
            id="daliveryDate"
            formatStyle="medium"
            value={deliveredOn}
            onChange={(value) => setdeliveredOn(value.toISOString())}
          />
        </div>
        <div className="form-group col-6 mt-4">
          <label htmlFor="daliveryDate" className="col-5">
            Delivered on Time
          </label>
          <div className="form-check form-check-inline">
            <label>
              <input
                class="form-check-input"
                type="radio"
                value="Yes"
                checked={deliveredOnTime === "Yes"}
                onChange={() => setdeliveredOnTime("Yes")}
              />
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label>
              <input
                class="form-check-input"
                type="radio"
                value="No"
                checked={deliveredOnTime === "No"}
                onChange={() => setdeliveredOnTime("No")}
              />
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row ml-3 mb-3">
        <label className="col-2">Remarks</label>
        <textarea
          type="text"
          className="form-control col-8"
          onChange={(e) => setremarks(e.target.value)}
          value={remarks}
          name="note"
        />
      </div>
      <Link to="/site-engineer/view-po">
        <Button color="warning" className="float-left mr-2 mb-5">
          Cancel
        </Button>
      </Link>

      <Button
        color="success"
        onClick={submitGRN}
        disabled={!letSubmit}
        className="float-right mr-2 mb-5"
      >
        Submit GRN
      </Button>
    </div>
  );
}

export default CreateGRN;
