import axios from "axios";
import React from "react";
import { MainBackDiv } from "../../Presenter/Main/MainPresenter";
import MainContents from "./MainContentsComponent";

const Main = () => {
    return (
        <>
        
            <MainBackDiv>
                <MainContents/>
            </MainBackDiv>
        </>
    ); 
}

export default Main;
