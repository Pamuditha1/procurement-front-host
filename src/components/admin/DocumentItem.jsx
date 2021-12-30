import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import msr from "../../icons/msr2.png";
import msrB from "../../icons/msr2B.png";
import du from "../../icons/du2.png";
import duB from "../../icons/du2B.png";
import pr from "../../icons/pr2.png";
import prB from "../../icons/pr2B.png";
import po from "../../icons/po2.png";
import poB from "../../icons/po2B.png";
import grn from "../../icons/grn2.png";
import grnB from "../../icons/grn2B.png";

function DocumentItem(props) {
  const [hover, sethover] = useState("");

  const itemstyle = {
    backgroundColor: "#222222",
    opacity: "0.9",
    padding: "10px 10px 10px 10px",
    color: "white",
    borderRadius: "25px",
    fontWeight: "bold",
    fontFamily: "Arial",
    fontSize: "20px",
    textAlign: "center",
    width: "100%",
    height: "100%",
    boxShadow: "0px 5px 10px grey",
  };

  const hoverStyle = {
    backgroundColor: "black",
    opacity: "1",
    padding: "10px 10px 10px 10px",
    color: "white",
    borderRadius: "25px",
    fontWeight: "bold",
    fontFamily: "Arial",
    fontSize: "20px",
    textAlign: "center",
    width: "100%",
    height: "100%",
    boxShadow: "0px 7px 10px black",
  };

  const toggleHover = (e) => {
    sethover(e.target.name);
  };
  const outToggle = () => {
    sethover("");
  };

  return (
    <div className="col-sm-12 col-lg-6 mb-5">
      <Link to={`${props.link}`}>
        <Button
          style={hover == props.link ? hoverStyle : itemstyle}
          onMouseEnter={toggleHover}
          onMouseLeave={outToggle}
          name={props.link}
        >
          <div className="row pl-5 pr-5">
            <div className="col-3">
              {/* <span>
                <img height="35px" width="35px" src={props.img} />
              </span> */}
            </div>
            <div className="col-6">{props.name}</div>
          </div>
        </Button>
      </Link>
    </div>
  );
}

export default DocumentItem;
