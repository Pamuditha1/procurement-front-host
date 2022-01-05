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

function Main() {
  useEffect(() => {
    document.title = "Welkin Constructions";
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
          <Route path="/site-engineer" component={SiteEngineer} />
          <Route path="/site-supervisor" component={SiteSupervisor} />
          <Route path="/qs-dep" component={QSDep} />
          <Route path="/pur-dep" component={PurDep} />
          <Route path="/admin" component={Admin} />
          <Route path="/supplier" component={Supplier} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default Main;
