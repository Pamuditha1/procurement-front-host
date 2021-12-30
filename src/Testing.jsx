import React from "react";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";

const ref = React.createRef();

function Testing() {
  let style = {
    backgroundColor: "#FFFFFF",
    border: "none",
    borderRadius: "2px",
    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
  };

  const downloadFile = (url) => {
    //Download method
    console.log(url);
    const iframe = document.createElement("iframe");
    iframe.style.display = "none"; // Prevent from affecting the page
    iframe.style.height = 0; // prevent affecting the page
    iframe.src = url;
    document.body.appendChild(iframe); // This line must be, the iframe will be hung on the dom tree to send a request
    // Delete after 5 minutes (onload method does not work for download links, just pick your feet first)
    setTimeout(() => {
      iframe.remove();
    }, 5 * 60 * 1000);
  };

  return (
    <div>
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div ref={ref}>
        Hellooooooo
        <iframe
          style={style}
          width="640"
          height="480"
          onClick={(e) => console.log("IFRAME", e)}
          src="https://charts.mongodb.com/charts-procurement-management-sy-olhiy/embed/charts?id=bbbbf536-bce1-4a79-9cea-3aeebdbe7439&autoRefresh=60&theme=light"
        ></iframe>
      </div>

      <button
        onClick={() =>
          downloadFile(
            "https://charts.mongodb.com/charts-procurement-management-sy-olhiy/embed/charts?id=bbbbf536-bce1-4a79-9cea-3aeebdbe7439&autoRefresh=60&theme=light"
          )
        }
      >
        Downlad Chart
      </button>
    </div>
  );
}

export default Testing;
