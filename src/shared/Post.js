/** @format */
import React, { useState, useEffect } from "react";
import {
  HeartIcon,
  ChatIcon,
  ShareIcon,
  UploadIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Moment from "react-moment";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  onSnapshot,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";

function Post({
  postText,
  userName,
  userEmail,
  userImg,
  postImage,
  timestamp,
  id,
}) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [user] = useAuthState(auth);

  // likes useEffect function
  useEffect(() => {
    const docRef = collection(db, "posts", id, "likes");
    onSnapshot(docRef, (snapshot) => {
      setLikes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [db, id]);

  useEffect(
    () =>
      setHasLiked(likes.findIndex((likes) => likes.id === user?.uid) !== -1),
    [likes]
  );

  // likePost function
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    } else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    }
  };

  const sendComment = async () => {
    if (loading) return;
    setLoading(true);
    setComment("")
    const commentToSend = comment;
    const colRef = collection(db,"posts", id, "comments")

    await addDoc(colRef, {
      comment : commentToSend,
      username:user.displayName,
      useremail: user.email,
      userimage:user.photoURL,
    })

    setLoading(false);
    setComment("");
  }


  return (
    <div className="border-t-[0.1px] pb-4">
      <div className="flex mx-2 mt-2">
        <img
          src={userImg}
          alt=""
          className="h-11 w-11 rounded-full mr-4 object-contain"
        />
        <div>
          <div className="flex items-center text-white text-[14px]">
            <h3 className="font-bold mr-1">{userName}</h3>
            <span className="text-gray-400 hover:underline cursor-pointer text-[12px] mr-2">
              {userEmail}
            </span>
            <p className="text-[10px] text-gray-400">
              <Moment fromNow>{timestamp?.toDate()}</Moment>
            </p>
            <DotsHorizontalIcon className="flex-1 text-white h-6 -mr-[200px] cursor-pointer" />
          </div>
          <h4 className="text-white">{postText}</h4>
          {postImage && (
            <img
              src={postImage}
              alt=""
              className="max-h-[300px] rounded-xl mb-1 w-[550px] mt-2"
            />
          )}
          <div
            className={`flex justify-between mt-3 w-full ${
              !postImage && "w-[500px]"
            }`}
          >
            <div className="flex items-center">
              <ChatIcon
                className="h-6 text-green-500 cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="flex items-center">
              {hasLiked ? (
                <>
                  <HeartIconFilled
                    className="h-6 text-pink-500 cursor-pointer mr-1"
                    onClick={likePost}
                  />
                </>
              ) : (
                <>
                  <HeartIcon
                    className="h-6 text-pink-500 cursor-pointer mr-1"
                    onClick={likePost}
                  />
                </>
              )}
              {likes.length >= 1 && <p className="text-pink-500 text-[12px]">{likes.length}</p>}
            </div>
            <ShareIcon className="h-6 text-blue-500 cursor-pointer  " />
            <UploadIcon className="h-6 text-green-500 cursor-pointer  " />
          </div>
          {open && (
            <div className="mt-4">
              <div className="flex items-center justify-between w-full">
                <EmojiHappyIcon className="h-6  text-gray-50 mr-4" />
                <input
                  placeholder="add a comment"
                  value={comment}
                  className="outline-none border-none flex-1 bg-black text-white"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              {/* comments */}
              <div className="mt-4 min-h-[60px] overflow-y-scroll">
                <div className="flex items-center">
                  <img
                    src="https://media-exp1.licdn.com/dms/image/C4E03AQFOfPu93n6Kxw/profile-displayphoto-shrink_100_100/0/1632301101571?e=1648684800&v=beta&t=ixFggKFL60XV1npTtrk9PQnKH6ApktyZ-XF1n3mxF_4"
                    alt=""
                    className="h-7 w-7 rounded-full mr-2 object-contain"
                  />
                  <h5 className="text-sm font-bold text-white mr-1">
                    oladipupo akorede -{" "}
                  </h5>
                  <p className="text-sm text-white">first comment guys</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
