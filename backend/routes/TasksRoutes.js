const express = require('express');
const verifyUser = require('../middleware/VerifyUser');
const { createTask, getAllTasks, updateTask, searchTask } = require('../controllers/TaskControllers');
const router = express.Router();

// to create/add tasks 
router.post('/create', verifyUser, createTask)

// to fetch tasks
router.get('/fetch', verifyUser, getAllTasks)

// to update task 
router.put('/complete', verifyUser, updateTask)

// to search tasks 
router.post('/search', verifyUser,searchTask)


module.exports = router;