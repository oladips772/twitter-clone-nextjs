/** @format */
import React from "react";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
import Wigdet from "./Wigdet";

function Feed() {
  return (
    <div className="grid grid-cols-4 max-w-7xl mx-auto h-[100vh]">
      <section className="col-span-1 fixed top-5 pr-1 sm:hidden lg:block">
        <Sidebar />
      </section>
      <section className="col-span-2 border-l border-r ml-[250px] w-full">
        <Posts />
      </section>
      <section className="col-span-1 ml-[290px] w-full sm:hidden lg:block">
        <Wigdet />
      </section>
    </div>
  );
}

export default Feed;
