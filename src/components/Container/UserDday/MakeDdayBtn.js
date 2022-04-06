
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';


const CircleButton = styled.button`
  background: #FFB68B;
  margin-bottom:2em;
  &:hover {
    background: #ffcf90;
  }
  &:active {
    background: #ff7f96;
  }

  z-index: 5;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: block;
  font-size: 60px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;


  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;


const MakeDdayBtn = () => {
  
    //button 컴포넌트
    return (
        <>
          <CircleButton>
              <MdAdd />
          </CircleButton>
        </>
    );
};

export default MakeDdayBtn;