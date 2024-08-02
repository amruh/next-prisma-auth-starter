"use client";

import { createUser } from "@/actions/user";
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
import { CreateUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TCreateUser = z.infer<typeof CreateUserSchema>;

export default function CreateUserForm({
  onFormSubmission,
}: {
  onFormSubmission: () => void;
}) {
  const form = useForm<TCreateUser>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "USER",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: TCreateUser) => {
    toast.loading("Creating data...", { id: "create-user" });
    const result = await createUser(values);
    toast.dismiss("create-user");

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("User created successfully");
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
            <FormItem className="mb-2.5 space-y-1">
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
            <FormItem className="mb-2.5 space-y-1">
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
            <FormItem className="mb-2.5 space-y-1">
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
            <FormItem className="mb-2.5 space-y-1">
              <FormLabel className="">Password</FormLabel>
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
            <FormItem className="mb-5 space-y-1">
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
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
