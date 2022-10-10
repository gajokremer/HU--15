import Link from "next/link";
import React from "react";

export default function other() {
  return (
    <div>
      <h1>Other</h1>
      <Link href={"/"}>
        <a>Back</a>
      </Link>
    </div>
  );
}
