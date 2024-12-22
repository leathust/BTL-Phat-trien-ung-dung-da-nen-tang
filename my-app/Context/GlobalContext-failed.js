import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [userId, setUserId] = useState('0000');
    const [userTasks, setUserTasks] = useState([{id: 1, listId: 1, text: 'Rau ngót', count: 4, unit: 'bó', completed: false}, 
                                            {id: 2, listId: 1, text: 'Trứng', count: 2, unit: 'quả', completed: false},
                                            {id: 3, listId: 2, text: 'Thịt lợn', count: 5, unit: 'kg', completed: false},
                                            {id: 4, listId: 2, text: 'Rượu nếp', count: 2, unit: 'chai', completed: false}
                                            ]);
    const [userLists, setUserLists] = useState([{listId: 1, name: 'mua sắm Tết 2025', familyLits: false}, {listId: 2, name: 'Chuẩn bị thi CK', familyLits: false}]);

    const getUserTasks = () => {
        return userTasks;
    }

    const getUserLists = () => {
        return userLists;
    }

    return (
        <GlobalContext.Provider value={ {userId, getUserTasks, getUserLists} }>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };