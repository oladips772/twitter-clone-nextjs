/** @format */
import React, { useState, useRef, useEffect } from "react";
import {
  SparklesIcon,
  GlobeIcon,
  PhotographIcon,
  EmojiHappyIcon,
  CalendarIcon,
  ChartBarIcon,
  LocationMarkerIcon,
  HashtagIcon,
  XIcon,
} from "@heroicons/react/outline";
import Post from "../shared/Post";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { auth, db, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, uploadString, ref } from "firebase/storage";
import Image from "next/image";

function Posts() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const docRef = collection(db, "posts");
    const Queried = query(docRef, orderBy("timestamp", "desc"));
    onSnapshot(Queried, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // ? selecting a file for post
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  // ? adding emojis to input
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  // ? sendto post function.
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      postText: input,
      userName: user.displayName,
      userEmail: user.email,
      userImg: user.photoURL,
      timestamp: serverTimestamp(),
    });

    if (selectedFile) {
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setShowEmojis(false);
    setSelectedFile(null);
    setLoading(null);
  };

  return (
    <div className="pt-2">
      {/* posts header */}
      <div className="flex justify-between items-center h-12 fixed top-0 w-[46.72%] bg-black z-50">
        <h2 className="text-white text-lg font-bold ml-2">Home</h2>
        <SparklesIcon className="h-6 text-[#2bc4ff] cursor-pointer mr-2" />
      </div>
      {/* tweeting div */}
      <div className={`mt-12 mx-2 flex ${loading && "opacity-60"}`}>
        <img
          alt=""
          src={user.photoURL}
          className=" h-12 w-12 rounded-full object-contain mr-2"
        />{" "}
        {/* tweeting input div */}
        <div className="flex-1">
          <div className="w-full">
            <textarea
              disabled={loading}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Whats happening ?"
              className="max-h-[40px] w-[550px] bg-black text-white outline-none border-none resize-none"
            />
            {/* selectdeFile div */}
            {selectedFile && (
              <div className="relative">
                {!loading && (
                  <XIcon
                    className="h-6 text-white font-bold cursor-pointer absolute top-3 left-2 hover:bg-gray-600 rounded-full"
                    onClick={() => setSelectedFile(null)}
                  />
                )}
                <Image
                  src={selectedFile}
                  alt=""
                  className="max-h-[300px] rounded-2xl mb-1"
                />
              </div>
            )}
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-[#526369] rounded-2xl w-[170px] p-1 mb-1">
              {!loading && <GlobeIcon className="text-[#2bc4ff] h-5" />}
              <p className="text-[#2bc4ff] text-sm font-bold">
                {!loading ? "Everyone can reply" : "uploading..."}
              </p>
            </div>
          </div>
          {/* all buttons div */}
          {!loading && (
            <div className="flex items-center space-x-2 border-t mt-2 pt-2 -mb-2 relative">
              <div className="flex items-center space-x-3 flex-1">
                <PhotographIcon
                  className="h-6 cursor-pointer text-[#2bc4ff]"
                  onClick={() => filePickerRef.current.click()}
                />
                <EmojiHappyIcon
                  className="h-6 cursor-pointer text-[#2bc4ff]"
                  onClick={() => setShowEmojis(!showEmojis)}
                />
                <CalendarIcon className="h-6 cursor-pointer text-[#2bc4ff]" />
                <ChartBarIcon className="h-6 cursor-pointer text-[#2bc4ff] rotate-90" />
                <HashtagIcon className="h-6 cursor-pointer text-[#2bc4ff]" />
                <LocationMarkerIcon className="h-6 w-6 cursor-pointer text-[#2bc4ff]" />
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  onChange={addImageToPost}
                />
              </div>

              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
              <button
                onClick={sendPost}
                className="text-white p-1 rounded-2xl bg-[#2bc4ff] w-[80px] font-bold disabled:cursor-default disabled:bg-[#0a435a]"
                disabled={!input.trim() && !selectedFile}
              >
                Tweet
              </button>
            </div>
          )}
        </div>
      </div>
      {/* end of of tweeing div */}
      {/* show all 120 tweets */}
      <div className="mt-4 border-t pt-2 flex justify-center items-center">
        <h4 className="text-[#2bc4ff] cursor-pointer pb-2">Show 120 Tweets</h4>
      </div>
      {/* end of all posts header */}
      <div>
        {posts.map(
          ({
            id,
            data: { postText, userName, userEmail, image, userImg, timestamp },
          }) => (
            <Post
              key={id}
              postText={postText}
              userEmail={userEmail}
              userName={userName}
              postImage={image}
              userImg={userImg}
              timestamp={timestamp}
              id={id}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Posts;
