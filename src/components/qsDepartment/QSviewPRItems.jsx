import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import QSOnePRItem from "./QSOnePRItem";
import getOnePR from "../../services/getOnePR";

function QSViewPRItems() {
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
              <div className="row ml-3 mt-3">
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
                <th>Remarks</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectedPR?.items?.map((p, index) => {
                return (
                  <QSOnePRItem
                    key={index}
                    p={p}
                    adtoPO={adtoPO}
                    index={index}
                  />
                );
              })}
            </tbody>
          </Table>
          <Link to="/qs-dep/view-pr">
            <Button color="warning" className="float-right mr-2">
              Close
            </Button>
          </Link>
          <canter></canter>
        </div>
      )}
    </>
  );
}

export default QSViewPRItems;
