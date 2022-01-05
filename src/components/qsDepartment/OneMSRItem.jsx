import React, { useState } from "react";

function OneMSRItem({ p, adtoPR, index }) {
  const [item, setitem] = useState(p);
  const [added, setadded] = useState(false);

  const qtyChange = (e) => {
    setitem({ ...item, quantity: e.target.value });
  };
  const addItemToPR = (item) => {
    adtoPR(item);
    setadded(true);
  };
  const qtyStyle = {
    maxWidth: "50px",
    textAlign: "center",
  };
  return (
    <tr key={index}>
      <td className="text-center">
        <strong>{index + 1}</strong>
      </td>
      <td className="text-center">{item.description}</td>
      <td className="text-center">{item.unit}</td>
      <td className="text-center">
        <input
          type="number"
          onChange={qtyChange}
          value={item.quantity}
          style={qtyStyle}
        />
      </td>
      <td className="text-center">{item.remarks}</td>
      <td className="text-center">
        <button
          onClick={() => addItemToPR(item)}
          disabled={added}
          className="btn btn-primary"
        >
          Add to PR
        </button>
      </td>
    </tr>
  );
}

export default OneMSRItem;
