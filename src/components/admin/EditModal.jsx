import React, { useState, useEffect } from "react";
import updateItem from "../../services/updateItem";
import { Link } from "react-router-dom";

function EditModal({ viewItem }) {
  const [item, setitem] = useState({});

  useEffect(() => {
    console.log(viewItem);
    setitem(viewItem);
  }, [viewItem]);

  const [units, setunits] = useState([
    "Choose Unit",
    "Bags",
    "Cubes",
    "Numbers",
    "liters",
  ]);

  const onchange = (e) => {
    console.log("run");
    setitem({
      ...item,
      [e.target.name]: e.target.value,
    });
    // console.log(supplierData)
  };
  const onchangeSelectUnit = (e) => {
    setitem({
      ...item,
      unit: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    await updateItem(item);
    // // addProduct(customerData)
    console.log("Update", item);
    // setLoading(false);
  };
  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Update Item
      </h6>
      <form className="container mt-5" autoComplete="off">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="code" className="col-5">
                  Item Code
                </label>
                <input
                  onChange={onchange}
                  value={item.code}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="code"
                  name="code"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="name" className="col-5">
                  Name
                </label>
                <input
                  onChange={onchange}
                  value={item.name}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="unit" className="col-5">
                  Unit
                </label>
                <select
                  onChange={onchangeSelectUnit}
                  value={item.unit}
                  id="unit"
                  name="unit"
                  className="form-control col-11 ml-3"
                  required
                >
                  {units.map((option) => {
                    return (
                      <option
                        key={option}
                        value={option}
                        style={{ textAlign: "center" }}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="reorderL" className="col-5">
                  Reorder Level
                </label>
                <input
                  onChange={onchange}
                  value={item.reorderL}
                  className="form-control col-10"
                  type="number"
                  id="reorderL"
                  name="reorderL"
                />
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <Link to="/admin/items">
                    <button className="btn btn-dark mr-5">Back</button>
                  </Link>
                  <button
                    onClick={submit}
                    type="submit"
                    className="btn btn-success"
                  >
                    Update
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
