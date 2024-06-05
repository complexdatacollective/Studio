"use client";

import React from "react";
import { signout } from "~/actions/auth";
import { Button } from "~/components/ui/button";

const SignOutBtn = () => {
  return (
    <Button
      onClick={async () => {
        console.log("signing out");
        await signout();
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
