const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
//
router.use(auth)
// Get all tasks
router.get('/', async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Create new task
router.post('/', async (req, res) => {
	const task = new Task({
		text: req.body.text,
		user: req.userId,
	});
	try {
		const newTask = await task.save();
		res.status(201).json(newTask);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete task by id
router.delete('/:id', async (req, res) => {
	console.log('🗑️ DELETE /api/tasks/' + req.params.id, 'by user', req.userId);
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).json({ message: 'Invalid task ID' });
		}
		const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}
		res.status(204).end();
	} catch (err) {
		console.log('❌ Delete error:', err);
		res.status(500).json({ message: err.message });
	}
});

// Update task by id
router.put('/:id', async (req, res) => {
	try {
		const updatedTask = await Task.findOneAndUpdate(
			{ _id: req.params.id, user: req.userId }, // restrict to owner
			{
				text: req.body.text,
				isComplete: req.body.isComplete,
			},
			{ new: true }
		);
		if (!updatedTask) {
			return res.status(404).json({ message: 'Task not found' });
		}
		res.json(updatedTask);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;