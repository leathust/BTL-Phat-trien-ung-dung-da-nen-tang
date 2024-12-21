// TaskContext.js
import React, { createContext, useState } from 'react';

// Create the context
const TaskContext = createContext();

// Create a provider component
const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    // Function to add a task
    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    // Function to remove a task
    // const removeTask = (taskId) => {
    //     setTasks(tasks.filter(task => task.id !== taskId));
    // };
    const removeTask = (index) => {
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(newTasks);
      };
    // Function to toggle task completion
    const toggleTaskCompletion = (taskId) => {
        setTasks(
            tasks.map(task =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTaskCompletion }}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskProvider, TaskContext };
