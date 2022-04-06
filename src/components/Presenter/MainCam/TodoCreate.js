import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from './TodoContext';


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
  width: 96%;
  outline: none;
  resize: none;
  height: 100px;
  font-size: 18px;
  white-space: pre-wrap;
`;

export function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(''); 
  const [content, setContent] = useState('');

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = e => setValue(e.target.value);
  console.log(onChange);

  const onChangeContent = e => setContent(e.target.value);
  console.log(onChangeContent);

  

  const contentsReplaceNewline = () => {
    return content.replaceAll("\n", "\r\n"); 
  }

  const onSubmit = e => {
    e.preventDefault(); // 새로고침 방지
    
    
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        textarea: contentsReplaceNewline(),
        done: false,
        time: 0
      }
      
    },
    fetch(`http://localhost:3001/subjects/`, {
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: nextId.current,
              text: value,
              textarea: contentsReplaceNewline(),
              done: false,
              time: 0
            })
    }));
 
    setValue('');
    setContent('');
    setOpen(false);
    nextId.current += 1;
    console.log(nextId.current);
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
          
        </InsertForm>
        
      </InsertFormPositioner>
        
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

// export default React.memo(TodoCreate);