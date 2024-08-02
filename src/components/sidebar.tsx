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
    <aside className="flex flex-col gap-y-5 p-4 text-sm">
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="flex flex-col space-y-2">
        {ROUTES.filter((item) => item.roles.includes(data?.user.role!)).map(
          ({ Icon, ...route }) => (
            <Link
              href={route.path}
              key={route.name}
              className={cn(
                "flex items-center gap-x-2 border border-transparent px-3 py-2 text-zinc-500 transition hover:rounded-md hover:bg-white/50 hover:text-zinc-800",
                {
                  "rounded-md border border-zinc-200 bg-white/70 text-zinc-800 shadow-sm":
                    pathname === route.path,
                },
              )}
            >
              <Icon />
              {route.name}
            </Link>
          ),
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
