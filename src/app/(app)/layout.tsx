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
      <div className="bg-zinc-100 h-full grid md:grid-cols-[200px_auto] md:grid-rows-[100%]">
        <Sidebar />
        <main className="bg-white/70 m-2 rounded-xl border border-zinc-200 px-8 py-6">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
