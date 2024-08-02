import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export default function LoginFormButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="mt-3 w-full" disabled={pending}>
      Login
    </Button>
  );
}
