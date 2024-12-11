import { model, Schema } from 'mongoose';

const todoSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Todo = model('Todo', todoSchema);

export default Todo;
