import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import OnePRItem from "./PDOnePRItem";
import CreatePO from "./CreatePO";

import getOnePR from "../../services/getOnePR";

function PDViewPRItems() {
  const { id } = useParams();
  const [selectedPR, setselectedPR] = useState(null);

  useEffect(() => {
    async function fetchPR() {
      const results = await getOnePR(id);
      setselectedPR(results);
    }
    fetchPR();
  }, [id]);

  const [po, setpo] = useState([]);
  const adtoPO = (newPO) => {
    setpo([...po, newPO]);
  };

  const removeFromPO = (no) => {
    let list = po;
    let filtered = list.filter((p) => {
      if (p.item.no !== no) return true;
      return false;
    });
    setpo(filtered);
  };

  return (
    <>
      {!selectedPR ? (
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
          <div>
            <h6
              className="pl-5 pt-1 pb-1 mb-5 mt-4"
              style={{ backgroundColor: "gray" }}
            >
              PR
            </h6>

            <div className="row">
              <div className="col-8">
                <div className="row ml-3">
                  <div className="col-3">MSR No : </div>
                  <div className="col-8">
                    <strong>{selectedPR.msr.msrNo}</strong>
                  </div>
                </div>
                <div className="row ml-3">
                  <div className="col-3">PR No : </div>
                  <div className="col-8">
                    <strong>{selectedPR.prNo}</strong>
                  </div>
                </div>
                <div className="row ml-3">
                  <div className="col-3">Project : </div>
                  <div className="col-8">
                    <strong>{selectedPR.msr.project.name}</strong>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-5">MSR Date : </div>
                  <div className="col-7">
                    <strong>
                      {new Date(selectedPR.msr.timeStamp).toLocaleDateString()}
                    </strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">PR Date : </div>
                  <div className="col-7">
                    <strong>
                      {new Date(selectedPR.timeStamp).toLocaleDateString()}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <Table hover borderless className="mt-5">
              <thead className="text-center">
                <tr>
                  <th>No</th>
                  <th>Description</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Remarks</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedPR.items.map((p, index) => {
                  return <OnePRItem p={p} adtoPO={adtoPO} index={index} />;
                })}
              </tbody>
            </Table>
            <canter></canter>
          </div>

          <div>
            <CreatePO
              po={po}
              removeFromPO={removeFromPO}
              selectedPR={selectedPR}
            />
          </div>
        </>
      )}
    </>
  );
}

export default PDViewPRItems;
