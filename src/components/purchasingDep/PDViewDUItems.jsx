import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import Pdf from "react-to-pdf";

const ref = React.createRef();

function PDViewDUItems({ selectedDU }) {
  const [displayButtons, setdisplayButtons] = useState(true);

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

  const grnStyle = {
    margin: "20px",
    padding: "20px",
    height: "auto",
    width: "793px",
  };

  return (
    <div>
      <div ref={ref} style={grnStyle}>
        <h6
          className="pl-5 pt-1 pb-1 mb-5 mt-4"
          style={{ backgroundColor: "gray" }}
        >
          Daily Usage Report
        </h6>
        {/* <div className="row ml-3">
        <div className="col-2">PO No : </div>
        <div className="col-5">
          <strong>{selectedPO.msrNo}</strong>
        </div>
      </div> */}
        <div className="row">
          <div className="col-8">
            {/* <div className="row ml-3">
              <div className="col-3">MSR No : </div>
              <div className="col-8">
                <strong>{selectedDU.msr.msrNo}</strong>
              </div>
            </div>
            <div className="row ml-3">
              <div className="col-3">PR No : </div>
              <div className="col-8">
                <strong>{selectedDU.pr.prNo}</strong>
              </div>
            </div>
            <div className="row ml-3">
              <div className="col-3">PO No : </div>
              <div className="col-8">
                <strong>{selectedDU.po.poNo}</strong>
              </div>
            </div>
            <div className="row ml-3">
              <div className="col-3">GRN No : </div>
              <div className="col-8">
                <strong>{selectedDU.grnNo}</strong>
              </div>
            </div> */}
            <div className="row ml-3 mt-3">
              <div className="col-3">Project : </div>
              <div className="col-8">
                <strong>{selectedDU.project.name}</strong>
              </div>
            </div>
          </div>
          <div className="col-4">
            {/* <div className="row">
              <div className="col-5">MSR Date : </div>
              <div className="col-7">
                <strong>
                  {new Date(selectedDU.msr.timeStamp).toLocaleDateString()}
                </strong>
              </div>
            </div>
            <div className="row">
              <div className="col-5">PR Date : </div>
              <div className="col-7">
                <strong>
                  {new Date(selectedDU.pr.timeStamp).toLocaleDateString()}
                </strong>
              </div>
            </div>
            <div className="row">
              <div className="col-5">PO Date : </div>
              <div className="col-7">
                <strong>
                  {new Date(selectedDU.po.timeStamp).toLocaleDateString()}
                </strong>
              </div>
            </div> */}
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
              {/* <th>Rate</th>
            <th>Amount</th>
            <th>Remarks</th> */}
              {/* <th>Supplier</th> */}
            </tr>
          </thead>
          <tbody>
            {selectedDU.items.map((p, index) => {
              // setsubTotal(subTotal + p.user.total)

              return (
                <tr key={index}>
                  <td className="text-center">
                    <strong>{index + 1}</strong>
                  </td>
                  <td className="text-center">{p.description}</td>
                  <td className="text-center">{p.unit}</td>
                  <td className="text-center">{p.quantity}</td>
                  <td className="text-center">{p.remarks}</td>
                  {/* <td className="text-center">Rs. {p.rateAamount.rate}</td>
                <td className="text-right">
                  <strong>Rs. {p.rateAamount.amount}</strong>
                </td>
                <td className="text-center" style={remarksStyle}>
                  {p.item.remarks}
                </td> */}
                  {/* <td className="text-center">{p.item.supplier}</td> */}
                </tr>
              );
            })}
            {/* <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Transport Cost</td>
            <td className="text-right">
              Rs. {selectedGRN.poDetails.transportCost}
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <strong>Total Amount</strong>
            </td>
            <td className="text-right border-top border-dark">
              <strong>Rs. {selectedGRN.poDetails.totalAmount}</strong>
            </td>
            <td></td>
            <td></td>
          </tr> */}
          </tbody>
        </Table>
        {/* <div className="row ml-3">
          <div className="col-3">Supplier : </div>
          <div className="col-5">
            <strong>{selectedDU.po.supplier.username}</strong>
          </div>
        </div>
        <div className="row ml-3">
          <div className="col-3">Payment Method : </div>
          <div className="col-5">
            <strong>{selectedDU.po.poDetails.payment}</strong>
          </div>
        </div>
        <div className="row ml-3 mt-3">
          <div className="col-3">Scheaduled Delivery : </div>
          <div className="col-5">
            <strong>
              {selectedDU.po.poDetails.deliveryDate &&
                new Date(
                  selectedDU.po.poDetails.deliveryDate
                ).toLocaleDateString()}
            </strong>
          </div>
        </div>
        <div className="row ml-3">
          <div className="col-3">Delivered Date : </div>
          <div className="col-5">
            <strong
              className={selectedDU.deliveredOnTime == "No" && "text-danger"}
            >
              {selectedDU.deliveredOn &&
                new Date(selectedDU.deliveredOn).toLocaleDateString()}
            </strong>
          </div>
        </div> */}
        {/* <div className="row ml-3">
          <div className="col-3">Delivered On Time : </div>
          <div className="col-5">
            <strong
              className={selectedGRN.deliveredOnTime == "No" && "text-danger"}
            >
              {selectedGRN.deliveredOnTime}
            </strong>
          </div>
        </div> */}
        {/* <div className="row ml-3">
        <div className="col-3">Delivery Address : </div>
        <div className="col-5">
          <strong>{selectedGRN.po.poDetails.delivery}</strong>
        </div>
      </div>
      <div className="row ml-3">
        <div className="col-3">Contact Person at the Site : </div>
        <div className="col-5">
          <strong>
            {selectedGRN.po.se.username} - {selectedGRN.po.se.contactNo}
          </strong>
        </div>
      </div> */}
        {/* <div className="row ml-3 mb-2 mt-3">
          <div className="col-3">Remarks : </div>
          <div className="col-5">
            <strong>{selectedDU.po.poDetails.remarks}</strong>
          </div>
        </div> */}
      </div>
      <div
        className="mb-5 mt-5"
        style={{ display: !displayButtons ? "none" : "block" }}
      >
        {/* <Button
          color="primary"
          onClick={() => setcreatingGRN(true)}
          className="float-right mr-2 mb-5"
        >
          Create GRN
        </Button> */}

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

      {/* {creatingGRN && <CreateGRN poData={selectedGRN} className="mt-5" />} */}

      {/* <Button
        onClick={approve}
        color="success"
        className="float-right mr-2"
        disabled={selectedPO.status == "Approved"}
      >
        Confirm Order
      </Button>
      <Button
        onClick={reject}
        color="danger"
        className="float-right mr-2"
        disabled={!reason || selectedPO.status == "Rejected"}
      >
        Reject Order
      </Button>
      <div className="form-group col-7 ml-3">
        <textarea
          onChange={onchange}
          value={reason}
          columns="1"
          placeholder="Reasons for Rejecting ..."
          className="form-control col-12 ml-3"
          type="text"
          id="reason"
          name="reason"
        />
      </div> */}
    </div>
  );
}

export default PDViewDUItems;
