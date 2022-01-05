import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import QSViewMSR from "./QSViewMSR";
import QSSidebar from "./QSSidebar";
import QSViewMSRItems from "./QSviewMSRItems";
import QSViewPR from "./QSViewPR";
import QSViewPRItems from "./QSviewPRItems";

function QSDep() {
  useEffect(() => {
    document.title = "QS Department";
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <QSSidebar />
        </div>
        <div className="container col-10">
          <Switch>
            <Route exact path="/qs-dep/view-msr" component={QSViewMSR} />
            <Route path="/qs-dep/view-msr/:id" component={QSViewMSRItems} />
            <Route exact path="/qs-dep/view-pr" component={QSViewPR} />
            <Route path="/qs-dep/view-pr/:id" component={QSViewPRItems} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default QSDep;
