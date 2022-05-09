import React, { useState } from "react";
import Layout from "../components/layout";
import { AlignTitle } from "../components/Presenter/Calendar/CalendarTitlePresenter";
import { BackDiv, LoginBox } from "../components/Presenter/Login/LoginPresenter";

export default function SignUp() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Layout>
            <AlignTitle>
                <h1>회원가입</h1>
            </AlignTitle>
      <BackDiv>
        <LoginBox>
            <form className= "signup-container">
                <input type="email" placeholder="email" name="email" className="signup-input"/>
                <input type="text" placeholder="password" name="password" className="signup-input" />
                <input type="text" placeholder="password" name="password-check" className="signup-input" />
                <input type="text" placeholder="name" name="name" className="signup-input" />
                <input type="date" placeholder="birth" name="birth" className="signup-input" />
                <input type="text" placeholder="job" name="job" className="signup-input"/>
            <button className="login-btn">회원가입</button>
            </form>
            </LoginBox>
        </BackDiv>
        </Layout>
    );
}