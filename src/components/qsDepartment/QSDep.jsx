import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

import QSViewMSR from "./QSViewMSR";
import QSSidebar from "./QSSidebar";
import QSViewMSRItems from "./QSviewMSRItems";
import QSViewPR from "./QSViewPR";
import QSViewPRItems from "./QSviewPRItems";
import CreatePR from "./CreatePR";

function QSDep() {
  useEffect(() => {
    document.title = "QS Department";
  }, []);
  const [modalItems, setmodalItems] = useState([]);
  const [selectedId, setselectedId] = useState("");
  const [status, setstatus] = useState("");
  const [selectedMSR, setselectedMSR] = useState({});

  const [selectedPR, setselectedPR] = useState({});

  const viewItems = (items, id, status, p) => {
    // setisModalOpen(true);
    setmodalItems(items);
    setselectedId(id);
    setstatus(status);
    setselectedMSR(p);
  };

  const viewPRItems = (item) => {
    // setisModalOpen(true);
    setselectedPR(item);
  };

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <QSSidebar />
        </div>
        <div className="container col-10">
          <Switch>
            {/* <h1>Hello</h1> */}
            {/* <Route path="/site-supervisor/view-msr" component={ViewMSR}/> */}
            <Route
              exact
              path="/qs-dep/view-msr"
              render={(props) => <QSViewMSR viewItems={viewItems} {...props} />}
            />
            <Route
              path="/qs-dep/view-msr/items"
              render={(props) => (
                <QSViewMSRItems
                  viewItems={viewItems}
                  selectedId={selectedId}
                  status={status}
                  msrs={modalItems}
                  selectedMSR={selectedMSR}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/qs-dep/view-pr"
              render={(props) => (
                <QSViewPR viewItems={viewPRItems} {...props} />
              )}
            />
            <Route
              path="/qs-dep/view-pr/items"
              render={(props) => (
                <QSViewPRItems selectedPR={selectedPR} {...props} />
              )}
            />
            <Route
              exact
              path="/qs-dep"
              render={(props) => <QSViewMSR viewItems={viewItems} {...props} />}
            />

            {/* <Route path="/qs-dep/create-pr" component={CreatePR} /> */}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default QSDep;
