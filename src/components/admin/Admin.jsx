import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import AdminSidebar from "./AdminSidebar";
// import ViewMSR from "./ViewMSR";
// import ViewMSRItems from "./viewMSRItems";

import updateMSR from "../../services/updateMSR";
import RegisterUser from "./RegisterUsers";
import RegisterSupplier from "./RegisterSupplier";
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
  const [modalItem, setmodalItem] = useState({});
  const [selectedUser, setselectedUser] = useState([]);
  const [selectedMSR, setselectedMSR] = useState({});
  const [selectedPR, setselectedPR] = useState({});
  const [selectedPO, setselectedPO] = useState({});
  const [selectedGRN, setselectedGRN] = useState({});
  const [selectedDU, setselectedDU] = useState({});

  const jwt = localStorage.getItem("token");
  const userID = jwtDecode(jwt)._id;

  const viewItem = (item) => {
    // setisModalOpen(true);
    setmodalItem(item);
  };
  const viewUser = (user) => {
    // setisModalOpen(true);
    setselectedUser(user);
  };

  const viewMSR = (p) => {
    setselectedMSR(p);
  };
  const viewPR = (p) => {
    setselectedPR(p);
  };
  const viewPO = (p) => {
    setselectedPO(p);
  };
  const viewGRN = (p) => {
    setselectedGRN(p);
  };
  const viewDU = (p) => {
    setselectedDU(p);
  };
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <AdminSidebar />
        </div>
        <div className="container col-10">
          <Switch>
            {/* <Route path="/admin/register-user" component={RegisterUser} /> */}
            <Route
              path="/admin/register-user"
              component={RegisterUserWValidation}
            />
            {/* <Route path="/admin/view-users" component={ViewUsers} /> */}
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
              path="/admin/edit-user"
              render={(props) => (
                <EditUser selectedUser={selectedUser} {...props} />
              )}
            />
            <Route path="/admin/add-item" component={AddItems} />
            {/* <Route path="/admin/inventory" component={ViewInventory} /> */}
            <Route
              exact
              path="/admin/items"
              render={(props) => <ViewItems viewItem={viewItem} {...props} />}
            />
            <Route
              path="/admin/items/edit"
              render={(props) => <EditModal viewItem={modalItem} {...props} />}
            />
            <Route
              path="/admin/add-project"
              render={(props) => <AddProject {...props} />}
            />
            <Route
              exact
              path="/admin/stock"
              render={(props) => <ViewStock {...props} />}
            />
            <Route
              exact
              path="/admin/suppliers"
              render={(props) => <ViewSuppliers {...props} />}
            />
            <Route
              exact
              path="/admin/projects"
              render={(props) => <ViewProjects {...props} />}
            />
            <Route exact path="/admin/documents" component={ViewDocuments} />
            <Route
              exact
              path="/admin/documents/msrs"
              render={(props) => (
                <AdminViewMSR viewItems={viewMSR} {...props} />
              )}
            />
            <Route
              path="/admin/documents/msrs/items"
              render={(props) => (
                <AdminViewMSRItems
                  viewItems={viewMSR}
                  selectedMSR={selectedMSR}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/admin/documents/prs"
              render={(props) => <AdminViewPR viewItems={viewPR} {...props} />}
            />
            <Route
              path="/admin/documents/prs/items"
              render={(props) => (
                <AdminViewPRItems
                  viewItems={viewPR}
                  selectedPR={selectedPR}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/admin/documents/pos"
              render={(props) => <AdminViewPO viewItems={viewPO} {...props} />}
            />
            <Route
              path="/admin/documents/pos/items"
              render={(props) => (
                <AdminViewPOItems
                  viewItems={viewPO}
                  selectedPO={selectedPO}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/admin/documents/grns"
              render={(props) => (
                <AdminViewGRN viewItems={viewGRN} {...props} />
              )}
            />
            <Route
              path="/admin/documents/grns/items"
              render={(props) => (
                <AdminViewGRNItems
                  viewItems={viewGRN}
                  selectedGRN={selectedGRN}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/admin/documents/dus"
              render={(props) => <AdminViewDU viewItems={viewDU} {...props} />}
            />
            <Route
              path="/admin/documents/dus/items"
              render={(props) => (
                <AdminViewDUItems
                  viewItems={viewDU}
                  selectedDU={selectedDU}
                  {...props}
                />
              )}
            />
            <Route
              path="/admin/reports"
              exact
              component={Reports}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Admin;
