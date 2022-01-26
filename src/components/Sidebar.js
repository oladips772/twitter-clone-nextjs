/** @format */
import React from "react";
import {
  HashtagIcon,
  ChatAltIcon,
  BellIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
    DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import SidebarOption from "../shared/SidebarOption";

function Sidebar() {
  return (
    <div>
      <img
        src="https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo.png"
        alt=""
        className="h-6 cursor-pointer mb-6"
      />
      <div className="space-y-4">
        <SidebarOption text="Home" Icon={HomeIcon} color="#2bc4ff" />
        <SidebarOption text="Explore" Icon={HashtagIcon} color="#2bc4ff" />
        <SidebarOption text="Messages" Icon={ChatAltIcon} color="#2bc4ff" />
        <SidebarOption text="Notifications" Icon={BellIcon} color="#2bc4ff" />
        <SidebarOption text="Bookmarks" Icon={BookmarkIcon} color="#2bc4ff" />
        <SidebarOption text="Lists" Icon={ClipboardListIcon} color="#2bc4ff" />
        <SidebarOption text="Profile" Icon={UserIcon} color="#2bc4ff" />
        <SidebarOption
          text="More"
          Icon={DotsCircleHorizontalIcon}
          color="#00acee"
        />
      </div>
      <button className="text-white bg-[#00acee] mt-6 p-2 rounded-3xl w-[160px] cursor-pointer">
        Tweet
      </button>
      <div className="mt-6 items-center flex">
        <img
          alt
          src="https://media-exp1.licdn.com/dms/image/C4E03AQFOfPu93n6Kxw/profile-displayphoto-shrink_100_100/0/1632301101571?e=1648684800&v=beta&t=ixFggKFL60XV1npTtrk9PQnKH6ApktyZ-XF1n3mxF_4"
          className=" h-8 w-8 rounded-full object-contain mr-2"
        />
        <div>
          <h4 className="text-white text-sm font-bold">Oladipupo akorede</h4>
          <p className="text-gray-200 text-sm">oladips200@gmail.com</p>
        </div>
        <DotsHorizontalIcon className="text-[#2bc4ff] h-5 ml-4"/>
      </div>
    </div>
  );
}

export default Sidebar;