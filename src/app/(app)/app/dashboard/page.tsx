import { auth } from "@/auth";
import { checkRole } from "@/lib/server-utils";

export default async function DashboardPage() {
  const data = await auth();

  return (
    <div>
      <h1 className="font-bold text-lg">Dashboard</h1>
      <p>Hello, {data?.user.name}</p>
      {checkRole(data, "ADMIN") && <h1>Admin</h1>}
    </div>
  );
}
