import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";

function QSOnePRItem({ p, adtoPO, index }) {
  const [item, setitem] = useState({});
  const [added, setadded] = useState(false);
  const [rateAamount, setrateAamount] = useState({
    rate: 0,
    amount: 0,
  });
  useEffect(() => {
    setitem(p);
  }, []);

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
    // setadded(true);
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
      {/* <td className="text-center">{p.quantity}</td> */}
      <td className="text-center">
        {/* <input onChange={qtyChange} value={item.quantity} /> */}
        {item.quantity}
      </td>
      {/* <td className="text-center">
        <input
          onChange={changeRate}
          value={rateAamount.rate}
          style={qtyStyle}
        />
      </td>
      <td className="text-center">{rateAamount.amount}</td> */}
      <td className="text-center">{item.remarks}</td>
      {/* <td className="text-center">{item.supplier}</td> */}
      <td className="text-center">

      </td>
    </tr>
  );
}

export default QSOnePRItem;
