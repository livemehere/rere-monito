import React from "react";
import NavBar from "./navbar";

export default function Layout({ children }) {
  return (
    <div className="container">
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
