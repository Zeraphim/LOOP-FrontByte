import React, { Component, useState } from "react";
import user_data from "../assets/user_data.json";

const ProposedComponent = (props) => {
  let items = [];
  for (let i = 0; i < user_data.vouched.length; i++) {
    items.push(<ProposedItem data={user_data.proposed[i]} index={i} />);
  }
  return (
    <div className="flex flex-row space-x-2 no-scrollbar overflow-y-auto flex-nowrap">
      {items}
    </div>
  );
};

const ProposedItem = (props) => {
  const [vouched, setVouched] = useState(props.data.vouched);
  const content = (
    <>
      <div className="mb-2">
        <ImageComponent src={props.data.image} />
      </div>
      <div style={{ flexGrow: 1 }}>
        <h5 className="text-xs font-light truncate">{props.data.location}</h5>
        <h3 className="font-number text-sm font-bold truncate">
          {props.data.name}
        </h3>
        <h5 className="text-xs font-light truncate">{props.data.category}</h5>
      </div>
      <h5 className="text-xs mt-3">Users interested</h5>
      <h5 className="text-sm font-number font-semibold mb-1">
        {props.data.interested}
      </h5>
      {!vouched ? (
        <button className="px-4 py-2 bg-blue-900 text-white rounded-full text-xs font-number font-semibold">
          Vouch
        </button>
      ) : (
        <button className="px-3 py-1.5 border-blue-900 border-2 text-blue-900 font-number font-semibold rounded-full text-xs">
          Vouched
        </button>
      )}
    </>
  );
  if (props.index > 0)
    return (
      <div
        className="bg-white p-3 flex flex-col flex-none shadow-md mb-5 rounded ml-5"
        style={{ width: "150px" }}
      >
        {content}
      </div>
    );
  else
    return (
      <div
        className="bg-white p-3 flex flex-col flex-none shadow-md mb-5 rounded ml-5"
        style={{ width: "150px" }}
      >
        {content}
      </div>
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

export default ProposedComponent;
