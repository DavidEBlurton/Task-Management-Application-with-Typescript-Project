import React, { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import { useTasks } from '../components/TaskContext';

interface TaskFormProps {
  task?: Task | null;
  onAddTask: (task: Task) => void;
}

interface Errors {
  title?: string;
  dueDate?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  // Pre-fill the form if editing an existing task
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setDueDate(task.dueDate.toISOString().split('T')[0]);
    }
  }, [task]);

  // Validate the form inputs
  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!dueDate || new Date(dueDate) <= new Date()) {
      newErrors.dueDate = 'Due date must be in the future';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const newTask: Task = {
      id: task ? task.id : Date.now(),
      title,
      description,
      status,
      dueDate: new Date(dueDate),
    };
    onAddTask(newTask);

    // Clear the form after submission
    setTitle('');
    setDescription('');
    setStatus('pending');
    setDueDate('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'pending' | 'in-progress' | 'completed')}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        {errors.dueDate && <span style={{ color: 'red' }}>{errors.dueDate}</span>}
      </div>

      <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
