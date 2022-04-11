import styled from "styled-components";

const BackDiv = styled.div`
height: 100vh;
`;

const Edit = styled.div`
width: 32em;
height: 15.5em;
background:linear-gradient(80deg,rgb(252, 238, 196), #FCE9CE);
margin-top: 3em;
margin: 3em auto ;
flex-direction: row;
border-radius: 1.5em;
padding: 1em;
`;

const UserPageTitle = styled.div`
text-align:left;
margin-left: 2em;
font-weight: bold;
font-size:1.5em;
margin-top:1em;
`;

const UserBtn = styled.div`
text-align:right;
margin-right:2em;
margin-top: 2.5em;
height:2em;
border-radius: 0.5em;
padding-top:0.5em;
text-decoration: none;
border:25%;
.UserPageBtn{
    font-weight: bold;
    padding : 0.7em 1.4em;
    background-color:white;
    color:gray;
    text-decoration:none;
    border-radius: 0.7em;
    &:hover{
        background: #F4C782;
        color:white;
        cursor: pointer;
      }
      &:active {
        background: #F2AF49;
      }
}   
`;


const MypageBox =styled.div`
  width:60%;
  height: 10em;
  border-bottom:0.3em solid #F8DFB8;
  border-top:0.3em solid #F8DFB8;
  margin:2em auto;
  background:linear-gradient(80deg, #FDEEE2, #FDF2E2);
`;

export { BackDiv, UserPageTitle, UserBtn, MypageBox};