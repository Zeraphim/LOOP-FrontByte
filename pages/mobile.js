import Head from "next/head";
import { Redirect } from "react-router-dom";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { NextApiRequest, NextApiResponses } from "next";

import { useRef, useState } from "react";
import VouchedComponent from "../components/VouchedComponent";
import RecommendationComponent from "../components/RecommendationComponent";
import ProposedComponent from "../components/ProposedComponent";
import ModalComponent from "../components/ModalComponent";

export default function Mobile() {
  const [modal, setModal] = useState(<></>);
  const [modalOpen, setOpen] = useState(false);

  function changeModal(e) {
    const input = e.target.id;
    let split = input.split("/");
    setModal(
      <ModalComponent data={split[1]} type={split[0]} closeModal={closeModal} />
    );
    setOpen(true);
  }

  function closeModal() {
    setModal(<></>);
    setOpen(false);
  }
  return (
    <div className="relative">
      {modalOpen ? modal : <></>}
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 pb-8 flex flex-row items-center">
        <div className="mx-5 flex flex-col" style={{ flexGrow: 1 }}>
          <div className="font-light text-xs mt-5 text-white">
            Current Location
          </div>
          <div className="font-bold font-number text-md text-white">
            Imus, Cavite
          </div>
        </div>
        <div className="mx-5 mt-5">
          <img src="/loop.png" style={{ maxWidth: "50px" }} />
        </div>
      </div>
      <div className="mx-5 p-3 bg-white mt-3 rounded shadow-md text-gray-500 -mt-5">
        Where do you want to go today?
      </div>
      <div>
        <div className="mx-5 font-number font-semibold text-xl mt-5">
          Things you're excited for
        </div>
        <div className="mx-5 font-light text-sm text-gray-500">
          You've vouched for these soon-to-be businesses. Make sure to check
          back once they're open!
        </div>
        <div className="mt-3">
          <VouchedComponent changeModal={changeModal} />
        </div>
      </div>
      <div className="px-5 py-3 bg-white mb-5">
        <div className="font-number font-semibold text-xl">
          Places to visit on your next trip
        </div>
        <div className="font-light text-sm text-gray-500">
          Check out some of the most visited destinations in your area.
        </div>
        <div className="mt-3 mb-3">
          <RecommendationComponent changeModal={changeModal} />
        </div>
        <div className="text-center text-sm">See more</div>
      </div>
      <div>
        <div className="px-5 font-number font-semibold text-xl">
          Proposed Businesses
        </div>
        <div className="px-5 font-light text-sm text-gray-500">
          Help prospective businesses gauge public demand and earn rewards when
          they open{" "}
        </div>
        <div className="mt-3 mb-3">
          <ProposedComponent />
        </div>
      </div>
    </div>
  );
}