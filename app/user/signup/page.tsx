"use client";

import { signUpSchema } from "@/app/models/UserSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp: SubmitHandler<signUpSchema> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        return toast.error(
          result?.message || "An Error Occurred. Sign Up Failed"
        );
      }
      reset();
      toast.success(result?.message || "User Signed Up Successfully");
      return redirect("/user/login");
    } catch (error) {
      console.error(`Something went wrong. Please try again. ${error}`);
      return toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Card className="container max-w-xl shadow mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            {isLoading ? "Processing..." : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-2" onSubmit={handleSubmit(handleSignUp)}>
            <div>
              <Input
                {...register("name")}
                type="text"
                placeholder="Type Name"
              />
              {errors?.name && (
                <span className="text-sm text-red-500 font-bold">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Type Email"
              />
              {errors?.email && (
                <span className="text-sm text-red-500 font-bold">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Type Password"
              />
              {errors?.password && (
                <span className="text-sm text-red-500 font-bold">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Processing..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            ALready an User ? <Link href="/user/login">Login </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
