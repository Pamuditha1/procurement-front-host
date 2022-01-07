import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import updateItem from "../../services/updateItem";
import getOneItem from "../../services/getOneItem";

function EditModal(props) {
  const [item, setitem] = useState({});
  const { id } = useParams();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      const results = await getOneItem(id);
      setitem(results);
    }

    fetchItem();
  }, [id]);

  const units = ["Choose Unit", "Bags", "Cubes", "Numbers", "Litres", "Pieces"];

  const onchange = (e) => {
    setitem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  const onchangeSelectUnit = (e) => {
    setitem({
      ...item,
      unit: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setloading(true);
    updateItem(item).then(() => props.history.push("/admin/items"));
    setloading(false);
  };
  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Update Item
      </h6>
      <>
        {!item || loading ? (
          <div className="container text-center" style={{ width: "793px" }}>
            <Loader
              type="Puff"
              color="#050A30"
              height={100}
              width={100}
              timeout={5000}
            />
          </div>
        ) : (
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
        )}
      </>
    </div>
  );
}

export default EditModal;
