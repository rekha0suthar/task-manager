import Todo from '../models/task.js';

const addTask = async (req, res) => {
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
};

const getTasks = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
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
};

const deleteTask = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { addTask, getTasks, updateTask, deleteTask };
