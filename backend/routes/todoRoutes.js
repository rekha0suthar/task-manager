const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed,
    dueDate: req.body.dueDate,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update a todo
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Get the id from the route parameters
  const { title, completed } = req.body; // Extract new title or completion status from the request body

  try {
    // Update the todo document based on the fields provided
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo); // Send back the updated todo
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
