import styled from "styled-components";

const MainBackDiv = styled.div`
    background-image:url("img/main-img1.png");
    background-size: cover;
    resize: both;
    overflow: scroll;
    padding:6% 0;

    &::-webkit-scrollbar {
        display: none;
    }

`

export { MainBackDiv };