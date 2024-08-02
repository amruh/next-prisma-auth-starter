import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-center text-2xl font-semibold">
            🔐 Login Page
          </CardTitle>
          <CardDescription className="text-center">
            Welcome back!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="mx-auto text-xs">
            Didn&apos;t have an account?{" "}
            <span className="font-medium hover:underline">
              {" "}
              <Link href="/signup"> Sign Up</Link>
            </span>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
