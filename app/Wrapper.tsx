"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export const Wrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
};
