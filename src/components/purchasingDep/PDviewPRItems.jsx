import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link, Route } from "react-router-dom";
import OnePRItem from "./PDOnePRItem";
import CreatePO from "./CreatePO";

function PDViewPRItems({ prs, selectedId, status, selectedPR }) {
  const remarksStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
  };

  const [prsP, setprsP] = useState([]);
  useEffect(() => {
    setprsP(prs);
  }, []);

  const [po, setpo] = useState([]);
  const adtoPO = (newPO) => {
    setpo([...po, newPO]);
  };

  const removeFromPO = (no) => {
    let list = po;
    let filtered = list.filter((p) => {
      if (p.item.no != no) return true;
    });
    setpo(filtered);
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
      <div>
        <h6
          className="pl-5 pt-1 pb-1 mb-5 mt-4"
          style={{ backgroundColor: "gray" }}
        >
          PR
        </h6>

        <div className="row">
          <div className="col-8">
            <div className="row ml-3">
              <div className="col-3">MSR No : </div>
              <div className="col-8">
                <strong>{selectedPR.msr.msrNo}</strong>
              </div>
            </div>
            <div className="row ml-3">
              <div className="col-3">PR No : </div>
              <div className="col-8">
                <strong>{selectedPR.prNo}</strong>
              </div>
            </div>
            <div className="row ml-3">
              <div className="col-3">Project : </div>
              <div className="col-8">
                <strong>{selectedPR.msr.project.name}</strong>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-5">MSR Date : </div>
              <div className="col-7">
                <strong>
                  {new Date(selectedPR.msr.timeStamp).toLocaleDateString()}
                </strong>
              </div>
            </div>
            <div className="row">
              <div className="col-5">PR Date : </div>
              <div className="col-7">
                <strong>
                  {new Date(selectedPR.timeStamp).toLocaleDateString()}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <Table hover borderless className="mt-5">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Description</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Remarks</th>
              {/* <th>Supplier</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {prsP.map((p, index) => {
              // setsubTotal(subTotal + p.user.total)
              // function setQ() {
              //   setquantity(p.quantity);
              // }
              // setQ();
              return <OnePRItem p={p} adtoPO={adtoPO} index={index} />;
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

        <CreatePO po={po} removeFromPO={removeFromPO} selectedPR={selectedPR} />
      </div>
    </>
  );
}

export default PDViewPRItems;
