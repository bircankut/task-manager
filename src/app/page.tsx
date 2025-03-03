import Content from "@/app/content/page";
import SignIn from "@/app/sign-in/page";

export default function Home() {
  const user = true;
  return (
    <div className="w-full flex flex-row">
      {user ? <Content /> : <SignIn />}
    </div>
  );
}
