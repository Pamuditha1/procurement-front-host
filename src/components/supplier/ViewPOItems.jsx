import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import getOnePO from "../../services/getOnePO";

function ViewPOItems({ approveItem, rejectItem }) {
  const { id } = useParams();
  const [selectedPO, setselectedPO] = useState(null);
  const [reason, setreason] = useState("");

  const onchange = (e) => {
    setreason(e.target.value);
  };

  useEffect(() => {
    async function fetchPO() {
      const results = await getOnePO(id);
      setselectedPO(results);
    }
    fetchPO();
  }, [id]);

  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };

  const approve = () => {
    approveItem(selectedPO._id);
  };
  const reject = () => {
    rejectItem(selectedPO._id, reason);
  };

  return (
    <>
      {!selectedPO ? (
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
            PO
          </h6>
          <div className="row">
            <div className="col-8">
              <div className="row ml-3">
                <div className="col-3">MSR No : </div>
                <div className="col-8">
                  <strong>{selectedPO.msr.msrNo}</strong>
                </div>
              </div>
              <div className="row ml-3">
                <div className="col-3">PR No : </div>
                <div className="col-8">
                  <strong>{selectedPO.pr.prNo}</strong>
                </div>
              </div>
              <div className="row ml-3">
                <div className="col-3">PO No : </div>
                <div className="col-8">
                  <strong>{selectedPO.poNo}</strong>
                </div>
              </div>
              <div className="row ml-3">
                <div className="col-3">Project : </div>
                <div className="col-8">
                  <strong>{selectedPO.msr.project.name}</strong>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-5">MSR Date : </div>
                <div className="col-7">
                  <strong>
                    {new Date(selectedPO.msr.timeStamp).toLocaleDateString()}
                  </strong>
                </div>
              </div>
              <div className="row">
                <div className="col-5">PR Date : </div>
                <div className="col-7">
                  <strong>
                    {new Date(selectedPO.pr.timeStamp).toLocaleDateString()}
                  </strong>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-5">PO Date : </div>
                <div className="col-7">
                  <strong>
                    {new Date(selectedPO.timeStamp).toLocaleDateString()}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <Table hover borderless>
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {selectedPO.items.map((p, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">
                      <strong>{index + 1}</strong>
                    </td>
                    <td className="text-center">{p.item.description}</td>
                    <td className="text-center">{p.item.unit}</td>
                    <td className="text-center">{p.item.quantity}</td>
                    <td className="text-center">Rs. {p.rateAamount.rate}</td>
                    <td className="text-right">
                      <strong>Rs. {p.rateAamount.amount}</strong>
                    </td>
                    <td className="text-center" style={remarksStyle}>
                      {p.item.remarks}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Transport Cost</td>
                <td className="text-right">
                  Rs. {selectedPO.poDetails.transportCost}
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
                <td className="text-right  border-top border-dark">
                  <strong>Rs. {selectedPO.poDetails.totalAmount}</strong>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <div className="row ml-3">
            <div className="col-3">Supplier : </div>
            <div className="col-5">
              <strong>{selectedPO.supplier.username}</strong>
            </div>
          </div>
          <div className="row ml-3">
            <div className="col-3">Payment Method : </div>
            <div className="col-5">
              <strong>{selectedPO.poDetails.payment}</strong>
            </div>
          </div>
          <div className="row ml-3">
            <div className="col-3">Delivery Address : </div>
            <div className="col-5">
              <strong>{selectedPO.poDetails.delivery}</strong>
            </div>
          </div>
          <div className="row ml-3">
            <div className="col-3">Delivery Date : </div>
            <div className="col-5">
              <strong>
                {new Date(
                  selectedPO.poDetails.deliveryDate
                ).toLocaleDateString()}
              </strong>
            </div>
          </div>
          <div className="row ml-3">
            <div className="col-3">Contact Person at the Site : </div>
            <div className="col-5">
              <strong>
                {selectedPO.se.username} - {selectedPO.se.contactNo}
              </strong>
            </div>
          </div>
          <div className="row ml-3 mb-5">
            <div className="col-3">Remarks : </div>
            <div className="col-5">
              <strong>{selectedPO.poDetails.remarks}</strong>
            </div>
          </div>
          <Link to="/supplier/view-po">
            <Button color="warning" className="float-right mr-2">
              Close
            </Button>
          </Link>

          <Button
            onClick={approve}
            color="success"
            className="float-right mr-2"
            disabled={selectedPO.status === "Approved"}
          >
            Confirm Order
          </Button>
          <Button
            onClick={reject}
            color="danger"
            className="float-right mr-2"
            disabled={!reason || selectedPO.status === "Rejected"}
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
          </div>
        </div>
      )}
    </>
  );
}

export default ViewPOItems;
