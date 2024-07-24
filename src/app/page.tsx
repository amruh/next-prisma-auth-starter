import { redirect } from "next/navigation";

export default function Home() {
  // You can create your landing page or something here, if you don't want to immediately redirect to login page
  return redirect("/login");
}
