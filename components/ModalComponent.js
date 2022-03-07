import React, { Component } from "react";
import user_data from "../assets/user_data.json";

const ModalComponent = (props) => {
  return (
    <div
      className="fixed bg-gray-100 px-2"
      style={{ height: "100vh", width: "100vw", overflowY: "scroll" }}
    >
      <div className="bg-gray-100 rounded-t px-5 py-3">
        <DisplayContent
          data={user_data[props.type][props.data]}
          type={props.type}
          closeModal={props.closeModal}
        />
      </div>
    </div>
  );
};

const DisplayContent = (props) => {
  if (props.type == "vouched")
    return (
      <div className="flex flex-col">
        <button
          className="flex flex-row mb-2"
          onClick={props.closeModal}
          id="close/close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ pointerEvents: "none" }}
          >
            <path
              d="M10 19L3 12M3 12L10 5M3 12L21 12"
              stroke="#111827"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div className="flex flex-row items-center">
          <div className="flex flex-col" style={{ flexGrow: 1 }}>
            <div className="flex flex-row font-light text-xs">
              Coming Soon | {props.data.category}
            </div>
            <h1 className="text-xl font-number font-bold">{props.data.name}</h1>
            <h3 className="text-sm font-light">{props.data.location}</h3>
          </div>
          <div className="flex flex-col">
            <h5 className="text-xs font-light">Est. opening</h5>
            <h4 className="font-number text-sm font-bold">
              {props.data.opening}
            </h4>
            <h5 className="text-xs font-light mt-2">Users interested</h5>
            <h4 className="font-number text-sm font-bold">
              {props.data.interested}
            </h4>
          </div>
        </div>
        <div className="mt-2 p-3 flex flex-col bg-blue-900 rounded-md">
          <h4 className="font-number font-bold text-white text-sm">
            You've vouched for this business.
          </h4>
          <p className="text-white text-xs">{props.data.reward}</p>
        </div>
        {props.data.hiring ? (
          <div className="mt-2 p-3 flex flex-row bg-rose-400 rounded-md items-center">
            <div className="flex flex-col" style={{ flexGrow: 1 }}>
              <h4 className="font-number font-bold text-white text-sm">
                This business is hiring.
              </h4>
              <p className="text-white text-xs">
                Interested? Tap the contact button to hit up the owners in the
                proper avenues.
              </p>
            </div>
            <div className="rounded-full bg-white text-rose-400 px-4 py-1 flex-none">
              Contact
            </div>
          </div>
        ) : (
          <></>
        )}
        {props.data.products.length > 0 ? displayItems(props.data) : <></>}
        {props.data.menu.length > 0 ? displayMenu(props.data) : <></>}
        <div></div>
      </div>
    );
  else if (props.type == "to_visit")
    return (
      <div className="flex flex-col">
        <button
          className="flex flex-row mb-2"
          onClick={props.closeModal}
          id="close/close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ pointerEvents: "none" }}
          >
            <path
              d="M10 19L3 12M3 12L10 5M3 12L21 12"
              stroke="#111827"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div className="flex flex-row items-center">
          <div className="flex flex-col" style={{ flexGrow: 1 }}>
            <div className="flex flex-row font-light text-xs">
              {props.data.category}
            </div>
            <h1 className="text-xl font-number font-bold">{props.data.name}</h1>
            <h3 className="text-sm font-light">{props.data.location}</h3>
          </div>
          <div className="flex flex-col">
            <h5 className="text-xs font-light">User rating</h5>
            <h4 className="font-number text-sm font-bold">
              {props.data.rating}
            </h4>
          </div>
        </div>
        {props.data.hiring ? (
          <div className="mt-2 p-3 flex flex-row bg-rose-400 rounded-md items-center">
            <div className="flex flex-col" style={{ flexGrow: 1 }}>
              <h4 className="font-number font-bold text-white text-sm">
                This business is hiring.
              </h4>
              <p className="text-white text-xs">
                Interested? Tap the contact button to hit up the owners in the
                proper avenues.
              </p>
            </div>
            <div className="rounded-full bg-white text-rose-400 px-4 py-1 flex-none">
              Contact
            </div>
          </div>
        ) : (
          <></>
        )}
        {props.data.products.length > 0 ? displayItems(props.data) : <></>}
        {props.data.menu.length > 0 ? displayMenu(props.data) : <></>}
        <div></div>
      </div>
    );
};

function displayMenu(data) {
  console.log("Data: ", data.menu[0]);
  let contentGroup = [];

  for (let h = 0; h < data.menu.length; h++) {
    let content = [];
    for (let i = 0; i < data.menu[h].items.length; i++) {
      content.push(
        <div className="p-2 flex flex-col bg-white rounded shadow">
          <ImageComponent src={data.menu[h].items[i].image} />
          <h4 className="font-number font-semibold text-md">
            {data.menu[h].items[i].item_name}
          </h4>
          <h5 className="text-xs mt-2">Price</h5>
          <h5 className="text-sm font-number font-bold">
            {data.menu[h].items[i].price}
          </h5>
        </div>
      );
    }
    let entry = (
      <div className="flex flex-col mb-3 mt-2">
        <h3 className="font-number font-semibold text-md">
          {data.menu[h].name}
        </h3>
        <div
          className="mt-2 grid grid-cols-2 
                   grid-flow-row gap-4 auto-rows-auto"
        >
          {content}
        </div>
      </div>
    );
    contentGroup.push(entry);
  }
  return (
    <>
      <div className="font-number text-lg font-semibold mt-3">Menu</div>
      {contentGroup}
    </>
  );
}

function displayItems(data) {
  let content = [];
  if (data.products[0] != undefined) {
    for (let i = 0; i < data.products.length; i++) {
      content.push(
        <div className="p-2 flex flex-col bg-white rounded shadow">
          <ImageComponent src={data.products[i].image} />
          <h4 className="font-number font-semibold text-md">
            {data.products[i].name}
          </h4>
          <h5 className="text-xs mt-2">Price</h5>
          <h5 className="text-sm font-number font-bold">
            {data.products[i].price}
          </h5>
        </div>
      );
    }
    return (
      <>
        <div className="font-number text-lg font-semibold mt-3">Products</div>
        <div
          className="mt-2 grid grid-cols-2 
                     grid-flow-row gap-4 auto-rows-auto"
        >
          {content}
        </div>
      </>
    );
  }
}

const ImageComponent = (props) => {
  console.log(props.src);
  if (props.src != "") {
    return (
      <img src={props.src} style={{ height: "100px", objectFit: "cover" }} />
    );
  } else
    return (
      <div
        className="bg-gray-400"
        style={{ height: "100px", minWidth: "100px" }}
      />
    );
};

export default ModalComponent;
