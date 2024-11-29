"use client";

import { loginSchema } from "@/app/models/UserSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignIn: SubmitHandler<loginSchema> = async (data) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log("res", res);
      if (!res) {
        return toast.error("An Error Occurred.Login Failed");
      }

      reset();
      toast.success("User Logged In");
      return router.push("/");
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
            {isLoading ? "Processing..." : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-2"
            onSubmit={handleSubmit(handleSignIn)}
            action=""
          >
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
              {isLoading ? "Processing..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Not an User ? <Link href="/user/signup">Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
