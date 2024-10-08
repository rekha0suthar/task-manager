import React, { useState } from 'react';

import { MdDelete, MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { editTodo, deleteTodo, toggleTodo } from '../utils';

const TodoItem = ({ id, title, completed, dueDate, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [newTitle, setNewTitle] = useState(title); // Store new title

  // fetch updated list of todos after deleting
  const fetchTodos = async () => {
    const response = await fetch('http://localhost:5000/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  const handleSave = () => {
    editTodo(id, newTitle, fetchTodos); // Save changes
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    setNewTitle(title); // Revert to the original title
    setIsEditing(false); // Exit edit mode
  };

  return (
    <li className="todo-list">
      <div>
        <input
          type="checkbox"
          checked={!!completed}
          onChange={() => toggleTodo(id, !completed, fetchTodos)}
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
          />
        ) : (
          <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {title}
          </span>
        )}
      </div>
      <p className="due-date">{dueDate && ` Due: ${dueDate}`}</p>

      <div>
        {isEditing ? (
          <>
            <button className="edit-btn" onClick={handleSave}>
              <FaCheck /> {/* Save icon */}
            </button>
            <button className="del-btn" onClick={handleCancel}>
              <IoClose /> {/* Cancel icon */}
            </button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <MdEdit /> {/* Edit icon */}
            </button>
            <button
              className="del-btn"
              onClick={() => deleteTodo(id, fetchTodos)}
            >
              <MdDelete /> {/* Delete icon */}
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default React.memo(TodoItem);
