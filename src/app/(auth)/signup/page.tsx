import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex h-screen justify-center items-center relative">
      <Card className="w-[400px]">
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-2xl font-semibold text-center">
            🔐 Sign Up
          </CardTitle>
          <CardDescription className="text-center">Welcome!</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <p className="text-xs mx-auto">
            Already have an account?{" "}
            <span className="font-medium hover:underline">
              {" "}
              <Link href="/login"> Login</Link>
            </span>{" "}
            instead.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
