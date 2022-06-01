import { TodoItem } from './TodoItem'
import axiosManager from '../../../util/axiosManager';
import { userState } from '../../../atoms/user';
import { useRecoilState } from "recoil";
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { TodoCreate } from './TodoCreate';

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
  const [getts, setGets] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  //record(과목) 가져오기
  useEffect(() => {
    axiosManager.axios(`/record/${user.id}`, "GET")
    .then((res) => {
      const initData = [];
        res.records.forEach((r) => {
        initData.push({
          id: r.id,
          name: r.name,
          total_time: r.total_time,
          content: r.content,
        });
      });
      setGets(initData);
    })
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


    const subjectAdd = (userId, values, textarea) => {

      axiosManager.axios(`/record/`, "POST", {
        headers : {'Content-Type': 'application/x-www-form-urlencoded', },
        user_id: userId,
        name: values,
        content: textarea,
        focus_time: 0,
        unfocus_time: 0,
      })

      axiosManager.axios(`/record/${user.id}`, "GET")
      .then((res) => {
        const initData = [];
          res.records.forEach((r) => {
          initData.push({
            id: r.id,
            name: r.name,
            cumulative_time: r.cumulative_time,
            content: r.content,
          });
        });
        setGets(initData);
      })
      
    };

    useEffect(() => {
      setTodos(getts);
    }, [getts])


  return (
    <>
    {/* 과목 리스트 */}
    <TodoListBlock>
    {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.name}
          content={todo.content}
          done={todo.done}
          time={todo.total_time}
          OnRemove={()=> OnRemove(todo.id)}
        />
      ))}
    </TodoListBlock>

      <TodoCreate
        subjectAdd={subjectAdd}
      />
    </>
  );
}

// export default TodoList;