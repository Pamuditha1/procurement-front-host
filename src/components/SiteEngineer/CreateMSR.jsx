import React, { useState, useEffect } from "react";
import { Table, Button, Badge } from "reactstrap";
import jwtDecode from "jwt-decode";

import createMSR from "../../services/createMSRservice";
import getItems from "../../services/getItems";
import getNo from "../../services/getNoService";
import getProjects from "../../services/getProjects";

function CreateMSR() {
  const [msrData, setmsrData] = useState({
    msrNo: "",
    project: "",
  });
  const [msr, setmsr] = useState([]);
  const [projects, setprojects] = useState([]);
  const units = ["Choose Unit", "Bags", "Cubes", "Numbers", "Litres", "Pieces"];
  const [readProject, setreadProject] = useState(false);

  const [msrItem, setmsrItem] = useState({
    id: "",
    description: "",
    unit: "",
    quantity: "",
    avaiQyt: "",
    remarks: "",
    supplier: "",
  });
  const [searchItem, setsearchItem] = useState("");
  const [searchResults, setsearchResults] = useState([]);

  async function fetchSupp() {
    let no = await getNo("msr");
    setmsrData({ ...msrData, msrNo: no });

    let pro = [{ name: "Choose Project", id: "01" }];
    let result = await getProjects();
    result.forEach((r) => {
      pro.push({ name: r.name, id: r._id, projectNo: r.projectNo });
    });
    setprojects(pro);
  }

  useEffect(() => {
    fetchSupp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      let items = await getItems();
      let searched = items.filter((i) => {
        if (
          i.name.toLowerCase().includes(searchItem.toLowerCase()) ||
          i.code.includes(searchItem.toLowerCase())
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
    setmsrData({
      ...msrData,
      project: e.target.value,
    });
  };
  const onchangeSelectUnit = (e) => {
    setmsrItem({
      ...msrItem,
      unit: e.target.value,
    });
  };
  const onchange = (e) => {
    setmsrItem({
      ...msrItem,
      [e.target.name]: e.target.value,
    });
  };
  const changeNoAProject = (e) => {
    setmsrData({ ...msrData, [e.target.name]: e.target.value });
  };

  const onAdd = () => {
    setmsr([...msr, msrItem]);
    setmsrItem({
      id: "",
      description: "",
      unit: "",
      quantity: "",
      remarks: "",
      supplier: "",
    });
    setreadProject(true);
  };
  const clearItem = () => {
    setmsrItem({
      id: "",
      description: "",
      unit: "",
      quantity: "",
      remarks: "",
    });
    setreadProject(true);
  };

  const removeFromTable = (i) => {
    let list = msr;
    let filtered = list.filter((p) => {
      if (p.no !== i.no) return true;
      return false;
    });
    setmsr(filtered);
  };

  const submit = async (e) => {
    const jwt = localStorage.getItem("token");
    const userID = jwtDecode(jwt)._id;

    let msrOrder = {
      msr: msr,
      userID: userID,
      msrData: msrData,
    };
    await createMSR(msrOrder);
    fetchSupp();
    setmsr([]);
  };

  const addselected = (s) => {
    setmsrItem({
      ...msrItem,
      id: s._id,
      description: s.name,
      unit: s.unit,
    });
  };

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Create MSR
      </h6>

      <div className="form-group col-12">
        <label htmlFor="msrNo" className="col-5">
          MSR No
        </label>
        <input
          readOnly={readProject}
          onChange={changeNoAProject}
          value={msrData.msrNo}
          className="form-control col-11 ml-3"
          type="text"
          id="msrNo"
          name="msrNo"
        />
      </div>
      <div className="form-group col-12">
        <label htmlFor="project" className="col-5">
          Project
        </label>
        <select
          onChange={onchangeSelectProject}
          value={msrData.project}
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
                {option.projectNo} - {option.name}
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
        placeholder="Search Items ..."
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
                  value={msrItem.description}
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
                  value={msrItem.unit}
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
                <label htmlFor="quantity" className="col-5">
                  Quantity{" "}
                </label>
                <input
                  onChange={onchange}
                  value={msrItem.quantity}
                  className="form-control col-11"
                  type="number"
                  id="quantity"
                  name="quantity"
                  max={msrItem.avaiQyt}
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="remarks" className="col-5">
                  Remarks
                </label>
                <input
                  onChange={onchange}
                  value={msrItem.remarks}
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
            {msr.map((p, index) => {
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
            Create MSR
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateMSR;
