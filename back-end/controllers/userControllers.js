const getUsers = (req, res) => {
    res.status(500).json({
        status: "fail",
        message: "This route has not defined"
    });
};
const getUserByID = (req, res) => {
    res.status(500).json({
        status: "fail",
        message: "This route has not defined"
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: "fail",
        message: "This route has not defined"
    });
};
const updateUser = (req, res) => {
    res.status(500).json({
        status: "fail",
        message: "This route has not defined"
    });
};
const deleteUser = (req, res) => {
    res.status(500).json({
        status: "fail",
        message: "This route has not defined"
    });
};

const userControllers = {getUsers, getUserByID, createUser, updateUser, deleteUser};
export default userControllers;