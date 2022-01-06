import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Admin from "./admin/Admin";
import ControlHeader from "./ControlHeader";
import Login from "./Login";
import PurDep from "./purchasingDep/PurDep";
import QSDep from "./qsDepartment/QSDep";
import SiteSupervisor from "./Site Supervisor/SiteSupervisor";
import SiteEngineer from "./SiteEngineer/SiteEngineer";
import Supplier from "./supplier/Supplier";
import PrivateRoute from "./PrivateRoute";
import NoMatch from "./NoMatch";

function Main() {
  useEffect(() => {
    document.title = "Success Constructions | PMS";
  }, []);

  const style = {
    width: "100%",
    height: "100%",
  };
  return (
    <div style={style}>
      <ControlHeader />
      <div className="container">
        <ToastContainer />

        <Switch>
          <PrivateRoute
            path="/site-engineer"
            component={SiteEngineer}
            type="Site Engineer"
          />
          <PrivateRoute
            path="/site-supervisor"
            component={SiteSupervisor}
            type="Site Supervisor"
          />
          <PrivateRoute path="/qs-dep" component={QSDep} type="QS Department" />
          <PrivateRoute
            path="/pur-dep"
            component={PurDep}
            type="Purchasing Department"
          />
          <PrivateRoute path="/admin" component={Admin} type="Admin" />
          <PrivateRoute path="/supplier" component={Supplier} type="Supplier" />
          <Route exact path="/" component={Login} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Main;
