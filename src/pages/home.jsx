import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Main from "../components/Container/Main/MainComponent";
import Layout from "../components/layout";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.log("로그인정보", user);
  }, [user]);

  return (
    <Layout>
      <Main/>
    </Layout>
  );
}
