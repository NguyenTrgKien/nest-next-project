import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button
        type="primary"
        className=""
      >
        Home
      </Button>
      <Link 
        href={"/auth/login"}
      >
        Sign in
      </Link>
    </div>
  );
}
