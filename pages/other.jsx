import Link from "next/link";
import React from "react";
import ProfileBar from "../components/ProfileBar";

export default function other() {
  return (
    <div>
      <ProfileBar>
        <h1>Other</h1>
        <Link href={"/"}>
          <a>Back</a>
        </Link>
      </ProfileBar>
    </div>
  );
}
