import React, { useState } from "react";
import Loader from "react-loader-spinner";

import addProject from "../../services/addProject";

function AddProject() {
  const initialProject = {
    projectNo: "",
    name: "",
    location: "",
    type: "",
    client: "",
    clientCoNo: "",
  };
  const [project, setproject] = useState(initialProject);
  const [error] = useState("");
  const typesList = [
    "Choose category",
    "Assembly",
    "Business",
    "Educational",
    "Factory",
    "Institutional",
    "Merchantile",
    "Residential",
    "Storage",
    "Utility",
  ];
  const [allowSubmit] = useState(true);
  const [loading, setloading] = useState(false);

  const onchange = (e) => {
    setproject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const onchangeSelectUnit = (e) => {
    setproject({
      ...project,
      type: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setloading(true);
    const success = await addProject(project);
    if (success) setproject(initialProject);
    setloading(false);
  };

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Add Project
      </h6>
      <>
        {loading ? (
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
                    <label htmlFor="projectNo" className="col-5">
                      Project Code
                    </label>
                    <input
                      onChange={onchange}
                      value={project.projectNo}
                      className="form-control col-11 ml-3"
                      type="text"
                      id="projectNo"
                      name="projectNo"
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="name" className="col-5">
                      Project Name
                    </label>
                    <input
                      onChange={onchange}
                      value={project.name}
                      className="form-control col-11 ml-3"
                      type="text"
                      id="name"
                      name="name"
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="location" className="col-5">
                      Location
                    </label>
                    <input
                      onChange={onchange}
                      value={project.location}
                      className="form-control col-11 ml-3"
                      type="text"
                      id="location"
                      name="location"
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="unit" className="col-5">
                      Category
                    </label>
                    <select
                      onChange={onchangeSelectUnit}
                      value={project.type}
                      id="type"
                      name="type"
                      className="form-control col-11 ml-3"
                      required
                    >
                      {typesList.map((option) => {
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
                    <label htmlFor="client" className="col-5">
                      Client
                    </label>
                    <input
                      onChange={onchange}
                      value={project.client}
                      className="form-control col-11 ml-3"
                      type="text"
                      id="client"
                      name="client"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="clientCoNo" className="col-5">
                      Client Contact No
                    </label>
                    <input
                      onChange={onchange}
                      value={project.clientCoNo}
                      className="form-control col-10"
                      type="text"
                      id="clientCoNo"
                      name="clientCoNo"
                    />
                  </div>
                  <p className="text-center" style={{ color: "red" }}>
                    {error}
                  </p>
                  <div className="form-group col-12 mt-3">
                    <center>
                      <button
                        onClick={submit}
                        type="submit"
                        className="btn btn-success"
                        disabled={!allowSubmit}
                      >
                        Add
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

export default AddProject;
