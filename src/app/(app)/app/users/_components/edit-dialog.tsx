"use client";

import { useUserStore } from "@/store/userStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditUserForm from "./edit-form";
import { flushSync } from "react-dom";

export default function EditUserDialog() {
  const isDialogOpen = useUserStore((state) => state.isDialogOpen);
  const setIsDialogOpen = useUserStore((state) => state.setIsDialogOpen);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to user data here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditUserForm
          onFormSubmission={() => {
            flushSync(() => {
              setIsDialogOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
