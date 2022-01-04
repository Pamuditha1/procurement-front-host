import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import SSSidebar from "./SSSidebar";
import ViewMSR from "./ViewMSR";
import ViewMSRItems from "./viewMSRItems";

import updateMSR from "../../services/updateMSR";

function SiteSupervisor({ history }) {
  useEffect(() => {
    document.title = "Site Supervisor";
  }, []);

  const jwt = localStorage.getItem("token");
  const userID = jwtDecode(jwt)._id;

  const approveItem = async (id) => {
    let msr = {
      decision: "Approved",
      id: id,
      user: userID,
    };
    const success = await updateMSR(msr);
    if (success) history.push("/site-supervisor/view-msr");
  };

  const rejectItem = async (id, reason) => {
    let msr = {
      decision: "Rejected",
      id: id,
      user: userID,
      reasons: reason,
    };
    const success = await updateMSR(msr);
    if (success) history.push("/site-supervisor/view-msr");
  };
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <SSSidebar />
        </div>
        <div className="container col-10">
          <Switch>
            <Route exact path="/site-supervisor/view-msr" component={ViewMSR} />
            <Route
              path="/site-supervisor/view-msr/:id"
              render={(props) => (
                <ViewMSRItems
                  approveItem={approveItem}
                  rejectItem={rejectItem}
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
