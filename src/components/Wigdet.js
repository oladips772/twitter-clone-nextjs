/** @format */
import React from "react";
import { data } from "../shared/widgetData";
import {
  SearchIcon,
  CogIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

function Wigdet() {
  return (
    <div className="fixed top-5 w-[370px]">
      {/* header div */}
      <div className="flex items-center space-x-4 p-2 rounded-3xl bg-[#98b0be4f] mb-6">
        <SearchIcon className="h-5 w-5 text-gray-300" />
        <h3 className="text-gray-300">Search Twitter</h3>
      </div>
      {/* second div */}
      <div className="bg-[#98b0be4f] rounded-2xl overflow-hidden">
        <div className="flex items-center space-x-4 justify-between p-2 mb-4">
          <h3 className="text-white font-bold text-lg">Trends For You</h3>
          <CogIcon className="h-7 w-7 text-gray-300 cursor-pointer" />
        </div>
        <div className="">
          {data.map((item, index) => (
            <div
              className="my-4 cursor-pointer hover:bg-[#383e44f3]"
              key={index}
            >
              <div className="flex items-center justify-between mx-2">
                <p className="text-sm text-gray-300">{item.info}</p>
                <DotsHorizontalIcon className="w-6 h-6 text-gray-300" />
              </div>
              <h2 className="font-bold text-white text-lg mx-2">
                {item.title}
              </h2>
              <p className="text-gray-300 text-sm mx-2">{item.tweet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wigdet;
