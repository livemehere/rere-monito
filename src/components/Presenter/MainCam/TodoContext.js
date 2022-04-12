import React, { useReducer, createContext, useContext, useRef } from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";


// const initialTodos = {
//   "subjects": [
//     {
//       id: 1,
//       text: '데이터베이스',
//       textarea: '숨쉬기 추가1\n숨을 쉬어보장',
//       done: true,
//       time: 1200000
//     },
//     {
//       id: 2,
//       text: '자료구조',
//       textarea: '숨쉬기 추가2\n숨을 쉬어보장',
//       done: true,
//       time: 38000
//     },
//     {
//       id: 3,
//       text: '숨쉬기',
//       textarea: '숨쉬기 추가3',
//       done: false,
//       time: 430000
//     },
//     {
//       id: 4,
//       text: 'react 구현하기',
//       textarea: '숨쉬기 추가4',
//       done: false,
//       time: 50000
//     }
//   ],
// } 

function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return action.data;
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


export function TodoProvider({ children }) {

  const [initdata , setData] = useState([]);
  // const dataPromise = initialTodoo.then((response) => response.data)
  useEffect(() => {
    axios.get('http://localhost:3001/subjects')
    .then((response) => {
        setData(response.data)
        dispatch({ type: 'SET_DATA', data: response.data });
    })
    
  }, []);
  
  const [state, dispatch] = useReducer(todoReducer, initdata);
  const ni = Math.random();
  const nextId = useRef(ni);
  

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
  
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}