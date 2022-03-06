import React, { Component } from "react";
import user_data from "../assets/user_data.json";

const VouchedComponent = (props) => {
  let items = [];
  for (let i = 0; i < user_data.vouched.length; i++) {
    items.push(
      <VouchedItem
        data={user_data.vouched[i]}
        index={i}
        changeModal={props.changeModal}
        type="vouched"
        id={i}
      />
    );
  }
  return (
    <div className="flex flex-row space-x-2 no-scrollbar overflow-y-auto flex-nowrap">
      {items}
    </div>
  );
};

const VouchedItem = (props) => {
  if (props.index > 0)
    return (
      <button
        className="bg-white p-3 flex flex-col flex-none shadow-md mb-5 rounded ml-5"
        style={{ width: "150px" }}
        onClick={props.changeModal}
        id={`vouched/${props.id}`}
      >
        <div className="mb-2" style={{ width: "100%", pointerEvents: "none" }}>
          <ImageComponent src={props.data.image} />
        </div>
        <h3 className="font-number text-sm font-bold truncate pointer-events-none">
          {props.data.name}
        </h3>
        <h5 className="text-xs font-light truncate pointer-events-none">
          {props.data.category}
        </h5>
        <h5 className="text-xs mt-3 pointer-events-none">Est. opening</h5>
        <h5 className="text-sm font-number font-semibold pointer-events-none">
          {props.data.opening}
        </h5>
      </button>
    );
  else
    return (
      <button
        className="bg-white p-3 flex flex-col flex-none shadow-md mb-5 rounded ml-5"
        style={{ width: "150px" }}
        onClick={props.changeModal}
        id={`vouched/${props.id}`}
      >
        <div className="mb-2" style={{ width: "100%", pointerEvents: "none" }}>
          <ImageComponent src={props.data.image} />
        </div>
        <h3 className="font-number text-sm font-bold pointer-events-none">
          {props.data.name}
        </h3>
        <h5 className="text-xs font-light pointer-events-none">
          {props.data.category}
        </h5>
        <h5 className="text-xs mt-3 pointer-events-none">Est. opening</h5>
        <h5 className="text-sm font-number font-semibold pointer-events-none">
          {props.data.opening}
        </h5>
      </button>
    );
};

const ImageComponent = (props) => {
  console.log(props.src);
  if (props.src != "") {
    return (
      <img
        src={props.src}
        style={{ minHeight: "100px", minWidth: "100px", objectFit: "cover" }}
      />
    );
  } else
    return (
      <div
        className="bg-gray-400"
        style={{ minHeight: "100px", minWidth: "100px" }}
      />
    );
};

export default VouchedComponent;
