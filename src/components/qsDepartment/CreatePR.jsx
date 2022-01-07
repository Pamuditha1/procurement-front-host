import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import createPR from "../../services/createPR";
import getNo from "../../services/getNoService";

function CreatePR({ pr, selectedMSR, removeFromPR }) {
  const [prNo, setprNo] = useState("");
  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };
  const jwt = localStorage.getItem("pms-token");
  const userID = jwtDecode(jwt)._id;

  useEffect(() => {
    async function fetchSupp() {
      let no = await getNo("pr");
      setprNo(no);
    }
    fetchSupp();
  }, []);
  const submitPR = () => {
    let prS = {
      pr,
      msr: selectedMSR,
      user: userID,
      prNo: prNo,
    };
    createPR(prS);
  };
  const remove = (no) => {
    removeFromPR(no);
  };
  return (
    <div className="mt-5">
      <div
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Create PR
      </div>
      <div className="form-group row ml-3">
        <label htmlFor="msrNo" className="col-2">
          PR No
        </label>
        <input
          onChange={(e) => setprNo(e.target.value)}
          value={prNo}
          className="form-control col-4 ml-3"
          type="text"
          id="prNo"
          name="prNo"
        />
      </div>
      <Table hover borderless>
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th>Description</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pr.map((p, index) => {
            return (
              <tr key={index}>
                <td className="text-center">
                  <strong>{index + 1}</strong>
                </td>
                <td className="text-center">{p.description}</td>
                <td className="text-center">{p.unit}</td>
                <td className="text-center">{p.quantity}</td>
                <td className="text-center" style={remarksStyle}>
                  {p.remarks}
                </td>
                <td>
                  <Button
                    onClick={() => remove(p.no)}
                    color="danger"
                    className="float-right"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Link to="/qs-dep/view-msr">
        <Button color="warning" className="float-right mr-2">
          Close
        </Button>
      </Link>

      <Button onClick={submitPR} color="success" className="float-right mr-2">
        Create PR
      </Button>
    </div>
  );
}

export default CreatePR;
