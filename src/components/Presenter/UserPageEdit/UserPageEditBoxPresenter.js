import styled from "styled-components";

const EditFrom = styled.form`
    background-color: #EDDDB8;
    background: repeating-linear-gradient(to right, rgb(252, 238, 196), #FCE9CE 13em, #FCFBF9 13em, #FCFBF9 55em);
    height: 41em;
    width: 55em;
    box-shadow : 0.2em 0.2em 0.7em 0.2em #DBD9D6;
    border-radius: 1.5em;
`;



const Editname = styled.div`
font-size: 1.1em;
margin: 1em 1.2em;
font-weight: bold;
width:11em;
text-align:left;
`;

const EditText = styled.div`
font-size: 1em;
margin: 1em 1em;

`;

const Line = styled.div`
width:54.7em;
height:5.5em;
border-bottom:0.1em solid #EDEBE9;
`;

const Linee = styled.div`
width:54.7em;
height:5.5em;
`;

const Lineeee = styled.div`
width:54.7em;
height:8.63em;
border-bottom:0.1em solid #EDEBE9;
`;

const Blank = styled.div`
display: flex;
flex-direction: row;
font-size:0px;
`;

const PWExplain = styled.div`
font-size: 0.65em;
margin: 1.2em 0.1em;
color : #E7910A;
`;


export {Lineeee, EditFrom, Editname ,EditText, Line, Linee, Blank, PWExplain};