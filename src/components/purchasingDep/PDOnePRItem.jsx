import React, { useState } from "react";

function OnePRItem({ p, adtoPO, index }) {
  const [item] = useState(p);
  const [added] = useState(false);
  const [rateAamount, setrateAamount] = useState({
    rate: 0,
    amount: 0,
  });

  const changeRate = (e) => {
    setrateAamount({
      rate: e.target.value,
      amount: parseInt(item.quantity) * parseInt(e.target.value),
    });
  };
  const addItemToPO = (item, rateAamount) => {
    adtoPO({
      item,
      rateAamount,
    });
  };
  const qtyStyle = {
    maxWidth: "80px",
    textAlign: "center",
  };
  return (
    <tr key={index}>
      <td className="text-center">
        <strong>{index + 1}</strong>
      </td>
      <td className="text-center">{item.description}</td>
      <td className="text-center">{item.unit}</td>
      <td className="text-center">{item.quantity}</td>
      <td className="text-center">
        <input
          type="number"
          className="float-right form-control text-center"
          onChange={changeRate}
          value={rateAamount.rate}
          style={qtyStyle}
        />
      </td>
      <td className="text-center">Rs. {rateAamount.amount}</td>
      <td className="text-center">{item.remarks}</td>
      <td className="text-center">
        <button
          onClick={() => addItemToPO(item, rateAamount)}
          disabled={added}
          className="btn btn-primary"
        >
          Add to PO
        </button>
      </td>
    </tr>
  );
}

export default OnePRItem;
