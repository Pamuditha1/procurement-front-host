import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

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

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <PDSidebar />
        </div>
        <div className="container col-10">
          <Switch>
            <Route exact path="/pur-dep/view-pr" component={PDViewPR} />
            <Route path="/pur-dep/view-pr/:id" component={PDViewPRItems} />
            <Route exact path="/pur-dep/view-po" component={PDViewPO} />
            <Route path="/pur-dep/view-po/:id" component={PDViewPOItems} />
            <Route exact path="/pur-dep/view-grn" component={PDViewGRN} />
            <Route path="/pur-dep/view-grn/:id" component={PDViewGRNItems} />
            <Route exact path="/pur-dep/view-du" component={PDViewDU} />
            <Route path="/pur-dep/view-du/:id" component={PDViewDUItems} />
            <Route path="/pur-dep/create-po" component={CreatePO} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default PurDep;
