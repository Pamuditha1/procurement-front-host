import React, { useState, useEffect } from "react";
import { Table, Button, Badge } from "reactstrap";
import jwtDecode from "jwt-decode";

import createUsage from "../../services/createDailyReport";
import getItems from "../../services/getItems";
import getNo from "../../services/getNoService";
import getProjects from "../../services/getProjects";

function CreateDailyUsage() {
  const [reportData, setreportData] = useState({
    reportNo: "",
    project: "",
  });
  const [reportItems, setreportItems] = useState([]);
  const [projects, setprojects] = useState([]);
  const units = ["Choose Unit", "Bags", "Cubes", "Numbers", "Litres", "Pieces"];
  const [readProject, setreadProject] = useState(false);

  const [reportItem, setreportItem] = useState({
    id: "",
    description: "",
    unit: "",
    quantity: "",
    remarks: "",
  });
  const [searchItem, setsearchItem] = useState("");
  const [searchResults, setsearchResults] = useState([]);

  async function fetchData() {
    let no = await getNo("usage");
    setreportData({ ...reportData, reportNo: no });

    let pro = [{ name: "Choose Project", id: "01" }];
    let result = await getProjects();
    result.forEach((r) => {
      pro.push({ name: r.name, id: r._id });
    });
    setprojects(pro);
  }

  useEffect(() => {
    fetchData();
  });

  const search = async (e) => {
    if (e.key === "Enter") {
      let items = await getItems();
      let searched = items.filter((i) => {
        if (
          i.name.toLowerCase().includes(searchItem.toLowerCase()) ||
          i.code.toLowerCase().includes(searchItem.toLowerCase())
        )
          return true;
        return false;
      });
      setsearchResults(searched);
    }
  };
  const onChange = async (e) => {
    setsearchItem(e.target.value);
  };

  const onchangeSelectProject = (e) => {
    setreportData({
      ...reportData,
      project: e.target.value,
    });
  };
  const onchangeSelectUnit = (e) => {
    setreportItem({
      ...reportItem,
      unit: e.target.value,
    });
  };
  const onchange = (e) => {
    setreportItem({
      ...reportItem,
      [e.target.name]: e.target.value,
    });
  };
  const changeNoAProject = (e) => {
    setreportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const onAdd = () => {
    setreportItems([...reportItems, reportItem]);
    setreportItem({
      id: "",
      description: "",
      unit: "",
      quantity: "",
      remarks: "",
    });
    setreadProject(true);
  };
  const clearItem = () => {
    setreportItem({
      id: "",
      description: "",
      unit: "",
      quantity: "",
      remarks: "",
    });
    setreadProject(true);
  };

  const removeFromTable = (i) => {
    let list = reportItems;
    let filtered = list.filter((p) => {
      if (p.no !== i.no) return true;
      return false;
    });
    setreportItems(filtered);
  };

  const submit = async (e) => {
    const jwt = localStorage.getItem("token");
    const userID = jwtDecode(jwt)._id;

    let report = {
      reportItems: reportItems,
      userID: userID,
      reportData: reportData,
    };
    await createUsage(report);
    fetchData();
    setsearchItem("");
    setsearchResults([]);
    setreportItems([]);
  };

  const addselected = (s) => {
    setreportItem({
      ...reportItem,
      id: s._id,
      description: s.name,
      unit: s.unit,
      avaiQyt: s.quantity,
      quantity: 0,
    });
  };

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Create Daily Usage Report
      </h6>

      <div className="form-group col-12">
        <label htmlFor="reportNo" className="col-5">
          Report No
        </label>
        <input
          readOnly={readProject}
          onChange={changeNoAProject}
          value={reportData.reportNo}
          className="form-control col-11 ml-3"
          type="text"
          id="reportNo"
          name="reportNo"
        />
      </div>
      <div className="form-group col-12">
        <label htmlFor="project" className="col-5">
          Project
        </label>
        <select
          onChange={onchangeSelectProject}
          value={reportData.project}
          id="project"
          name="project"
          className="form-control col-11 ml-3"
          required
        >
          {projects.map((option) => {
            return (
              <option
                key={option.id}
                value={option.id}
                style={{ textAlign: "center" }}
              >
                {option.name}
              </option>
            );
          })}
        </select>
      </div>

      <input
        value={searchItem}
        className="form-control mb-5 mt-5"
        onChange={onChange}
        onKeyDown={search}
        placeholder="Search in Stock ..."
      />
      {searchResults &&
        searchResults.map((s) => (
          <Badge key={s._id} color="secondary" pill>
            {s.name}
            <Button
              className="ml-1 rounded-circle"
              onClick={() => addselected(s)}
            >
              +
            </Button>
          </Badge>
        ))}

      <form className="container mt-5" autoComplete="off">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="description" className="col-5">
                  Description
                </label>
                <input
                  onChange={onchange}
                  value={reportItem.description}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="description"
                  name="description"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="unit" className="col-5">
                  Unit
                </label>
                <select
                  onChange={onchangeSelectUnit}
                  value={reportItem.unit}
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
                <label htmlFor="quantity" className="col-12">
                  Quantity{" "}
                  <strong>
                    {reportItem.avaiQyt && `(Avai - ${reportItem.avaiQyt} )`}
                  </strong>
                </label>
                <input
                  onChange={onchange}
                  value={reportItem.quantity}
                  className="form-control col-10"
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  max={reportItem.avaiQyt}
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="remarks" className="col-5">
                  Remarks
                </label>
                <input
                  onChange={onchange}
                  value={reportItem.remarks}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="remarks"
                  name="remarks"
                />
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button
                    onClick={clearItem}
                    type="button"
                    className="btn btn-warning"
                  >
                    Clear Item
                  </button>
                  <button
                    onClick={onAdd}
                    disabled={!reportItem.quantity}
                    type="button"
                    className="btn btn-primary  ml-3"
                  >
                    Add Item
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div>
        <Table hover borderless>
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Description</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Remarks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reportItems.map((p, index) => {
              return (
                <tr key={p.description}>
                  <td className="text-center">
                    <strong>{index + 1}</strong>
                  </td>
                  <td className="text-center">
                    <strong>{p.description}</strong>
                  </td>
                  <td className="text-center">
                    <strong>{p.unit}</strong>
                  </td>
                  <td className="text-center">
                    <strong>{p.quantity}</strong>
                  </td>
                  <td className="text-center">
                    <strong>{p.remarks}</strong>
                  </td>
                  <td>
                    <Button color="danger" onClick={() => removeFromTable(p)}>
                      {" "}
                      <strong>X Remove</strong>{" "}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <button
            onClick={submit}
            type="submit"
            className="btn btn-success float-right mb-3"
          >
            Create Usage Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateDailyUsage;
