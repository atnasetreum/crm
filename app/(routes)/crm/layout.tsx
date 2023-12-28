import { redirect } from "next/navigation";

import { auth } from "@app/auth.config";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <>
      Navbar
      <main>{children}</main>
      Footer
    </>
  );
}
