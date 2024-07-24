import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export default function LoginFormButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full mt-3" disabled={pending}>
      Login
    </Button>
  );
}
