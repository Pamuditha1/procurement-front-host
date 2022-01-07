import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Pdf from "react-to-pdf";
import Loader from "react-loader-spinner";

import getOneDU from "../../services/getOneDU";

const ref = React.createRef();

function PDViewDUItems() {
  const { id } = useParams();
  const [displayButtons] = useState(true);
  const [selectedDU, setselectedDU] = useState(null);

  useEffect(() => {
    async function fetchGRN() {
      const results = await getOneDU(id);
      setselectedDU(results);
    }
    fetchGRN();
  }, [id]);

  const grnStyle = {
    margin: "20px",
    padding: "20px",
    height: "auto",
    width: "793px",
  };

  return (
    <>
      {!selectedDU ? (
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
          <div ref={ref} style={grnStyle}>
            <h6
              className="pl-5 pt-1 pb-1 mb-5 mt-4"
              style={{ backgroundColor: "gray" }}
            >
              Daily Usage Report
            </h6>
            <div className="row">
              <div className="col-8">
                <div className="row ml-3 mt-3">
                  <div className="col-3">Project : </div>
                  <div className="col-8">
                    <strong>{selectedDU.project.name}</strong>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-5">Date : </div>
                  <div className="col-7">
                    <strong>
                      {new Date(selectedDU.timeStamp).toLocaleDateString()}
                    </strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">Time : </div>
                  <div className="col-7">
                    <strong>
                      {new Date(selectedDU.timeStamp).toLocaleTimeString()}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <Table hover borderless className="mt-5 mb-5">
              <thead className="text-center">
                <tr>
                  <th>No</th>
                  <th>Description</th>
                  <th>Unit</th>
                  <th>Quantity Used</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {selectedDU?.items?.map((p, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <strong>{index + 1}</strong>
                      </td>
                      <td className="text-center">{p.description}</td>
                      <td className="text-center">{p.unit}</td>
                      <td className="text-center">{p.quantity}</td>
                      <td className="text-center">{p.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div
            className="mb-5 mt-5"
            style={{ display: !displayButtons ? "none" : "block" }}
          >
            <Link to="/pur-dep/view-du">
              <Button color="warning" className="float-left mr-2 mb-5">
                Close
              </Button>
            </Link>
            <Pdf
              targetRef={ref}
              filename={`daily-usage-${
                selectedDU.reportNo
              }-${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}.pdf`}
            >
              {({ toPdf }) => (
                <Button
                  onClick={toPdf}
                  color="success"
                  className="float-right mr-2 mb-5"
                >
                  Download
                </Button>
              )}
            </Pdf>
          </div>
        </div>
      )}
    </>
  );
}

export default PDViewDUItems;
