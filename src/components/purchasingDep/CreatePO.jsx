import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { DatePicker } from "react-rainbow-components";

import createPO from "../../services/createPO";
import getSuppliers from "../../services/getSuppliers";
import getNo from "../../services/getNoService";
import getSEs from "../../services/getSiteEngineers";

function CreatePO({ po, selectedPR, removeFromPO }) {
  const [poNo, setpoNo] = useState("");

  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };
  const jwt = localStorage.getItem("token");
  const userID = jwtDecode(jwt)._id;
  const [addiToPO, setaddiToPO] = useState({
    transportCost: 0,
    totalAmount: 0,
    payment: "",
    delivery: "",
    deliveryDate: "",
    supplier: "",
    se: "",
    remarks: "",
  });
  const [suppliers, setsuppliers] = useState([]);
  const [siteEngineers, setsiteEngineers] = useState([]);
  const paymentMethods = [
    "Choose Method",
    "Credit",
    "Cash",
    "Online Transfer",
    "Digital Wallet",
  ];

  useEffect(() => {
    let t = 0;
    po.forEach((p) => {
      t = t + p.rateAamount.amount;
    });
    t = t + parseInt(addiToPO.transportCost);
    setaddiToPO({ ...addiToPO, totalAmount: t });

    async function fetchData() {
      let suppl = [{ name: "Choose Supplier", id: "01" }];
      let result = await getSuppliers();
      result.forEach((r) => {
        suppl.push({ name: r.username, id: r._id });
      });
      setsuppliers(suppl);

      let sEngin = [{ name: "Choose Site Engineer", id: "01" }];
      let result2 = await getSEs();
      result2.forEach((r) => {
        sEngin.push({ name: r.username, id: r._id, contact: r.contactNo });
      });
      setsiteEngineers(sEngin);

      let no = await getNo("po");
      setpoNo(no);
    }
    fetchData();
  }, [po, addiToPO.transportCost]);
  const submitPO = async () => {
    let poS = {
      po,
      poDetails: addiToPO,
      pr: selectedPR._id,
      msr: selectedPR.msr._id,
      user: userID,
      poNo: poNo,
      supplier: addiToPO.supplier,
      se: addiToPO.se,
    };
    await createPO(poS);
  };
  const remove = (no) => {
    removeFromPO(no);
  };

  const onChangeTrans = (e) => {
    setaddiToPO({
      ...addiToPO,
      transportCost: e.target.value,
    });
  };
  const onChangeAdd = (e) => {
    setaddiToPO({
      ...addiToPO,
      [e.target.name]: e.target.value,
    });
  };

  const onchangeSelectSupp = (e) => {
    setaddiToPO({
      ...addiToPO,
      supplier: e.target.value,
    });
  };
  const onchangePaymentMethod = (e) => {
    setaddiToPO({
      ...addiToPO,
      payment: e.target.value,
    });
  };
  const onchangeSE = (e) => {
    setaddiToPO({
      ...addiToPO,
      se: e.target.value,
    });
  };

  const qtyStyle = {
    maxWidth: "100px",
    textAlign: "center",
  };
  return (
    <div className="mt-5">
      <div
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Create PO
      </div>
      <div className="form-group row ml-3">
        <label htmlFor="msrNo" className="col-2">
          PO No
        </label>
        <input
          onChange={(e) => setpoNo(e.target.value)}
          value={poNo}
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
            <th>Rate</th>
            <th>Amount</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {po.map((p, index) => {
            console.log(p);
            return (
              <tr key={index}>
                <td className="text-center">
                  <strong>{index + 1}</strong>
                </td>
                <td className="text-center">{p.item.description}</td>
                <td className="text-center">{p.item.unit}</td>
                <td className="text-center">{p.item.quantity}</td>
                <td className="text-center">Rs. {p.rateAamount.rate}</td>
                <td className="text-center">
                  <strong>Rs. {p.rateAamount.amount}</strong>
                </td>
                <td className="text-center" style={remarksStyle}>
                  {p.item.remarks}
                </td>
                <td>
                  <Button
                    onClick={() => remove(p.item.no)}
                    color="danger"
                    className="float-right"
                  >
                    Remove
                  </Button>
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
            <td>
              <input
                type="number"
                className="form-control float-right text-center"
                onChange={onChangeTrans}
                value={addiToPO.transportCost}
                style={qtyStyle}
              />
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
            <td className="text-center border-top border-dark">
              <strong>Rs. {addiToPO.totalAmount}</strong>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <div className="row mt-5">
        <div className="form-group col-6">
          <label htmlFor="supplier" className="col-5">
            Supplier
          </label>
          <select
            onChange={onchangeSelectSupp}
            value={addiToPO.supplier}
            id="supplier"
            name="supplier"
            className="form-control col-11 ml-3"
            required
          >
            {suppliers.map((option) => {
              return (
                <option
                  key={option.id}
                  value={option.id}
                  style={{ textAlign: "center" }}
                >
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-6">
          <label htmlFor="payment" className="col-5">
            Method of Payment
          </label>
          <select
            onChange={onchangePaymentMethod}
            value={addiToPO.payment}
            id="payment"
            name="payment"
            className="form-control col-10"
            required
          >
            {paymentMethods.map((option) => {
              return (
                <option
                  key={option}
                  value={option}
                  style={{ textAlign: "center" }}
                >
                  {option}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-12">
          <label htmlFor="delivery" className="col-5">
            Delivery Address
          </label>
          <input
            onChange={onChangeAdd}
            value={addiToPO.delivery}
            className="form-control col-11 ml-3"
            type="text"
            id="delivery"
            name="delivery"
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="daliveryDate" className="col-5">
            Delivery Date
          </label>
          <DatePicker
            id="daliveryDate"
            formatStyle="medium"
            value={addiToPO.deliveryDate}
            onChange={(value) =>
              setaddiToPO({ ...addiToPO, deliveryDate: value.toISOString() })
            }
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="se" className="col-12">
            Contact Person at the Site
          </label>
          <select
            onChange={onchangeSE}
            value={addiToPO.se}
            id="se"
            name="se"
            className="form-control col-10 ml-3"
            required
          >
            {siteEngineers.map((option) => {
              return (
                <option
                  key={option.id}
                  value={option.id}
                  style={{ textAlign: "center" }}
                >
                  {option.name} - {option.contact}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-12">
          <label htmlFor="remarks" className="col-5">
            Remarks
          </label>
          <textarea
            onChange={onChangeAdd}
            value={addiToPO.remarks}
            className="form-control col-11 ml-3"
            type="textarea"
            id="remarks"
            name="remarks"
          />
        </div>
      </div>
      <Link to="/pur-dep/view-pr">
        <Button color="warning" className="float-right mr-2">
          Close
        </Button>
      </Link>

      <Button onClick={submitPO} color="success" className="float-right mr-2">
        Create PO
      </Button>
    </div>
  );
}

export default CreatePO;
