// import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ReferenceBar from "../components/ReferenceBar";
import Schedule from "../components/Schedule";

export default function Home() {
  const username = "pipocast";

  return (
    <div>
      <Header></Header>
      {/* <ReferenceBar name={"Gabriel Kremer"} role={"Student"}></ReferenceBar> */}
      <Schedule today={new Date()} username={username}></Schedule>
    </div>
  );
}
