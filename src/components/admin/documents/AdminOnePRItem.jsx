import React, { useState } from "react";

function AdminOnePRItem({ p, index }) {
  const [item] = useState(p);

  return (
    <tr key={index}>
      <td className="text-center">
        <strong>{index + 1}</strong>
      </td>
      <td className="text-center">{item.description}</td>
      <td className="text-center">{item.unit}</td>
      <td className="text-center">{item.quantity}</td>
      <td className="text-center">{item.remarks}</td>
    </tr>
  );
}

export default AdminOnePRItem;
