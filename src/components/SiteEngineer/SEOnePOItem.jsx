import React, { useState, useEffect } from "react";

function SEOnePOItem({ p, index, changeOneItem, adtoGRNlist }) {
  const [item, setitem] = useState({});
  const [addedList, setaddedList] = useState(["a"]);
  const [onClicled, setonClicled] = useState(false);
  // const [added, setadded] = useState(false);

  useEffect(() => {
    setitem({
      // id:
      description: p.item.description,
      unit: p.item.unit,
      quantity: p.item.quantity,
      deleveredQty: "",
      note: "",
      rate: p.rateAamount.rate,
    });
  }, []);

  const onChange = (e) => {
    setitem({ ...item, [e.target.name]: e.target.value });
  };
  const addItemToGRN = () => {
    adtoGRNlist(item);
    setonClicled(true);
    // changeOneItem(item);
    // let added = addedList;
    // added.push(item.description);
    // setaddedList(added);
    // console.log(added);
  };
  const qtyStyle = {
    maxWidth: "50px",
    textAlign: "center",
  };
  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
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
          onChange={onChange}
          value={item.deleveredQty}
          style={qtyStyle}
          name="deleveredQty"
          min="0"
        />
      </td>
      <td className="text-center">
        <input
          type="text"
          style={remarksStyle}
          className="form-control"
          onChange={onChange}
          value={item.note}
          name="note"
        />
      </td>
      <td className="text-center">
        <button
          onClick={() => addItemToGRN(item)}
          disabled={onClicled}
          className="btn btn-outline-dark"
        >
          {onClicled ? "Added" : "Add to GRN"}
        </button>
      </td>
    </tr>
  );
}

export default SEOnePOItem;
