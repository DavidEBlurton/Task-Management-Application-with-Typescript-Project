import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Task } from '../types/Task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete TypeScript setup',
      description: 'Set up TypeScript and create initial components',
      status: 'in-progress',
      dueDate: new Date(),
    },
    {
      id: 2,
      title: 'Design Dashboard',
      description: 'Create a basic layout for the dashboard',
      status: 'pending',
      dueDate: new Date(),
    },
  ]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const editTask = (task: Task) => {
    
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
