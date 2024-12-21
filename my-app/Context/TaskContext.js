// TaskContext.js
import React, { createContext, useState } from 'react';

// Create the context
const TaskContext = createContext();

// Create a provider component
const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([{id: 1, listId: 1, text: 'Rau ngót', count: 4, unit: 'bó'}, 
                                        {id: 2, listId: 1, text: 'Trứng', count: 2, unit: 'quả'},
                                        {id: 3, listId: 2, text: 'Thịt lợn', count: 5, unit: 'kg'},
                                        {id: 4, listId: 2, text: 'Rượu nếp', count: 2, unit: 'chai'}
                                        ]);
    const [lists, setLists] = useState([{listId: 1, name: 'mua sắm Tết 2025'}, {listId: 2, name: 'Chuẩn bị thi CK'}]);

    // Function to add a task
    const addTask = (task) => {
        setTasks([...tasks, task]);
        console.log(tasks);             // chú ý sẽ ko console.log ra task mới thêm vào nhất được, lý do là vì setTasks là async.
    };

    // Function to add a list
    const addList = (list) => {
        setLists([...lists, list]);
    };

    // Function to remove a task
    const removeTask = (id) => {
        const newTasks = tasks.filter(item => item.id !== id);
        setTasks(newTasks);
      };

    // Function to remove a list
    const removeList = (id) => {
        const newLists = lists.filter(item => item.listId !== id);
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
