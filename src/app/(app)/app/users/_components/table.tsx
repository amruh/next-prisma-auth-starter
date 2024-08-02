import React from "react";
import { Badge } from "@/components/ui/badge";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import EditUserDialog from "./edit-dialog";
import { DeleteUserButton, EditUserButton } from "./buttons";
import DeleteUserAlert from "./delete-alert";
import { getUserData } from "@/data/user";

export default async function UsersTable() {
  const users = await getUserData();

  return (
    <>
      <div className="overflow-x-auto rounded-lg border">
        <table className="bg-zinc w-full text-left text-sm text-gray-500 rtl:text-right">
          <thead className="bg-zinc-100 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.length == 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-3 text-center">
                  No data found
                </td>
              </tr>
            )}
            {users?.map((user) => (
              <tr key={user.id}>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {user.name}
                </th>
                <td className="flex items-center gap-x-2 px-6 py-4">
                  <EnvelopeClosedIcon className="size-4" /> {user.email}
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline">{user.role}</Badge>
                </td>
                <td className="flex gap-x-2 px-6 py-4">
                  <EditUserButton user={user} />
                  <DeleteUserButton user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditUserDialog />
      <DeleteUserAlert />
    </>
  );
}
