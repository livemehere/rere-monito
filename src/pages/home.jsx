import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.log("로그인정보", user);
  }, [user]);

  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}
