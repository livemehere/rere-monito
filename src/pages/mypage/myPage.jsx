import React from "react";
import { Link } from "react-router-dom";
import UserPageMain from "../../components/Container/UserPageMain/UserPageMainComponent";
import Layout from "../../components/layout";

export default function MyPage() {
  return (
    <Layout>
      <UserPageMain/>
    </Layout>
  );
}
