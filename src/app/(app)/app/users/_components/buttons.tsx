"use client";

import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

export function EditUserButton({ user }: { user: User }) {
  const onEditClick = useUserStore((state) => state.onEditClick);

  return (
    <Button variant="outline" size="icon" onClick={() => onEditClick(user)}>
      <Pencil2Icon className="size-4" />
    </Button>
  );
}

export function DeleteUserButton({ user }: { user: User }) {
  const onDeleteClick = useUserStore((state) => state.onDeleteClick);

  return (
    <Button variant="outline" size="icon" onClick={() => onDeleteClick(user)}>
      <TrashIcon className="size-4" />
    </Button>
  );
}
