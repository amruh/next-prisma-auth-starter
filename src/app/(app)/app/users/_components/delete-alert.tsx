"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUserStore } from "@/app/store/userStore";
import { useTransition } from "react";
import { deleteUser } from "@/actions/user";
import { toast } from "sonner";

export default function DeleteUserAlert() {
  const [processing, startTransition] = useTransition();
  const isAlertOpen = useUserStore((state) => state.isAlertOpen);
  const setIsAlertOpen = useUserStore((state) => state.setIsAlertOpen);
  const user = useUserStore((state) => state.user);

  const deleteHandler = async () => {
    startTransition(() => {
      toast.loading("Deleting data...", { id: user?.id });
      deleteUser(user?.id!)
        .then((data) => {
          toast.dismiss(user?.id);
          if (data?.error) {
            toast.error(data.error);
          } else {
            toast.success("Data deleted successfully");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsAlertOpen(false));
    });
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="font-bold">{user?.name}</span> account and remove
            data from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={processing}
            onClick={() => setIsAlertOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            disabled={processing}
            onClick={deleteHandler}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
