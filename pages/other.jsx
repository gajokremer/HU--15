import Link from "next/link";
import React from "react";
import ReferenceBar from "../components/ReferenceBar";
import styles from "../styles/Body.module.css";

export default function other() {
  return (
    <div classname={styles.information_section}>
      {/* <ReferenceBar></ReferenceBar> */}
      <h1>Other</h1>
      <Link href={"/"}>
        <a>Back</a>
      </Link>
    </div>
  );
}
