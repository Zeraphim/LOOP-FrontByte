import React, { Component } from "react";
import user_data from "../assets/user_data.json";

const RecommendationComponent = (props) => {
  let items = [];
  for (let i = 0; i < user_data.to_visit.length; i++) {
    items.push(<RecommendedItem data={user_data.to_visit[i]} />);
  }
  return (
    <div className="flex flex-col space-y-2 no-scrollbar overflow-y-auto flex-nowrap">
      {items}
    </div>
  );
};

const RecommendedItem = (props) => {
  return (
    <div className="flex flex-row space-x-3 py-2 items-center">
      <div className="flex-none">
        <ImageComponent src={props.data.image} />
      </div>
      <div className="flex flex-col" style={{ flexGrow: 1 }}>
        <div className="font-light text-xs">{props.data.category}</div>
        <div className="font-number font-semibold text-sm flex-none">
          {props.data.name}
        </div>
        <div className="font-light text-xs">{props.data.location}</div>
      </div>
      <div className="bg-rose-400 px-5 rounded-full py-1 flex-none">
        <div className="font-number text-white font-semibold">
          {props.data.rating}
        </div>
      </div>
    </div>
  );
};

const ImageComponent = (props) => {
  console.log(props.src);
  if (props.src != "") {
    return (
      <img
        src={props.src}
        style={{ height: "50px", width: "50px", objectFit: "cover" }}
      />
    );
  } else
    return (
      <div className="bg-gray-400" style={{ height: "50px", width: "50px" }} />
    );
};
export default RecommendationComponent;
