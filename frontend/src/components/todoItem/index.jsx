import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import './todoitem.css';
import { deleteTask, updateTask } from '../../api';

const TodoItem = ({ todo, setTodos, onActionAttempt, isDemo }) => {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [newTitle, setNewTitle] = useState(todo.title); // Store new title

  const getDueDateText = () => {
    // If no due date or empty string, return "No due date"
    if (!todo.dueDate || todo.dueDate === '') {
      return 'No due date';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

    const taskDueDate = new Date(todo.dueDate);
    taskDueDate.setHours(0, 0, 0, 0);

    if (taskDueDate < today) {
      return 'Due passed';
    } else if (taskDueDate.getTime() === today.getTime()) {
      return 'Due today';
    } else {
      // Format the date as "MMM DD" (e.g., "Jan 15")
      return taskDueDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const handleToggleComplete = async () => {
    if (!onActionAttempt('complete')) return;

    try {
      if (!isDemo) {
        await updateTask(todo._id, { completed: !todo.completed });
      }
      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!onActionAttempt('delete')) return;

    try {
      if (!isDemo) {
        await deleteTask(todo._id);
      }
      setTodos((prev) => prev.filter((t) => t._id !== todo._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    if (!onActionAttempt('update')) return;

    try {
      if (!isDemo) {
        await updateTask(todo._id, { title: newTitle });
      }
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? { ...t, title: newTitle } : t))
      );
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setNewTitle(todo.title); // Revert to the original title
    setIsEditing(false); // Exit edit mode
  };

  const dueDateText = getDueDateText();

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <div className="todo-item-left">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
            />
          </div>

          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdate();
                if (e.key === 'Escape') handleCancel();
              }}
              className="title-edit"
              aria-label="Edit task title"
              autoFocus
            />
          ) : (
            <span className="task-title">{todo.title}</span>
          )}
        </div>

        <div className="todo-item-right">
          <span
            className={`due-date ${
              getDueDateText() === 'Due passed'
                ? 'overdue'
                : getDueDateText() === 'Due today'
                ? 'due-today'
                : getDueDateText() === 'No due date'
                ? 'no-date'
                : ''
            }`}
          >
            {getDueDateText()}
          </span>

          <div className="todo-actions">
            {isEditing ? (
              <>
                <button
                  className="action-btn save-btn"
                  onClick={handleUpdate}
                  aria-label="Save changes"
                >
                  <FaCheck />
                </button>
                <button
                  className="action-btn cancel-btn"
                  onClick={handleCancel}
                  aria-label="Cancel editing"
                >
                  <IoClose />
                </button>
              </>
            ) : (
              <>
                <button
                  className="action-btn edit-btn"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit task"
                >
                  <MdEdit />
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={handleDelete}
                  aria-label="Delete task"
                >
                  <MdDelete />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default React.memo(TodoItem);
