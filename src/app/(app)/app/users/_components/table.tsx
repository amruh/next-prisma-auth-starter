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
      <div className="relative overflow-x-auto border rounded-lg">
        <table className="w-full bg-zinc text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-zinc-100 dark:bg-gray-700 dark:text-gray-400">
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
              <tr
                key={user.id}
                className=" dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.name}
                </th>
                <td className="px-6 py-4 flex items-center gap-x-2">
                  <EnvelopeClosedIcon className="size-4" /> {user.email}
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline">{user.role}</Badge>
                </td>
                <td className="px-6 py-4 flex gap-x-2">
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
