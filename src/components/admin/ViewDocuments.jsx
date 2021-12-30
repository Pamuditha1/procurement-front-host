import React from "react";
import DocumentItem from "./DocumentItem";

function ViewDocuments() {
  return (
    <div className="row mr-3 mt-5">
      <DocumentItem name="MSRs" link="/admin/documents/msrs" />
      <DocumentItem name="PRs" link="/admin/documents/prs" />
      <DocumentItem name="POs" link="/admin/documents/pos" />
      <DocumentItem name="GRNs" link="/admin/documents/grns" />
      <DocumentItem name="DURs" link="/admin/documents/dus" />
    </div>
  );
}

export default ViewDocuments;
