import styled from "styled-components";

const BackDiv = styled.div`
height: 100vh;
`;

const MypageFlex = styled.div`
    display: flex;
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

const Measurement = styled.div`
width: 32em;
height: 15.5em;
background:linear-gradient(80deg,rgb(252, 238, 196), #FCE9CE);
margin-top: 3em;
margin: 3em auto ;
flex-direction: row;
border-radius: 1.5em;
padding: 1em;
`;

const PoseHeart = styled.div`
width: 32em;
height: 15.5em;
background:linear-gradient(80deg,rgb(252, 238, 196), #FCE9CE);
margin-top: 3em;
margin: 3em auto ;
flex-direction: row;
border-radius: 1.5em;
padding: 1em;
`;

const Dday = styled.div`
width: 32em;
height: 15.5em;
background:linear-gradient(80deg,rgb(252, 238, 196), #FCE9CE);
background-color: #EDDDB8;
margin-top: 3em;
margin: 3em auto ;
flex-direction: row;
border-radius: 1.5em;
padding: 1em;
`;

const UserPageBox = styled.div`
    height: 11em;
`;

const UserPageTitle = styled.div`
font-weight: bold;
font-size:1.5em;
margin-left:0.5em;
`;

const UserBtn = styled.div`
text-align: left;
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

export { Edit, Measurement, PoseHeart, Dday, MypageFlex, BackDiv, UserPageTitle, UserPageBox, UserBtn};