import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import SupplierSidebar from "./SupplierSidebar";
import SuppViewPO from "./SuppViewPO";
import ViewPOItems from "./ViewPOItems";

import updatePO from "../../services/updatePO";

function Supplier() {
  useEffect(() => {
    document.title = "Supplier";
  }, []);

  const [selectedPO, setselectedPO] = useState({});

  const jwt = localStorage.getItem("pms-token");
  const userID = jwtDecode(jwt)._id;

  const viewItems = (p) => {
    setselectedPO(p);
  };
  const approveItem = async (id) => {
    let po = {
      decision: "Confirmed",
      id: id,
      user: userID,
    };
    await updatePO(po);
  };
  const rejectItem = async (id, reason) => {
    let po = {
      decision: "Rejected",
      id: id,
      user: userID,
      reasons: reason,
    };
    await updatePO(po);
  };
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <SupplierSidebar />
        </div>
        <div className="container col-10">
          <Switch>
            <Route
              exact
              path="/supplier/view-po"
              render={(props) => (
                <SuppViewPO viewItems={viewItems} {...props} />
              )}
            />
            <Route
              path="/supplier/view-po/:id"
              render={(props) => (
                <ViewPOItems
                  viewItems={viewItems}
                  approveItem={approveItem}
                  rejectItem={rejectItem}
                  selectedPO={selectedPO}
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

export default Supplier;
