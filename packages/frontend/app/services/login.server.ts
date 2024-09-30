import db from "~/lib/db";
import { CredType } from "~/lib/types";

import bcryptjs from "bcryptjs";
import { randomId } from "~/lib/utils";

export async function login(
  email: string,
  password: string
): Promise<CredType | null> {
  console.log("trying to login");
  const user = await db.cred.get(email);
  console.log("user", user);
  if (!user) {
    console.log("no user");
    throw new Error("User not found");
    return null;
  }
  // const isCorrectPassword = true;
  const isCorrectPassword = await bcryptjs.compare(password, user.passwordHash);
  if (!isCorrectPassword) {
    console.log("password incorrect");
    throw new Error("Password incorrect");
    return null;
  }
  console.log("login success");
  return user;
}

export async function register({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ status: "ok" } | { status: "error"; error: string }> {
  console.log("registering user", email, password);

  const passwordHash = await bcryptjs.hash(password, 10);
  try {
    await db.cred.create({
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
      userId: randomId(),
    });
    return { status: "ok" };
  } catch (error) {
    console.log("Error", error);
    return { status: "error", error: JSON.stringify(error) || "Error" };
  }
}
