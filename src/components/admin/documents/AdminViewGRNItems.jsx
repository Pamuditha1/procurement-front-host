import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import Pdf from "react-to-pdf";
import getOneGRN from "../../../services/getOneGRN";

const ref = React.createRef();

function AdminViewGRNItems() {
  const [displayButtons] = useState(true);
  const [selectedGRN, setselectedGRN] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchGRN() {
      const results = await getOneGRN(id);
      setselectedGRN(results);
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
      {!selectedGRN ? (
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
              GRN
            </h6>
            <div className="row">
              <div className="col-8">
                <div className="row ml-3">
                  <div className="col-3">MSR No : </div>
                  <div className="col-8">
                    <strong>{selectedGRN.msr.msrNo}</strong>
                  </div>
                </div>
                <div className="row ml-3">
                  <div className="col-3">PR No : </div>
                  <div className="col-8">
                    <strong>{selectedGRN.pr.prNo}</strong>
                  </div>
                </div>
                <div className="row ml-3">
                  <div className="col-3">PO No : </div>
                  <div className="col-8">
                    <strong>{selectedGRN.po.poNo}</strong>
                  </div>
                </div>
                <div className="row ml-3">
                  <div className="col-3">GRN No : </div>
                  <div className="col-8">
                    <strong>{selectedGRN.grnNo}</strong>
                  </div>
                </div>
                <div className="row ml-3 mt-3">
                  <div className="col-3">Project : </div>
                  <div className="col-8">
                    <strong>{selectedGRN.msr.project.name}</strong>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-5">MSR Date : </div>
                  <div className="col-7">
                    <strong>
                      {new Date(selectedGRN.msr.timeStamp).toLocaleDateString()}
                    </strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">PR Date : </div>
                  <div className="col-7">
                    <strong>
                      {new Date(selectedGRN.pr.timeStamp).toLocaleDateString()}
                    </strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">PO Date : </div>
                  <div className="col-7">
                    <strong>
                      {new Date(selectedGRN.po.timeStamp).toLocaleDateString()}
                    </strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">GRN Date : </div>
                  <div className="col-7">
                    <strong>
                      {new Date(selectedGRN.timeStamp).toLocaleDateString()}
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
                  <th>Ordered Quantity</th>
                  <th>Delivered Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedGRN.items.map((p, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <strong>{index + 1}</strong>
                      </td>
                      <td className="text-center">{p.description}</td>
                      <td className="text-center">{p.unit}</td>
                      <td className="text-center">{p.quantity}</td>
                      <td className="text-center">{p.deleveredQty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="row ml-3">
              <div className="col-3">Supplier : </div>
              <div className="col-5">
                <strong>{selectedGRN.po.supplier.username}</strong>
              </div>
            </div>
            <div className="row ml-3">
              <div className="col-3">Payment Method : </div>
              <div className="col-5">
                <strong>{selectedGRN.po.poDetails.payment}</strong>
              </div>
            </div>
            <div className="row ml-3 mt-3">
              <div className="col-3">Scheaduled Delivery : </div>
              <div className="col-5">
                <strong>
                  {selectedGRN.po.poDetails.deliveryDate &&
                    new Date(
                      selectedGRN.po.poDetails.deliveryDate
                    ).toLocaleDateString()}
                </strong>
              </div>
            </div>
            <div className="row ml-3">
              <div className="col-3">Delivered Date : </div>
              <div className="col-5">
                <strong
                  className={
                    selectedGRN.deliveredOnTime === "No" && "text-danger"
                  }
                >
                  {selectedGRN.deliveredOn
                    ? new Date(selectedGRN.deliveredOn).toLocaleDateString()
                    : "-"}
                </strong>
              </div>
            </div>
            <div className="row ml-3 mb-2 mt-3">
              <div className="col-3">Remarks : </div>
              <div className="col-5">
                <strong>{selectedGRN.po.poDetails.remarks}</strong>
              </div>
            </div>
          </div>
          <div
            className="mb-5 mt-5"
            style={{ display: !displayButtons ? "none" : "block" }}
          >
            <Link to="/admin/documents/grns">
              <Button color="warning" className="float-left mr-2 mb-5">
                Close
              </Button>
            </Link>
            <Pdf
              targetRef={ref}
              filename={`grn-${
                selectedGRN.grnNo
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

export default AdminViewGRNItems;
