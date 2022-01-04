import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AddItems from "./AddItems";
import ViewItems from "./ViewItems";
import EditModal from "./EditModal";
import RegisterUserWValidation from "./RegisterUserWValidation";
import ViewUsers from "./ViewUsers";
import EditUser from "./EditUser";
import AddProject from "./AddProject";
import ViewStock from "./ViewStock";
import ViewSuppliers from "./ViewSuppliers";
import ViewProjects from "./ViewProjects";
import ViewDocuments from "./ViewDocuments";
import AdminViewMSR from "./documents/AdminViewMSR";
import AdminViewMSRItems from "./documents/AdminviewMSRItems";
import AdminViewPRItems from "./documents/AdminviewPRItems";
import AdminViewPR from "./documents/AdminViewPR";
import AdminViewPO from "./documents/AdminViewPO";
import AdminViewPOItems from "./documents/AdminViewPOItems";
import AdminViewGRN from "./documents/AdminViewGRN";
import AdminViewGRNItems from "./documents/AdminViewGRNItems";
import AdminViewDU from "./documents/AdminViewDU";
import AdminViewDUItems from "./documents/AdminViewDUItems";
import Reports from "./Reports";

function Admin() {
  useEffect(() => {
    document.title = "Administrator";
  }, []);
  const [selectedUser, setselectedUser] = useState([]);

  const viewUser = (user) => {
    setselectedUser(user);
  };

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <AdminSidebar />
        </div>
        <div className="container col-10">
          <Switch>
            <Route
              path="/admin/register-user"
              component={RegisterUserWValidation}
            />
            <Route
              exact
              path="/admin/view-users"
              render={(props) => (
                <ViewUsers
                  selectedUser={selectedUser}
                  viewUser={viewUser}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/admin/edit-user/:id"
              render={(props) => (
                <EditUser selectedUser={selectedUser} {...props} />
              )}
            />
            <Route path="/admin/add-item" component={AddItems} />
            <Route exact path="/admin/items" component={ViewItems} />
            <Route path="/admin/items/edit/:id" component={EditModal} />
            <Route path="/admin/add-project" component={AddProject} />
            <Route exact path="/admin/stock" component={ViewStock} />
            <Route exact path="/admin/suppliers" component={ViewSuppliers} />
            <Route exact path="/admin/projects" component={ViewProjects} />
            <Route exact path="/admin/documents" component={ViewDocuments} />
            <Route
              exact
              path="/admin/documents/msrs"
              component={AdminViewMSR}
            />
            <Route
              path="/admin/documents/msr/:id"
              component={AdminViewMSRItems}
            />
            <Route exact path="/admin/documents/prs" component={AdminViewPR} />
            <Route
              path="/admin/documents/pr/:id"
              component={AdminViewPRItems}
            />
            <Route exact path="/admin/documents/pos" component={AdminViewPO} />
            <Route
              path="/admin/documents/po/:id"
              component={AdminViewPOItems}
            />
            <Route
              exact
              path="/admin/documents/grns"
              component={AdminViewGRN}
            />
            <Route
              path="/admin/documents/grn/:id"
              component={AdminViewGRNItems}
            />
            <Route exact path="/admin/documents/dus" component={AdminViewDU} />
            <Route
              path="/admin/documents/du/:id"
              component={AdminViewDUItems}
            />
            <Route path="/admin/reports" exact component={Reports} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Admin;
