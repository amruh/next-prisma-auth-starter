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
    <div className="flex h-screen justify-center items-center relative">
      <Card className="w-[400px]">
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-2xl font-semibold text-center">
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
          <p className="text-xs mx-auto">
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
