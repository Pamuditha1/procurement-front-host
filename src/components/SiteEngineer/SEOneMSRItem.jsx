import React, { useState, useEffect } from "react";

function SEOneMSRItem({ p, addToEdit, index }) {
  const [item, setitem] = useState({});
  const [added, setadded] = useState(false);
  useEffect(() => {
    setitem(p);
  }, []);

  const onChange = (e) => {
    setitem({ ...item, [e.target.name]: e.target.value });
  };
  const addItemToNew = (item) => {
    addToEdit(item);
    setadded(true);
  };

  return (
    <tr key={index}>
      <td className="text-center">
        <strong>{index + 1}</strong>
      </td>
      <td className="text-center">
        <input
          onChange={onChange}
          value={item.description}
          name="description"
        />
      </td>
      <td className="text-center">
        <input
          onChange={onChange}
          value={item.unit}
          name="unit"
          style={{ maxWidth: "80px" }}
        />
      </td>
      {/* <td className="text-center">{p.quantity}</td> */}
      <td className="text-center">
        <input
          onChange={onChange}
          value={item.quantity}
          name="quantity"
          style={{ maxWidth: "50px" }}
        />
      </td>
      <td className="text-center">
        <input onChange={onChange} name="remarks" value={item.remarks} />
      </td>
      {/* <td className="text-center">
        <input onChange={onChange} name="supplier" value={item.supplier} />
      </td> */}
      <td className="text-center">
        <button
          onClick={() => addItemToNew(item)}
          disabled={added}
          className="btn btn-primary"
        >
          Add
        </button>
      </td>
    </tr>
  );
}

export default SEOneMSRItem;
