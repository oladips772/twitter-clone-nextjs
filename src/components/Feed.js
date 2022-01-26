/** @format */
import React from "react";
import Sidebar from "./Sidebar";

function Feed() {
  return (
    <div className="grid grid-cols-4 max-w-7xl mx-auto ">
      <section className="col-span-1 fixed top-5 h-full pr-1">
        <Sidebar />
      </section>
      <section className="col-span-2 bg-blue-300 border-l border-r h-full ml-[250px] w-full">
        <h1>middle</h1>
      </section>
      <section className="bg-green-400 col-span-1 ml-[290px] w-full">
        <h1>right</h1>
      </section>
    </div>
  );
}

export default Feed;
