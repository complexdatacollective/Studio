"use client";

import React from "react";
import { signout } from "~/actions/auth";

const SignOutBtn = () => {
  return (
    <button
      onClick={async () => {
        console.log("signing out");
        await signout();
      }}
      className="p-2 border border-emerald-400"
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
