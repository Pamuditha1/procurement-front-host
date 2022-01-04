import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SESidebar from "./SiteEngineerSidebar";
import CreateMSR from "./CreateMSR";
import SEViewMSR from "./SEViewMSR";
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
            <Route exact path="/site-engineer/view-msr" component={SEViewMSR} />
            <Route
              path="/site-engineer/view-msr/:id"
              component={SEViewMSRItems}
            />
            <Route exact path="/site-engineer/view-po" component={SEViewPO} />
            <Route
              path="/site-engineer/view-po/:id"
              component={SEViewPOItems}
            />
            <Route exact path="/site-engineer/view-grn" component={SEViewGRN} />
            <Route
              path="/site-engineer/view-grn/:id"
              component={SEViewGRNItems}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default SiteEngineer;
