import React, {createContext, useContext, useEffect, useState} from 'react';
import {ApiClient} from '../utils/axios';

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  ended_at: Date;
  created_at: Date;
}

interface ITodoContextProvider {
  todos: ITodo[];
  createTodo: (title: string, ended_at: Date) => void;
  deleteTodo: () => void;
  completeTodo: () => void;
}

const TodoContext = createContext<ITodoContextProvider>({
  todos: [],
  createTodo() {},
  deleteTodo() {},
  completeTodo() {},
});

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const createTodo = async (title: string, ended_at: Date) => {
    const payload = {
      title,
      ended_at,
    };
    const createTodoData = await ApiClient.post('/todos', payload)
      .then(result => result.data?.data)
      .catch(e => {
        console.log('createTodo error: ', e.response.data);
        return null;
      });
    if (createTodoData) {
      setTodos([...todos, createTodoData]);
    }
  };
  const deleteTodo = () => {};
  const completeTodo = () => {};

  const loadTodos = async () => {
    console.log('loadTodos');
    const todoListData = await ApiClient.get('/todos')
      .then(result => result.data?.data?.list)
      .catch(e => {
        console.log('todoListData error: ', e);
        return [];
      });
    console.log('todoListData', todoListData);
    setTodos(todoListData);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <TodoContext.Provider value={{todos, createTodo, deleteTodo, completeTodo}}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
