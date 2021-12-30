import React, { useState, useEffect } from "react";
import ControlHeader from "../ControlHeader";
import { Redirect, Route, Switch } from "react-router-dom";
import SESidebar from "./SiteEngineerSidebar";
import CreateMSR from "./CreateMSR";
import SEViewMSR from "./SEViewMSR";
import jwtDecode from "jwt-decode";
import SEViewMSRItems from "./SEviewMSRItems";
import SEViewPO from "./SEViewPO";
import SEViewPOItems from "./SEViewPOItems";
import CreateDailyUsage from "./CreateDailyUsage";
import SEViewGRN from "./SEViewGRN";
import SEViewGRNItems from "./ViewGRNItems";

function SiteEngineer() {
  useEffect(() => {
    document.title = "Site Engineer";
  }, []);
  const [modalItems, setmodalItems] = useState([]);
  const [selectedId, setselectedId] = useState("");
  const [status, setstatus] = useState("");
  const [reasons, setreasons] = useState("");
  const [oneMSR, setoneMSR] = useState({});

  const [selectedPO, setselectedPO] = useState({});
  const [selectedGRN, setselectedGRN] = useState({});

  const jwt = localStorage.getItem("token");
  const userID = jwtDecode(jwt)._id;

  const viewItems = (items, id, status, reasons, p) => {
    // setisModalOpen(true);
    setmodalItems(items);
    setselectedId(id);
    setstatus(status);
    setreasons(reasons);
    setoneMSR(p);
  };
  const viewPOItems = (p) => {
    // setisModalOpen(true);
    setselectedPO(p);
  };
  const viewGRNItems = (p) => {
    // setisModalOpen(true);
    setselectedGRN(p);
    console.log("SELECTED GRN", selectedGRN);
  };

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <SESidebar />
        </div>
        <div className="col-10">
          <Switch>
            <Route path="/site-engineer/create-msr" component={CreateMSR} />
            <Route
              path="/site-engineer/create-daily-usage"
              component={CreateDailyUsage}
            />
            <Route
              exact
              path="/site-engineer/view-msr"
              render={(props) => <SEViewMSR viewItems={viewItems} {...props} />}
            />
            <Route
              path="/site-engineer/view-msr/items"
              render={(props) => (
                <SEViewMSRItems
                  viewItems={viewItems}
                  selectedId={selectedId}
                  status={status}
                  reasons={reasons}
                  msrs={modalItems}
                  oneMSR={oneMSR}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/site-engineer/view-po"
              render={(props) => (
                <SEViewPO viewItems={viewPOItems} {...props} />
              )}
            />
            <Route
              path="/site-engineer/view-po/items"
              render={(props) => (
                <SEViewPOItems
                  viewItems={viewPOItems}
                  selectedPO={selectedPO}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/site-engineer/view-grn"
              render={(props) => (
                <SEViewGRN viewItems={viewGRNItems} {...props} />
              )}
            />
            <Route
              path="/site-engineer/view-grn/items"
              render={(props) => (
                <SEViewGRNItems
                  viewItems={viewGRNItems}
                  selectedGRN={selectedGRN}
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

export default SiteEngineer;
