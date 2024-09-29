import db from "~/@/lib/db";
import { Cred, LoginForm } from "~/@/lib/types";

import bcryptjs from "bcryptjs";

export async function login(
  email: string,
  password: string
): Promise<Cred | null> {
  console.log("logging in user");
  const user = await db.cred.get(email);
  if (!user) return null;
  // const isCorrectPassword = true;
  const isCorrectPassword = await bcryptjs.compare(password, user.passwordHash);
  if (!isCorrectPassword) {
    console.log("password incorrect");
    return null;
  }
  return user;
}

export async function register({
  email,
  password,
}: LoginForm): Promise<{ status: "ok" } | { status: "error"; error: string }> {
  console.log("registering user", email, password);

  const passwordHash = await bcryptjs.hash(password, 10);
  try {
    await db.cred.create({
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
      userId:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    });
    return { status: "ok" };
  } catch (error) {
    console.log("Error", error);
    return { status: "error", error: JSON.stringify(error) || "Error" };
  }
}
