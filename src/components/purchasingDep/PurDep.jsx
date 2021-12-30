import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

import CreatePO from "./CreatePO";
import PDSidebar from "./PDSidebar";
import PDViewPR from "./PDViewPR";
import PDViewPRItems from "./PDviewPRItems";
import PDViewPO from "./PDViewPO";
import PDViewPOItems from "./PDViewPOItems";
import PDViewGRN from "./PDViewGRN";
import PDViewGRNItems from "./PDViewGRNItems";
import PDViewDU from "./PDViewDU";
import PDViewDUItems from "./PDViewDUItems";

function PurDep() {
  useEffect(() => {
    document.title = "Purchasing Department";
  }, []);
  const [modalItems, setmodalItems] = useState([]);
  const [selectedId, setselectedId] = useState("");
  const [status, setstatus] = useState("");
  const [selectedPR, setselectedPR] = useState({});
  const [selectedPO, setselectedPO] = useState({});
  const [selectedGRN, setselectedGRN] = useState({});
  const [selectedDU, setselectedDU] = useState({});

  const viewItems = (items, id, status, p) => {
    // setisModalOpen(true);
    setmodalItems(items);
    setselectedId(id);
    setstatus(status);
    setselectedPR(p);
  };

  const viewPO = (p) => {
    setselectedPO(p);
  };
  const viewGRNItems = (p) => {
    setselectedGRN(p);
    console.log("SELECTED GRN", selectedGRN);
  };
  const viewDU = (p) => {
    setselectedDU(p);
  };
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <PDSidebar />
        </div>
        <div className="container col-10">
          <Switch>
            <Route
              exact
              path="/pur-dep/view-pr"
              render={(props) => <PDViewPR viewItems={viewItems} {...props} />}
            />
            <Route
              path="/pur-dep/view-pr/items"
              render={(props) => (
                <PDViewPRItems
                  viewItems={viewItems}
                  selectedId={selectedId}
                  status={status}
                  prs={modalItems}
                  selectedPR={selectedPR}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/pur-dep/view-po"
              render={(props) => <PDViewPO viewItems={viewPO} {...props} />}
            />
            <Route
              path="/pur-dep/view-po/items"
              render={(props) => (
                <PDViewPOItems
                  viewItems={viewItems}
                  selectedPO={selectedPO}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/pur-dep/view-grn"
              render={(props) => (
                <PDViewGRN viewItems={viewGRNItems} {...props} />
              )}
            />
            <Route
              path="/pur-dep/view-grn/items"
              render={(props) => (
                <PDViewGRNItems
                  viewItems={viewGRNItems}
                  selectedGRN={selectedGRN}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/pur-dep/view-du"
              render={(props) => <PDViewDU viewItems={viewDU} {...props} />}
            />
            <Route
              path="/pur-dep/view-du/items"
              render={(props) => (
                <PDViewDUItems
                  viewItems={viewDU}
                  selectedDU={selectedDU}
                  {...props}
                />
              )}
            />
            {/*<Route
              exact
              path="/qs-dep"
              render={(props) => <QSViewMSR viewItems={viewItems} {...props} />}
            /> */}
            <Route path="/pur-dep/create-po" component={CreatePO} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default PurDep;
