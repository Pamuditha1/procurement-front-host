import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import SEOneMSRItem from "./SEOneMSRItem";
import EditMSR from "./EditMSR";

import getOneMSR from "../../services/getOneMSR";

function SEViewMSRItems() {
  const { id } = useParams();
  const [oneMSR, setoneMSR] = useState(null);

  useEffect(() => {
    async function fetchMSR() {
      const results = await getOneMSR(id);
      setoneMSR(results);
    }

    fetchMSR();
  }, [id]);

  const [newMSR, setnewMSR] = useState([]);
  const addToEdit = (newItem) => {
    setnewMSR([...newMSR, newItem]);
  };

  const removeFromPR = (no) => {
    let list = newMSR;
    let filtered = list.filter((p) => {
      if (p.no !== no) return true;
      return false;
    });
    setnewMSR(filtered);
  };

  return (
    <>
      {!oneMSR ? (
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
                  <strong>
                    {new Date(oneMSR.timeStamp).toLocaleDateString()}
                  </strong>
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
              </tr>
            </thead>
            <tbody>
              {oneMSR?.items?.map((p, index) => {
                return (
                  <SEOneMSRItem
                    key={index}
                    p={p}
                    addToEdit={addToEdit}
                    index={index}
                  />
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
            oneMSR={oneMSR}
          />
        </div>
      )}
    </>
  );
}

export default SEViewMSRItems;
