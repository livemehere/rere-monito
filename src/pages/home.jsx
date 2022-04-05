import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Layout from "../components/layout";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.log("로그인정보", user);
  }, [user]);

  return (
    <Layout>
      <h1>Monito</h1>
    </Layout>
  );
}
