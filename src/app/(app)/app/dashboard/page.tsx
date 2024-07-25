import { auth } from "@/auth";
import H1 from "@/components/h1";
import { checkRole } from "@/lib/server-utils";

export default async function DashboardPage() {
  const data = await auth();

  return (
    <div>
      <H1>Dashboard</H1>
      <p>Hello, {data?.user.name}</p>
      {checkRole(data, "ADMIN") && <h1>Admin</h1>}
    </div>
  );
}
