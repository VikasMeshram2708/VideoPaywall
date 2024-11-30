"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/user/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
