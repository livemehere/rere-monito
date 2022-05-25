import styled from "styled-components";

const EditFrom = styled.form`
    background-color: #EDDDB8;
    background: repeating-linear-gradient(to right, rgb(252, 238, 196), #FCE9CE 13em, #FCFBF9 13em, #FCFBF9 55em);
    height: 33em;
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

const Editnames = styled.div`
font-size: 0.7em;
margin:1em 0;
color:orange;
`;


const EditText = styled.div`
font-size: 1em;
margin: 1em 1em;

`;

const EditTextt = styled.div`
font-size: 1em;
margin: 1em 1em;
display:flex;
flex-direction:row;
`;

const Line = styled.div`
width:54.7em;
height:5.5em;
border-bottom:0.1em solid #EDEBE9;
display:flex;
flex-direction:row;
`;

const Linee = styled.div`
width:54.7em;
height:5.5em;
display:flex;
flex-direction:row;
`;

const Lineeee = styled.div`
padding-top:0.5em;
width:54.7em;
height:5.5em;
border-bottom:0.1em solid #EDEBE9;
display:flex;
flex-direction:row;
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

const Editimg = styled.img`
margin-right:1em;
height:7em;
`;

export {Lineeee, EditFrom, Editname ,EditText ,EditTextt, Line, Linee, Blank, PWExplain, Editnames,Editimg};