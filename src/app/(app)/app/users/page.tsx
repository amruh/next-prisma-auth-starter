import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { EnvelopeClosedIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

export default async function UsersPage() {
  const users = await db.user.findMany({});
  
  return (
    <div>
      <h1 className="font-bold text-lg mb-3">Users List</h1>

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
                <td className="px-6 py-4 flex items-center gap-x-2"><EnvelopeClosedIcon className="size-4" /> {user.email}</td>
                <td className="px-6 py-4">
                  <Badge variant="outline">{user.role}</Badge>
                </td>
                <td className="px-6 py-4 flex gap-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    // onClick={() => onEditClick(alt)}
                  >
                    <Pencil2Icon className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    // onClick={() => onDeleteClick(alt)}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
