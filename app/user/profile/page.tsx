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
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchUserQuery } from "@/app/store/user/userSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const ProfileLoader = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl mx-auto shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="grid gap-2">
                <Skeleton className="w-36 h-5" />
                <Skeleton className="w-36 h-5" />
              </div>
            </div>
            <Skeleton className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardFooter>
          <Skeleton className="w-56 h-10" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default function ProfilePage() {
  const { data: userData, isLoading, error } = useFetchUserQuery();
  const [err, setErr] = useState<{ status: number; data: unknown }>({
    status: 400,
    data: "",
  });

  useEffect(() => {
    if (error) {
      setErr({ data: error, status: 400 });
    }
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      {error && <p>Error : {err.data as string}</p>}
      {isLoading ? (
        <ProfileLoader />
      ) : (
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
                  <Button variant="ghost">
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
              variant="destructive"
              type="button"
              onClick={() => signOut()}
            >
              <LogOut />
              <span>Logout</span>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
