// NavBarWrapper.tsx
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import NavBar from "./NavBar";

export default async function NavBarWrapper() {
  const session = await decrypt((await cookies()).get("session")?.value);
  const isLoggedIn = !!session?.userId;

  return <NavBar isLoggedIn={isLoggedIn} />;
}
