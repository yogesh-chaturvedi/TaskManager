const TaskModel = require('../models/Tasks')
const UserModel = require('../models/User')


// to create tasks 
const createTask = async (req, res) => {
    try {
        const { taskTitle, taskDate, taskAssignedTo, TaskCategory, taskDescription } = req.body;

        if (req.user.role === 'admin') {
            const user = await UserModel.findOne({ name: taskAssignedTo });

            if (!user) {
                return res.status(401).json({ message: 'No User Found', success: false })
            }

            // console.log(isPresent);

            const task = new TaskModel({
                assignedTo: taskAssignedTo,
                taskCategory: TaskCategory,
                taskTitle: taskTitle,
                taskDescription: taskDescription,
                UserId: user._id,
                deadLine: taskDate
            })

            await task.save();

            // push this task's ID to user's `tasks` array
            user.tasks.push(task._id);
            await user.save();

            res.status(200).json({ message: 'Task Save Successfully', success: true })
        }
    }
    catch (error) {
        console.error('create task error', error)
        res.status(500).json({
            message: 'Internal server error while fetching tasks',
            success: false,
            error: error.message,
        });
    }
}

// to fetch tasks
const getAllTasks = async (req, res) => {
    try {
        // If the logged-in user is an admin → return all tasks
        if (req.user.role === 'admin') {
            const tasks = await TaskModel.find({})
                .sort({ createdAt: -1 });

            return res.status(200).json({
                message: 'All tasks fetched successfully',
                success: true,
                tasks,
            });
        }

        // If normal user → return only their tasks
        const userTasks = await TaskModel.find({ UserId: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Your tasks fetched successfully',
            success: true,
            tasks: userTasks,
        });
    } catch (error) {
        console.error('getAllTasks error:', error);
        res.status(500).json({
            message: 'Internal server error while fetching tasks',
            success: false,
            error: error.message,
        });
    }
};

// update task
const updateTask = async (req, res) => {
    try {
        const { taskId, status } = req.body;
        console.log('taskId', taskId)
        console.log('status', status)
        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(401).json({
                message: 'Task not found',
                success: false,
            });
        }

        task.taskStatus = status;
        await task.save();


        res.status(200).json({
            message: 'Task Updated Successfully',
            success: true
        });


    } catch (error) {
        console.error('UpdateTask error:', error);
        res.status(500).json({
            message: 'Internal server error while fetching tasks',
            success: false,
            error: error.message,
        });
    }
};


// to search task 
const searchTask = async (req, res) => {
    try {
        const { searchedText } = req.body;

        // to check is search text is present or not 
        if (!searchedText || searchedText.trim() === "") {
            return res.status(400).json({
                message: "Search text is required",
                success: false
            });
        }

        // Search in taskTitle or taskDescription
        const tasks = await TaskModel.find({
            $or: [
                { taskTitle: { $regex: searchedText, $options: "i" } },
                { taskDescription: { $regex: searchedText, $options: "i" } }
            ]
        });

        res.status(200).json({
            message: "Tasks fetched successfully",
            success: true,
            tasks
        });


    } catch (error) {
        console.error('UpdateTask error:', error);
        res.status(500).json({
            message: 'Internal server error while fetching tasks',
            success: false,
            error: error.message,
        });
    }
}



module.exports = { createTask, getAllTasks, updateTask, searchTask }