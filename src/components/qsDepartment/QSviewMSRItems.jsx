import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link, Route } from "react-router-dom";
import CreatePR from "./CreatePR";
import OneMSRItem from "./OneMSRItem";

function QSViewMSRItems({ msrs, selectedId, status, selectedMSR }) {
  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };

  const [msrsP, setmsrsP] = useState([]);
  useEffect(() => {
    setmsrsP(msrs);
  }, []);

  const [pr, setpr] = useState([]);
  const adtoPR = (newPR) => {
    setpr([...pr, newPR]);
  };

  const removeFromPR = (no) => {
    let list = pr;
    let filtered = list.filter((p) => {
      if (p.no != no) return true;
    });
    setpr(filtered);
    console.log(no);
  };

  // const [quantity, setquantity] = useState("");
  const changeQty = (index) => (e) => {
    // let newArr = msrsP;
    // console.log("e.value", e.target.value);
    // console.log("index", index);
    // console.log("item: ", newArr[index].quantity);
    // newArr[index].quantity = e.target.value;
    // setmsrsP(newArr);
    // setmsrsP([...msrsP, (msrsP[index] = { quantity: e.target.value })]);
    // setmsrsP(tem);
  };

  return (
    <>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        MSR
      </h6>
      <div className="row">
        <div className="col-8">
          <div className="row ml-3">
            <div className="col-3">MSR No : </div>
            <div className="col-8">
              <strong>{selectedMSR.msrNo}</strong>
            </div>
          </div>
          <div className="row ml-3">
            <div className="col-3">Project : </div>
            <div className="col-8">
              <strong>{selectedMSR.project.name}</strong>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-5">MSR Date : </div>
            <div className="col-7">
              <strong>
                {new Date(selectedMSR.timeStamp).toLocaleDateString()}
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table hover borderless className="mt-5">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Description</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Remarks</th>
              {/* <th>Supplier</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {msrsP.map((p, index) => {
              // setsubTotal(subTotal + p.user.total)
              // function setQ() {
              //   setquantity(p.quantity);
              // }
              // setQ();
              return (
                <OneMSRItem p={p} adtoPR={adtoPR} index={index} />
                // <tr key={p.no}>
                //   <td className="text-center">
                //     <strong>{p.no}</strong>
                //   </td>
                //   <td className="text-center">{p.description}</td>
                //   <td className="text-center">{p.unit}</td>
                //   {/* <td className="text-center">{p.quantity}</td> */}
                //   <td className="text-center">
                //     <input onChange={changeQty(index)} value={p.quantity} />
                //   </td>
                //   <td className="text-center" style={remarksStyle}>
                //     {p.remarks}
                //   </td>
                //   <td className="text-center">{p.supplier}</td>
                // </tr>
              );
            })}
          </tbody>
        </Table>
        {/* <Link to="/qs-dep/view-msr">
          <Button color="warning" className="float-right mr-2">
            Close
          </Button>
        </Link> */}
        <canter>
          {/* <Link to="/qs-dep/view-msr/items/create-pr"> */}
          {/* <Button color="success" className="float-right mr-2">
            Create PR
          </Button> */}
          {/* </Link> */}
        </canter>
      </div>

      <div>
        {/* <Route path="/qs-dep/view-msr/items/create-pr" component={CreatePR} /> */}

        <CreatePR
          pr={pr}
          adtoPR={adtoPR}
          removeFromPR={removeFromPR}
          selectedMSR={selectedMSR}
        />
      </div>
    </>
  );
}

export default QSViewMSRItems;
