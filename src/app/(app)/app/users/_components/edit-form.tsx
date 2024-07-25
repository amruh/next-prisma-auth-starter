"use client";

import { updateUser } from "@/actions/user";
import { useUserStore } from "@/app/store/userStore";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TUpdateUser = z.infer<typeof UpdateUserSchema>;

export default function EditUserForm({
  onFormSubmission,
}: {
  onFormSubmission: () => void;
}) {
  const user = useUserStore((state) => state.user);

  const form = useForm<TUpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: TUpdateUser) => {
    toast.loading("Updating data...", { id: user?.id });
    const result = await updateUser(values, user?.id!);
    toast.dismiss(user?.id);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("User updated successfully");
    }

    onFormSubmission();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-2.5">
              <FormLabel className="">Name</FormLabel>
              <FormControl className="col-span-3">
                <Input {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage className="col-span-3" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-2.5">
              <FormLabel className="">Email</FormLabel>
              <FormControl className="col-span-3">
                <Input {...field} type="email" disabled={isSubmitting} />
              </FormControl>
              <FormMessage className="col-span-3" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-2.5">
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="col-span-3">
                  <SelectTrigger disabled={isSubmitting}>
                    <SelectValue placeholder="Pilih atribut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-2.5">
              <FormLabel className="">New Password</FormLabel>
              <FormControl className="col-span-3">
                <PasswordInput {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage className="col-span-3" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1 mb-5">
              <FormLabel className="">Confirm Password</FormLabel>
              <FormControl className="col-span-3">
                <PasswordInput {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage className="col-span-3" />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
