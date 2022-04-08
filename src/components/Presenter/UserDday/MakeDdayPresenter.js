import styled from "styled-components";

const MakeDdayBox = styled.div`
background:linear-gradient(80deg, #FDEEE2, #FDF2E2);
align-items:center;
width:25em;
height:26.5em;
text-align:center;
border-radius: 1.5em;
margin-left: auto;
margin-right: auto;
margin-top:2em;
padding:1em;
`;

const MakeDdayContent = styled.div`
margin-left:2.5em;
`;

const Title = styled.div`
    margin-top:1.3em;
    font-size:1em;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    margin-left:3.5em;
`;

const MainTitle = styled.div`
    font-size:1.8em;
    font-weight: bold;
    color:#595959;
    margin-bottom:1.2em;
`;

const MakeDdayBtn = styled.div`
.MakeDdayBtn{
    padding : 0.5em 1em;
    background: #FDD08B;
    color:white;
    text-decoration:none;
    border-radius: 0.7em;
    font-weight:bold;

    &:hover{
        background-color:#F8BA5C;
        cursor: pointer;
      }
    &:active {
        background: #F9B242;
      }
}
`;

const Form = styled.form`
height:18em;
`;

export {Title, MakeDdayBox, MakeDdayContent, MainTitle, MakeDdayBtn, Form};