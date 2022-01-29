/** @format */
import React from "react";

function SidebarOption({ Icon, text, color }) {
  return (
    <div className="flex items-center space-x-4 cursor-pointer p-1 rounded-2xl hover:bg-slate-800">
      {Icon && <Icon style={{ color: color }} className="h-7 cursor-pointer" />}
      <p className="text-white hidden lg:block">{text}</p>
    </div>
  );
}

export default SidebarOption;
