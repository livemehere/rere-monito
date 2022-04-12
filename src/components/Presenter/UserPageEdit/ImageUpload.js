import styled from "styled-components";

const Uploadimg = styled.div`
display: flex;
flex-direction: row;

    .img-wrapper{
        img{
            width: 110px;
            height: 110px;
            margin -25px -25px -25px 0px ;
        }
        .img-spinner{
            width: 110px;
            height: 110px;
        }
    }
    .upload-button{
        display: flex;
        flex-direction: column;
        margin: -20px 40px;
        button{
            margin:  5px;
        }
    }
`


export {Uploadimg};