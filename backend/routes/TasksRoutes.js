const express = require('express');
const verifyUser = require('../middleware/VerifyUser');
const { createTask, getAllTasks, UpdateTask } = require('../controllers/TaskControllers');
const router = express.Router();

// to create/add tasks 
router.post('/create', verifyUser, createTask)

// to fetch tasks
router.get('/fetch', verifyUser, getAllTasks)


router.put('/complete', verifyUser, UpdateTask)


module.exports = router;