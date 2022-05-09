import styled from "styled-components";

const AllBody = styled.div`
  margin-top: 7%;
`;

const NavBody = styled.div`
  font-size: large;
  font-family: "Noto Sans KR", sans-serif;
  padding: 1em;
  display: flex;
  list-style: none;
  justify-content: center;
  margin: auto;
`;

const NavAllContainer = styled.div`
  z-index: 999;
  position: fixed;
  right: 0px;
  left: 0;
  padding: 2%;
  top: 0;
  padding-bottom: 2vh;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: space-between;

  .top-nav-title {
    text-decoration: none;
    justify-content: space-between;
    color: rgb(238, 189, 82);
    font-family: "Jua", sans-serif;
  }
  .top-nav-title:hover {
    color: rgb(196, 155, 67);
    text-decoration: none;
    justify-content: space-between;
    font-family: "Jua", sans-serif;
  }
`;
const NavListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 40%;
  li {
    color: black;
  }
  li:hover {
    color: black;
    font-weight: 900;
    font-size: large;
  }
  .top-nav-list {
    color: black;
    text-decoration: none;
    display: flex;
    padding-bottom: 4px;
    position: relative;
    align-items: flex-end;
  }
  .top-nav-list::after {
    content: "";
    bottom: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    background: #f1c40f;
    transition: all 0.5s ease-out;
  }
  .top-nav-list:hover::after {
    width: 100%;
  }
  .top-nav-list:hover {
    text-decoration: none;
    color: rgb(43, 43, 43);
    font-weight: bold;
  }
  .user-name {
    padding-right: 0%;
  }
`;
const BottomBody = styled.div`
  padding-top: 20vmin;
`;

const NavLoginLogOut = styled.div`
  .login-btn {
    color: white;
    font-size: 20px;
    text-decoration: none;
    padding: 5px 15px 5px 15px;
    background: linear-gradient(45deg, rgb(247, 202, 54), orange);
    border-radius: 30px;
  }
  .login-btn:hover {
    color: white;
    font-size: 20px;
    text-decoration: none;
    padding: 5px 15px 5px 15px;
    background: rgb(196, 155, 67);
    border-radius: 30px;
  }
`;
export {
  NavBody,
  NavAllContainer,
  NavListContainer,
  BottomBody,
  NavLoginLogOut,
  AllBody,
};
