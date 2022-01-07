import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Loader from "react-loader-spinner";

import createMSR from "../../services/createMSRservice";
import updateRecreatedMSR from "../../services/recreateMSR";
import getNo from "../../services/getNoService";

function EditMSR({ newMSR, removeFromPR, oneMSR }) {
  const history = useHistory();
  const [msrNo, setmsrNo] = useState("");
  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };
  const jwt = localStorage.getItem("pms-token");
  const userID = jwtDecode(jwt)._id;
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function fetchNo() {
      let no = await getNo("msr");
      setmsrNo(no);
    }
    fetchNo();
  }, []);

  const submitNewMSR = async () => {
    setloading(true);
    let msrS = {
      msr: newMSR,
      userID: userID,
      msrData: {
        project: oneMSR.project,
        msrNo: msrNo,
      },
    };
    await createMSR(msrS);
    await updateRecreatedMSR({
      id: oneMSR._id,
      decision: "Recreated",
    });
    setloading(false);

    history.push("/site-engineer/view-msr");
  };
  const remove = (no) => {
    removeFromPR(no);
  };
  return (
    <div className="mt-5">
      <div className="row mt-5 mb-5" style={{ textAlign: "center" }}>
        <b>Create MSR</b>
      </div>
      <>
        {loading ? (
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
          <>
            <div className="form-group row ml-3">
              <label htmlFor="msrNo" className="col-2">
                MSR No
              </label>
              <input
                onChange={(e) => setmsrNo(e.target.value)}
                value={msrNo}
                className="form-control col-4 ml-3"
                type="text"
                id="msrNo"
                name="msrNo"
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
                {newMSR.map((p, index) => {
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
            <Link to="/site-engineer/view-msr">
              <Button color="warning" className="float-right mr-2">
                Close
              </Button>
            </Link>

            <Button
              onClick={submitNewMSR}
              color="success"
              className="float-right mr-2"
            >
              Create New MSR
            </Button>
          </>
        )}
      </>
    </div>
  );
}

export default EditMSR;
