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
        <Button
          type="primary"
        >
          Sign in
        </Button>
      </Link>
      <Link 
        href={"/auth/register"}
      >
        <Button
          type="primary"
        >
          Register
        </Button>
      </Link>
    </div>
  );
}
