import React, { useState } from 'react';
import { Task } from '../types/Task';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { useAuth0 } from '@auth0/auth0-react';

const TaskDashboard: React.FC = () => {
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

    // If loading, display loading message
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If not authenticated, display login button
    if (!isAuthenticated) {
        return (
            <div>
                <h2>Please log in to view your tasks.</h2>
                <button onClick={() => loginWithRedirect()}>Log In</button>
            </div>
        );
    }

    // If authenticated, show dashboard with tasks
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

    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const addTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const editTask = (task: Task) => {
        setEditingTask(task);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditingTask(null); // Clear the editing task after update
    };

    const deleteTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            <h2>Welcome, {user?.name}</h2>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>

            <h1>Task Dashboard</h1>
            <TaskForm onAddTask={editingTask ? updateTask : addTask} task={editingTask} />
            <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
        </div>
    );
};

export default TaskDashboard;
