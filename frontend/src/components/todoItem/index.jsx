import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import './todoitem.css';
import { deleteTask, getTasks, updateTask } from '../../api';

const TodoItem = ({ id, title, completed, dueDate, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [newTitle, setNewTitle] = useState(title); // Store new title

  const getDueDateText = () => {
    if (dueDate === 'No due date') return 'No due date';

    const today = new Date();
    const taskDueDate = new Date(dueDate);

    if (taskDueDate < today) {
      return 'Due date passed';
    } else if (taskDueDate.toDateString() === today.toDateString()) {
      return 'Due today';
    } else {
      return dueDate;
    }
  };

  // Fetch updated list of todos after deletion
  const fetchTodos = async () => {
    const { data } = await getTasks();
    setTodos(data);
  };

  const handleDelete = async () => {
    await deleteTask(id);
    fetchTodos();
  };

  const handleSave = async () => {
    await updateTask(id, { title: newTitle, completed }); // Save changes
    fetchTodos();
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    setNewTitle(title); // Revert to the original title
    setIsEditing(false); // Exit edit mode
  };

  const toggleTodo = async () => {
    await updateTask(id, { completed: !completed });
    fetchTodos();
  };

  const dueDateText = getDueDateText();

  return (
    <li className="todo-item">
      <div style={{ width: '200px' }}>
        <input
          type="checkbox"
          checked={!!completed}
          onChange={() => toggleTodo(id, !completed, fetchTodos)}
          aria-label="Mark task as complete"
        />

        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            className="title-edit"
            aria-label="Edit task title"
          />
        ) : (
          <span
            style={{
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? '#ccc' : '#000',
            }}
            className="task-title"
          >
            {title}
          </span>
        )}
      </div>
      <p
        className="due-date"
        style={{
          color: dueDateText === 'Due date passed' ? 'red' : undefined,
        }}
      >
        {dueDateText}
      </p>

      <div>
        {isEditing ? (
          <>
            <button
              className="edit-btn"
              onClick={handleSave}
              aria-label="Save changes"
            >
              <FaCheck />
            </button>
            <button
              className="del-btn"
              onClick={handleCancel}
              aria-label="Cancel editing"
            >
              <IoClose />
            </button>
          </>
        ) : (
          <>
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              aria-label="Edit task"
            >
              <MdEdit />
            </button>
            <button
              className="del-btn"
              onClick={() => handleDelete()}
              aria-label="Delete task"
            >
              <MdDelete />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default React.memo(TodoItem);
