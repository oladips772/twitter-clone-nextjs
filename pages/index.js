import Head from 'next/head'
import Feed from '../src/components/Feed'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/firebase";

export default function Home() {
    const [user] = useAuthState(auth);
  return (
    <div className="h-screen bg-black">
      <Head>
        <title>Twitter Clone </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed />
    </div>
  )
}
