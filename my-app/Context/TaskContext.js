// TaskContext.js
import React, { createContext, useState } from 'react';

// Create the context
const TaskContext = createContext();

// Create a provider component
const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [lists, setLists] = useState([{listId: 1, name: 'mua sắm Tết 2025'}]);

    // Function to add a task
    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    // Function to add a list
    const addList = (list) => {
        setLists([...lists, list]);
    };

    // Function to remove a task
    const removeTask = (index) => {
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(newTasks);
      };

    // Function to remove a list
    const removeList = (index) => {
        const newLists = lists.filter((_, listIndex) => listIndex !== index);
        setLists(newLists);
    }

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
        <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTaskCompletion, lists, addList, removeList }}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskProvider, TaskContext };
