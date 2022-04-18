import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TodoItem } from './TodoItem'
import axios from 'axios';


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

export function TodoList() {

  const [todos , setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/subjects')
    .then((response) => {
        setTodos(response.data)
    })
  }, []);

  const OnRemove = (id) => 
    { if(window.confirm('할 일을 삭제 하시겠습니까?'))
    axios.delete(`http://localhost:3001/subjects/${id}`);
    setTodos(prev=>prev.filter(todo=>todo.id !== id));
    }
 

  return (
    <>
    <TodoListBlock>
    {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          textarea={todo.textarea}
          done={todo.done}
          time={todo.time}
          OnRemove={()=> OnRemove(todo.id)}
        />
      ))}
    </TodoListBlock>
     
    </>
  );
}

// export default TodoList;