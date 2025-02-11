// TaskContext.js
import React, { createContext, useState } from 'react';
// Create the context
const ShopContext = createContext();

// Create a provider component
const ShopProvider = ({ children }) => {

    const [tasks, setTasks] = useState([{ id: '1', listId: '1', userId: '0000', text: 'Rau ngót', count: 4, unit: 'bó', completed: false },
                                        { id: '2', listId: '1', userId: '0000', text: 'Trứng', count: 2, unit: 'quả', completed: false },
                                        { id: '3', listId: '2', userId: '0001', text: 'Thịt lợn', count: 5, unit: 'kg', completed: false },
                                        { id: '4', listId: '2', userId: '0001', text: 'Rượu nếp', count: 2, unit: 'chai', completed: false }
                                    ]);
    const [lists, setLists] = useState([{ listId: '1', name: 'mua sắm Tết 2025', userId: '0000', familyList: false },
                                        { listId: '2', name: 'Chuẩn bị thi CK', userId: '0000', familyList: false }]);

    /*idea: with familyList, listId = groupId */

    const [groups, setGroups] = useState([{ groupId: '01', name: 'Ăn Tết bên ngoại', bossId: '0000', userIDs: ['0000', '0002', '0003'], taskIDs: ['1', '2'] },
                                        { groupId: '11', name: 'Nhóm 1', bossId: '0000', userIDs: ['0000', '0003', '0004'], taskIDs: ['3', '4'] }
                                        ]);
    // Function to add a task
    const addTask = (task) => {
        if (!tasks.some(item => item.id === task.id)) {
            setTasks([...tasks, task]);
        }
        //console.log(tasks);             // chú ý sẽ ko console.log ra task mới thêm vào nhất được, lý do là vì setTasks là async.
    };

    // Function to add a list
    const addList = (list) => {
        if (!lists.some(item => item.listId === list.listId)) {
            setLists([...lists, list]);
        }
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
        const groupToRemove = groups.find(group => group.groupId === id);
        if (groupToRemove) {
            const newTasks = tasks.filter(task => !groupToRemove.taskIDs.includes(task.id));
            setTasks(newTasks);
            const newLists = lists.filter(list => list.listId !== id);
            setLists(newLists);
        }
        const newGroups = groups.filter(group => group.groupId !== id);
        setGroups(newGroups);
    };

    // Function to remove a member from a group
    const removeMemberFromGroup = (groupId, userId) => {
        // Remove all tasks assigned to the user
        const group = groups.find(group => group.groupId === groupId);
        const taskIDs = group.taskIDs;
        setTasks(
            tasks.filter(task => !taskIDs.includes(task.id) || task.userId !== userId)
        );

        // Remove the family list that assigned to the user
        const newLists = lists.filter(item => item.listId !== groupId || (item.listId === groupId && item.userId !== userId));
        setLists(newLists); 

        setGroups(
            groups.map(group =>
                group.groupId === groupId
                    ? { ...group, userIDs: group.userIDs.filter(id => id !== userId) }
                    : group
            )
        );

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
                    ? group.userIDs.includes(userId)
                        ? group
                        : { ...group, userIDs: [...group.userIDs, userId] }
                    : group
            )
        );
    };

    // Function to add a task to a group
    const addTaskToGroup = (groupId, taskId) => {
        setGroups(
            groups.map(group =>
                group.groupId === groupId
                    ? { ...group, taskIDs: [...group.taskIDs, taskId] }
                    : group
            )
        );
    };

    return (
        <ShopContext.Provider value={{ tasks, addTask, removeTask, toggleTaskCompletion, lists, addList, removeList, groups, addGroup, removeGroup, addUserToGroup, addTaskToGroup, removeMemberFromGroup }}>
            {children}
        </ShopContext.Provider>
    );
};

export { ShopProvider, ShopContext };
