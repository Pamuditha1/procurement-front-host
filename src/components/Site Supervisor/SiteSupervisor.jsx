import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import SSSidebar from "./SSSidebar";
import ViewMSR from "./ViewMSR";
import ViewMSRItems from "./viewMSRItems";

import updateMSR from "../../services/updateMSR";

function SiteSupervisor() {
  useEffect(() => {
    document.title = "Site Supervisor";
  }, []);

  const [modalItems, setmodalItems] = useState([]);
  const [selectedId, setselectedId] = useState("");
  const [status, setstatus] = useState("");
  const [selectedMSR, setselectedMSR] = useState({});

  const jwt = localStorage.getItem("token");
  const userID = jwtDecode(jwt)._id;

  const viewItems = (items, id, status, p) => {
    // setisModalOpen(true);
    setmodalItems(items);
    setselectedId(id);
    setstatus(status);
    setselectedMSR(p);
  };
  const approveItem = async (id) => {
    // console.log("Approved", id);

    let msr = {
      decision: "Approved",
      id: id,
      user: userID,
    };
    await updateMSR(msr);
  };
  const rejectItem = async (id, reason) => {
    // console.log("Rejected", id);
    // console.log("Approved", id);
    let msr = {
      decision: "Rejected",
      id: id,
      user: userID,
      reasons: reason,
    };
    // console.log(msr);
    await updateMSR(msr);
  };
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <SSSidebar />
        </div>
        <div className="container col-10">
          <Switch>
            {/* <h1>Hello</h1> */}
            {/* <Route path="/site-supervisor/view-msr" component={ViewMSR}/> */}
            <Route
              exact
              path="/site-supervisor/view-msr"
              render={(props) => <ViewMSR viewItems={viewItems} {...props} />}
            />
            <Route
              path="/site-supervisor/view-msr/items"
              render={(props) => (
                <ViewMSRItems
                  viewItems={viewItems}
                  approveItem={approveItem}
                  rejectItem={rejectItem}
                  selectedId={selectedId}
                  status={status}
                  selectedMSR={selectedMSR}
                  msrs={modalItems}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default SiteSupervisor;
