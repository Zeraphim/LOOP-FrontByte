import React, { Component } from "react";

const Home = (props) => {
  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <a
        href="/mobile"
        className="col-span-1 text-center bg-gray-800 text-white flex items-center justify-center flex-col"
      >
        <h1 className="font-number text-2xl font-bold">Enter mobile UI</h1>
        <p>This view is intended to be viewed on the phone.</p>
      </a>
      <a
        href="/dashboard"
        className="col-span-1 text-center bg-blue-300 flex items-center justify-center flex-col"
      >
        <h1 className="font-number text-2xl font-bold">Enter dashboard UI</h1>
        <p>This view showcases LOOP's dashboard UI, intended for desktops.</p>
      </a>
    </div>
  );
};

export default Home;
