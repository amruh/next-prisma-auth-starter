"use client";

import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { AvatarIcon, DashboardIcon, PersonIcon } from "@radix-ui/react-icons";
import Logo from "./logo";

const ROUTES = [
  {
    name: "Dashboard",
    roles: ["ADMIN", "USER"],
    path: "/app/dashboard",
    Icon: DashboardIcon,
  },
  {
    name: "Profile",
    roles: ["ADMIN", "USER"],
    path: "/app/profile",
    Icon: AvatarIcon,
  },
  {
    name: "Users",
    roles: ["ADMIN"],
    path: "/app/users",
    Icon: PersonIcon,
  },
];

export default function Sidebar() {
  const { data } = useSession();
  const pathname = usePathname();

  return (
    <aside className="p-4 text-sm flex flex-col gap-y-5">
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="space-y-2 flex flex-col">
        {ROUTES.filter((item) => item.roles.includes(data?.user.role!)).map(
          ({ Icon, ...route }) => (
            <Link
              href={route.path}
              key={route.name}
              className={cn(
                "px-3 py-2 flex items-center gap-x-2 text-zinc-500 border border-transparent hover:text-zinc-800 hover:bg-white/50 hover:rounded-md transition",
                {
                  "bg-white/70 rounded-md border border-zinc-200 shadow-sm text-zinc-800":
                    pathname === route.path,
                }
              )}
            >
              <Icon />
              {route.name}
            </Link>
          )
        )}
      </div>
      <Button
        className="mt-auto shadow-xl"
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </Button>
    </aside>
  );
}
