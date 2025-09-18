import Image from "next/image";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar/>
      <h1>Sejam bem vindos ao nosso site
        <tag></tag>
      </h1>
      <Header/>
    </>
  );
}
