"use client";

import { logIn } from "@/actions/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LoginFormButton from "./form-button";
import { PasswordInput } from "@/components/password-input";
import { useSearchParams } from "next/navigation";

type TLoginSchema = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  const [logInError, dispatchLogIn] = useFormState(logIn.bind(null, callbackUrl), undefined);

  useEffect(() => {
    if (logInError?.error) {
      toast.error(logInError.error);
    }
  }, [logInError]);

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form action={dispatchLogIn}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0.5 mb-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe12@email.com"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0.5 mb-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="********"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoginFormButton />
      </form>
    </Form>
  );
}
