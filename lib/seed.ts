import prisma from "./prismaInstance";
import bcrypt from "bcryptjs";

const seed = async () => {
  const password = "test1";

  const pwHash = await bcrypt.hash(password, 10);

  const data = {
    name: "test1",
    email: "test1@gmail.com",
    avatar_url: "",
    isPrime: false,
    password: pwHash,
  };

  const user = await prisma.user.create({
    data,
  });
  return user;
};

seed();
