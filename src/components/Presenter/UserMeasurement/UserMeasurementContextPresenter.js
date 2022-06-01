import styled from "styled-components";

const Chartmargin =styled.div`
margin-top:12em;
`;

const BackDiv = styled.div`
    text-align: center;
    padding: 10px;
    margin:2em auto 3em auto;
    background-color: rgb(247, 247, 247);
    width: 50em;
    height:45em;
    border-radius: 1.5em;
`;

const BackDivv = styled.div`
    text-align: center;
    padding: 10px;
    margin:2em auto 2em auto;
    background-color: rgb(247, 247, 247);
    width: 50em;
    height:27em;
    border-radius: 1.5em;
`;

const Mtitle = styled.div`
    height:1.5em;
    font-size: 1.5em;
    font-weight: bold;
    margin:0.6em;
`;

const Mtime = styled.div`
    text-align:right;
    font-size: 1.2em;
    margin-right:2em;
`;

const Mday = styled.div`
    text-align:right;
    font-size: 1.3em;
    margin-right:2em;
    margin-bottom:0.2em;
`;

const Mmchart = styled.div`
    margin: 1em 4em;
    padding: 0em 3em;
`;


export {BackDiv,
    BackDivv,
    Mtitle,
    Mday,
    Mtime,
    Mmchart,
    Chartmargin};