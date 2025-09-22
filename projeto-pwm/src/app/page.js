import Image from "next/image";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PlaylistManager from "../components/PlaylistManager"; 

export default function Home() {
  return (
    <>
      
      <Navbar/>
      <Hero/>

      <PlaylistManager />

      <p>Sejam bem vindos ao nosso site</p>
      
    </>
  );
}
