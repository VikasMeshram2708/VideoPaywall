"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EllipsisVertical, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfilePage() {
  const { data } = useSession();
  const [userData, setUserData] = useState<FetchedUser | null>(null);

  const fetchUserDetails = useCallback(async () => {
    const res = await fetch("/api/user/me");
    if (!res.ok) {
      return null;
    }
    const result = await res.json();
    setUserData(result?.data);
  }, []);

  useEffect(() => {
    if (data) {
      fetchUserDetails();
    }
  }, [data, fetchUserDetails]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      {/* <p>{JSON.stringify(userData)}</p> */}
      <Card className="w-full max-w-xl mx-auto shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="capitalize">
                  {userData?.user?.name}
                </CardTitle>
                <CardDescription>{userData?.user?.email}</CardDescription>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardFooter>
          <Button
            variant={"destructive"}
            type="button"
            onClick={() => signOut()}
          >
            <LogOut />
            <span>Logout</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
