import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import '../../styles/todoitem.css';

import { getDueDateLabel, getDueDateClass } from '../../utils/todoUtils';
import useTodoActions from '../../customHooks/useTodoActions';

const TodoItem = ({ todo, setTodos, onActionAttempt, isDemo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const { updateTitle, toggleComplete, removeTask } = useTodoActions({
    todo,
    setTodos,
    onActionAttempt,
    isDemo,
  });

  const handleUpdate = async () => {
    await updateTitle(newTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(todo.title);
    setIsEditing(false);
  };

  const dueLabel = getDueDateLabel(todo.dueDate);
  const dueClass = getDueDateClass(dueLabel);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <div className="todo-item-left">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={toggleComplete}
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
              autoFocus
            />
          ) : (
            <span className="task-title">{todo.title}</span>
          )}
        </div>

        <div className="todo-item-right">
          <span className={`due-date ${dueClass}`}>{dueLabel}</span>

          <div className="todo-actions">
            {isEditing ? (
              <>
                <button className="action-btn save-btn" onClick={handleUpdate}>
                  <FaCheck />
                </button>
                <button
                  className="action-btn cancel-btn"
                  onClick={handleCancel}
                >
                  <IoClose />
                </button>
              </>
            ) : (
              <>
                <button
                  className="action-btn edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <MdEdit />
                </button>
                <button className="action-btn delete-btn" onClick={removeTask}>
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
