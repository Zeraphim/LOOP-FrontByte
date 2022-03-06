import React, { Component } from "react";

const ModalComponent = (props) => {
  return (
    <div className="h-screen mx-2 bg-gray-400">
      <div className="bg-white rounded px-5">{displayContent(props)}</div>
    </div>
  );
};
