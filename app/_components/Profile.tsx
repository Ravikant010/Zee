"use client";
import React from "react";
import AvatarCP from "./avatar";
import { useUser } from "@clerk/nextjs";
type Props = {};

export default function Profile({}: Props) {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="flex items-center justify-start w-full p-2 space-x-4">
      <AvatarCP
        imageUrl={user?.imageUrl as string}
        fullName={user?.fullName as string}
        firstName={user?.firstName as string}
      />

      <h1>{user?.firstName}</h1>
    </div>
  );
}
