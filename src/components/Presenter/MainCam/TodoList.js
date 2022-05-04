import { TodoItem } from './TodoItem'
import axios from 'axios';
import axiosManager from '../../../util/axiosManager';
import { userState } from '../../../atoms/user';
import { useRecoilState } from "recoil";
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';


const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;


// export function TodoHead() {
//     const todos = useTodoState();
//     const undoneTasks = todos.filter(todo => !todo.done);
  
//     const today = new Date();
//     const dateString = today.toLocaleDateString('ko-KR', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//     const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
  
//     return (
//       <TodoHeadBlock>
//         <h1>{dateString}</h1>
//         <div className="day">{dayName}</div>
//         <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
//       </TodoHeadBlock>
//     );
//   }



const TodoListBlock = styled.div`
  height: 50vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }


`;

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


export function TodoList() {

  const [todos , setTodos] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  //record(과목) 가져오기
  useEffect(() => {
    axiosManager.axios(`/record/${user.id}`, "GET").then((response) => {
      console.log(response);
      setTodos(response)
    });
  }, []);

  //record(과목) 삭제
  const OnRemove = (id) => 
    { if(window.confirm('할 일을 삭제 하시겠습니까?')){
      axiosManager.axios(`/record/`, "DELETE", {
        headers: { 'Content-type': 'application/x-www-form-urlencoded', },
        id: id
      })
      setTodos(prev=>prev.filter(todo=>todo.id !== id));
    }
    
    
    }

    //record(과목) 생성 
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(''); 
    const [content, setContent] = useState('');
  
    const ni = Math.random();
    const nextId = useRef(ni);
  
    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
    console.log(onChange);
  
    const onChangeContent = e => setContent(e.target.value);
    console.log(onChangeContent);
  
    //엔터 반환
    const contentsReplaceNewline = () => {
      return content.replaceAll("\n", "\r\n"); 
    }
  //useEffect로 밑에거 감싸봐 
    const onSubmit = (userId, nameValue) => {
      // e.preventDefault(); // 새로고침 방지
      
      axiosManager.axios(`/record/`, "POST", {
        headers : {'Content-Type': 'application/x-www-form-urlencoded', },
        id: userId,
        name: nameValue
      })

      setValue('');
      setContent('');
      setOpen(false);
      nextId.current += 1;

      
      console.log(nextId.current);
    };
 

  return (
    <>
    {/* 과목 리스트 */}
    <TodoListBlock>
    {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.name}
          textarea={todo.textarea}
          done={todo.done}
          time={todo.cumulative_time}
          OnRemove={()=> OnRemove(todo.id)}
        />
      ))}
    </TodoListBlock>
     
     {/* 생성 컴포넌트 */}
    {open && (
        <InsertFormPositioner>
        <InsertForm onSubmit={() => onSubmit(user.id, value)}>
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

// export default TodoList;