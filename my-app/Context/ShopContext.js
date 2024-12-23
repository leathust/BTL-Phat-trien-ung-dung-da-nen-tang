// TaskContext.js
import React, { createContext, useState } from 'react';
// Create the context
const ShopContext = createContext();

// Create a provider component
const ShopProvider = ({ children }) => {

    const [tasks, setTasks] = useState([{id: 1, listId: 1, text: 'Rau ngót', count: 4, unit: 'bó', completed: false}, 
                                        {id: 2, listId: 1, text: 'Trứng', count: 2, unit: 'quả', completed: false},
                                        {id: 3, listId: 2, text: 'Thịt lợn', count: 5, unit: 'kg', completed: false},
                                        {id: 4, listId: 2, text: 'Rượu nếp', count: 2, unit: 'chai', completed: false}
                                        ]);
    const [lists, setLists] = useState([{listId: 1, name: 'mua sắm Tết 2025', userId: '0000', familyLits: false}, 
                                        {listId: 2, name: 'Chuẩn bị thi CK', userId: '0000', familyLits: false}]);
    
    const [groups, setGroups] = useState([{groupId: 1, name: 'Ăn Tết bên ngoại', bossId: '0000', userIDs: ['0000', '0002', '0003'], taskIDs: [1, 2]},
                                        {groupId: 2, name: 'Nhóm 1', bossId: '0000', userIDs: ['0000', '0003', '0004'], taskIDs: [3, 4]}
                                        ]);                                 
    // Function to add a task
    const addTask = (task) => {
        setTasks([...tasks, task]);
        //console.log(tasks);             // chú ý sẽ ko console.log ra task mới thêm vào nhất được, lý do là vì setTasks là async.
    };

    // Function to add a list
    const addList = (list) => {
        setLists([...lists, list]);
    };

    // Function to add a group
    const addGroup = (group) => {
        setGroups([...groups, group]);
        console.log(groups);
    };

    // Function to remove a task
    const removeTask = (id) => {
        const newTasks = tasks.filter(item => item.id !== id);
        setTasks(newTasks);
      };

    // Function to remove a list
    const removeList = (id) => {
        const newTasks = tasks.filter(item => item.listId !== id);
        setTasks(newTasks);
        const newLists = lists.filter(item => item.listId !== id);
        setLists(newLists);
    }

    // Function to remove a group
    const removeGroup = (id) => {
        const newGroups = groups.filter(item => item.groupId !== id);
        setGroups(newGroups);
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

    // Function to add a user to a group
    const addUserToGroup = (groupId, userId) => {
        setGroups(
            groups.map(group =>
                group.groupId === groupId
                    ? { ...group, userIDs: [...group.userIDs, userId] }
                    : group
            )
        );
    };

    return (
        <ShopContext.Provider value={{ tasks, addTask, removeTask, toggleTaskCompletion, lists, addList, removeList, groups, addGroup, removeGroup, addUserToGroup }}>
            {children}
        </ShopContext.Provider>
    );
};

export { ShopProvider, ShopContext };
