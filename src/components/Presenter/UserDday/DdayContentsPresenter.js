import styled from "styled-components";

const DdayContentsBox = styled.div`
background:linear-gradient(80deg, #FDEEE2, #FDF2E2);
align-items:center;
width:30em;
height:25em;
text-align:center;
border-radius: 1.5em;
margin-left: auto;
margin-right: auto;
margin-top:2em;
margin-bottom:2em;
padding:2em;
`;

const DdayTitle = styled.div`
    font-size:1.8em;
    margin-bottom:0.5em;
    font-weight:bold;
    color: #595959;
    height:1.5em;
`;


const ContenttdDate = styled.div`
text-align:right;
font-weight:bold;
font-size:1.3em;
color:#6C6C6C;
height:2em;
margin-bottom:2em;
`;

const ContenttdDday = styled.div`
font-size:6em;
font-weight:bold;
text-align:center;
color:#FCBF83;
&:hover{
    color:#FC9871;
}
`;





export {DdayContentsBox, ContenttdDate,ContenttdDday, DdayTitle,};