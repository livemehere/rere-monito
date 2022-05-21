import React from "react";
import styled from "styled-components";

const Copy = styled.div`
    margin:4em 0 2em 0;
    border-top: solid 0.001em #D0CECE;
    color:gray;
    width:95%;
    margin-right:auto;
    margin-left:auto;
    font-size:0.8em;
`;

const Monito = styled.div`
margin-top:1em;
font-size:1.2em;
`;

export default function Copyright() {
    return (
        <>
        <Copy>
            <Monito>MONITO</Monito>
            <div>Copyright 2022. 20세기 사람들 All rights reserved.</div>
        </Copy>
        </>
    );
};