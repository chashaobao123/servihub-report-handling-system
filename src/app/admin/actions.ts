"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";
import { prisma } from "../../../prisma/client"

const loginSchema = z.object({
  id: z.coerce.bigint(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
});

export type LoginState =
  | {
      errors: {
        id?: string[];
        email?: string[];
      };
    }
  | undefined;

  export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
    const result = loginSchema.safeParse(Object.fromEntries(formData));
  
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
  
    const { id, email } = result.data;
  
    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
      },
    });
  
    if (!user || user.role !== "admin") {
      return {
        errors: {
          email: ["Invalid credentials or not an admin"],
        },
      };
    }
  
    await createSession(user.id.toString()); // ⚠️ convert BigInt to string
    redirect("/admin/dashboard");
  }
  
  export async function logout() {
    await deleteSession();
    redirect("/admin");
  }
  