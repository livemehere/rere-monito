import React from "react";
import NavBar from "./navbar";
import Copyright from "./copyright"
import { AllBody } from "./Presenter/Nav/TopNavPresenter";

export default function Layout({ children }) {
  return (
    <div className="container">
      <NavBar />
      <AllBody>
      <div>{children}</div>
      </AllBody>
      
    </div>
  );
}
