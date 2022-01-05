import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useParams } from "react-router-dom";
import CreatePR from "./CreatePR";
import Loader from "react-loader-spinner";

import OneMSRItem from "./OneMSRItem";

import getOneMSR from "../../services/getOneMSR";

function QSViewMSRItems() {
  const { id } = useParams();
  const [selectedMSR, setselectedMSR] = useState(null);

  useEffect(() => {
    async function fetchMSR() {
      const results = await getOneMSR(id);
      setselectedMSR(results);
    }
    fetchMSR();
  }, [id]);

  const [pr, setpr] = useState([]);
  const adtoPR = (newPR) => {
    setpr([...pr, newPR]);
  };

  const removeFromPR = (no) => {
    let list = pr;
    let filtered = list.filter((p) => {
      if (p.no !== no) return true;
      return false;
    });
    setpr(filtered);
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
        <>
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
          <div>
            <Table hover borderless className="mt-5">
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
                {selectedMSR.items.map((p, index) => {
                  return <OneMSRItem p={p} adtoPR={adtoPR} index={index} />;
                })}
              </tbody>
            </Table>
            <canter></canter>
          </div>

          <div>
            <CreatePR
              pr={pr}
              adtoPR={adtoPR}
              removeFromPR={removeFromPR}
              selectedMSR={selectedMSR}
            />
          </div>
        </>
      )}
    </>
  );
}

export default QSViewMSRItems;
