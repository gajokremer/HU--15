import Link from "next/link";
import React from "react";
import ReferenceBar from "../components/ReferenceBar";

export default function other() {
  return (
    <div>
      <ReferenceBar></ReferenceBar>
      <h1>Other</h1>
      <Link href={"/"}>
        <a>Back</a>
      </Link>
    </div>
  );
}
