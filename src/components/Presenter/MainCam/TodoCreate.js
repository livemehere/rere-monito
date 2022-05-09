import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import axiosManager from '../../../util/axiosManager';
import { userState } from '../../../atoms/user';
import { useRecoilState } from 'recoil';


const CircleButton = styled.button`
  background: #FFB68B;
  &:hover {
    background: #ffcf90;
  }
  &:active {
    background: #ff7f96;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 45%;
  bottom: 0px;
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


const InsertFormPositioner = styled.div`
  width: 90%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-radius: 16px;
  
  border-top: 1px solid #e9ecef;
`;



const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const TextAreaInput = styled.textarea`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  resize: none;
  height: 100px;
  font-size: 18px;
  white-space: pre-wrap;
`;

const SubmitBtn = styled.button`
  width:120px;
  height: 40px;
  color: white;
  text-align: center;
  top: 20px;
  font-weight: bold;
  
  background: #E9A681;
  font-size: 16px;
  border:none;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0,79,255,0.3);
  transition:0.3s;
  position: relative;

  left: 8%;
  transform: translate(-50%,-50%);
  text-decoration-line: none;

  &:hover {
  background: #DB9A33;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,79,255,0.6);
  }
`;

export function TodoCreate({subjectAdd}) {
  
  const [user, setUser] = useRecoilState(userState);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(''); 
  const [content, setContent] = useState('');


  const onToggle = () => setOpen(!open);
  const onChange = e => setValue(e.target.value);

  const onChangeContent = e => setContent(e.target.value);


  const contentsReplaceNewline = () => {
    return content.replaceAll("\n", "\r\n"); 
  }

  const onSubmit = e => {
    e.preventDefault(); // 새로고침 방지
 
    setValue('');
    setContent('');
    setOpen(false);

    console.log("posted");
   };

  return (
    <>
      {open && (
        <InsertFormPositioner>
        <InsertForm onSubmit={onSubmit}>
          <Input
            autoFocus
            placeholder="할 일을 입력 후, Enter 를 누르세요"
            onChange={onChange}
            value={value}
          />
          <TextAreaInput
            autoFocus
            placeholder="내용을 입력하세요"
            onChange={onChangeContent}
            value={content}
          />
          <SubmitBtn onClick={() => subjectAdd(user.id, value)}>과목 생성</SubmitBtn>
        </InsertForm>
        
      </InsertFormPositioner>
        
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}
