/** @format */
import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const LOGIN = async () => {
    signInWithPopup(auth, provider).catch((err) => alert(err));
  };
  return (
    <div className="bg-black relative h-screen">
      <div className="absolute top-[35%] left-[42%] items-center">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo.png"
          className="h-10 justify-center text-center mb-5 ml-[60px]"
          alt=""
        />
        <button
          className="text-white font-bold hover:text-[#2bc4ff]"
          onClick={LOGIN}
        >
          Login To Start Tweeting
        </button>
      </div>
    </div>
  );
}

export default Login;
