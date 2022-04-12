import styled from "styled-components";

const DdayContentsBox = styled.div`
background:linear-gradient(80deg, #FDEEE2, #FDF2E2);
align-items:center;
width:35em;
height:22em;
text-align:center;
border-radius: 1.5em;
margin-left: auto;
margin-right: auto;
margin-top:2em;
padding:1.5em;
`;

const DdayTitle = styled.div`
    font-size:1.7em;
    margin-bottom:0.5em;
    font-weight:bold;
    color: #595959;
`;

const ContentTable = styled.table`

margin-left: auto;
margin-right: auto;
width:32em;
height:13em;
`;

const Contenttr = styled.tr`
width:16em;
`;

const ContenttdDate = styled.td`
font-weight:bold;
font-size:1.5em;
color:#6C6C6C;
`;

const ContenttdDday = styled.td`
font-size:4em;
font-weight:bold;
border-right:0.05em solid #FAE1C9;
color:#FCBF83;
padding-right:0.6em;
&:hover{
    color:#FC9871;
}
`;

const Contenttd = styled.td`
height:6em;
width:15.8em;
padding:1em;

`;

const DdayDelete = styled.div`
margin-top:2em;
.Delete{
    color:#FED3AA;
    &:hover{
        color:#FDB773;
    }
    &:active {
        color:#FA8D22;
      }
}
`;



export {DdayContentsBox, ContentTable, Contenttr, ContenttdDate,ContenttdDday, Contenttd,DdayTitle,DdayDelete};