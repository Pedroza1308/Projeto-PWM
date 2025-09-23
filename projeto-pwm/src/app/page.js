// src/app/page.js
import Image from "next/image";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import PlaylistManager from "../components/PlaylistManager"; 

export default function Home() {
  return (
    <>
      <Navbar/>
      
      <section id="inicio">
        <Hero/>
      </section>

      <section id="about">
        <About/>
      </section>

      <section id="criar">
        <PlaylistManager />
      </section>
      
    </>
  );
}
