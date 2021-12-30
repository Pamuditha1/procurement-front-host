import React from "react";
import AddProduct from "./AddProduct";
import { Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AdminHeader from "./ControlHeader";
import AdminViewProducts from "./AdminViewProducts";
import AddSupplier from "./AddSupplier";
import UpdateProduct from "./UpdateProduct";
import NewAdminProducts from "./NewAdminProducts";
import Inventory from "./Inventory";
import { SalesTable } from "./tables/sales/salesTable";
import Sales from "./Sales";
import Orders from "./Orders";

function ControlPannel() {
  return (
    <>
      <AdminHeader />
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="container col-10">
          <Switch>
            <Route path="/admin/orders" component={Orders} />
            <Route path="/admin/additem" component={AddProduct} />
            <Route path="/admin/updateitem/:id" component={UpdateProduct} />
            <Route path="/admin/viewitems" component={NewAdminProducts} />
            <Route path="/admin/add-supplier" component={AddSupplier} />
            <Route path="/admin/inventory" component={Inventory} />
            <Route path="/admin/sales" component={Sales} />
            <Route path="/" component={AddProduct} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default ControlPannel;
