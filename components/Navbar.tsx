"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data, status } = useSession();

  if (!data) {
    return (
      <header className="w-full border-b p-2 shadow">
        <nav className="container mx-auto flex items-center justify-between">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            <Link href="/">Vide Paywall</Link>
          </h1>
          <div className="flex items-center gap-2">
            {status === "loading" ? (
              <p>processing...</p>
            ) : (
              <Button type="button">
                <Link href="/user/login">Login / Sign Up</Link>
              </Button>
            )}
            <ModeToggle />
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="w-full border-b p-2 shadow">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Vide Paywall</Link>
        </h1>
        <div className="flex items-center gap-2">
          {status === "authenticated" && (
            <Button
              onClick={() => signOut()}
              variant={"destructive"}
              type="button"
            >
              <LogOut />
              <span>Logout</span>
            </Button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
