import H1 from "@/components/h1";
import { Suspense } from "react";
import UsersTable from "./_components/table";
import CreateUserDialog from "./_components/create-dialog";

export default async function UsersPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <H1>Users List</H1>
        <CreateUserDialog />
      </div>
      <Suspense key={"user-page"} fallback={"Loading..."}>
        <UsersTable />
      </Suspense>
    </>
  );
}
