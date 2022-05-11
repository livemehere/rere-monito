import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Main from "../components/Container/Main/MainComponent";
import Layout from "../components/layout";
import { loginState } from "../atoms/loginState";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  useEffect(() => {
    if (isLoggedIn === true) {
      console.log("로그인정보", user);
    }
  }, [user, isLoggedIn]);

  return (
    <Layout>
      <Main />
    </Layout>
  );
}
