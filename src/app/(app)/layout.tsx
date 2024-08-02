import { auth } from "@/auth";
import Sidebar from "@/components/sidebar";
import { SessionProvider } from "next-auth/react";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="grid h-full bg-zinc-100 md:grid-cols-[200px_auto] md:grid-rows-[100%]">
        <Sidebar />
        <main className="m-2 overflow-x-auto rounded-xl border border-zinc-200 bg-white px-8 py-6">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
