import React, { useState } from 'react';
import { useQuery } from '../hooks/useQuery';
import { useDeleteTodo } from '../hooks/useDeleteTodo';
import { useToggleTodo } from '../hooks/useToggleTodo';
import { useEditTodo } from '../hooks/useEditTodo'; // Import the edit hook
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

const renderHighLight = (title, query) => {
  if (!query) return title;
  const index = title.indexOf(query);
  if (index === -1) return title;
  return (
    <React.Fragment>
      {title.slice(0, index)}
      <b>{query}</b>
      {title.slice(index + query.length)}
    </React.Fragment>
  );
};

const TodoItem = ({ id, title, completed }) => {
  const { getQuery } = useQuery();
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleTodo();
  const editTodo = useEditTodo(); // Hook for editing todos

  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [newTitle, setNewTitle] = useState(title); // Store new title

  const handleSave = () => {
    editTodo(id, newTitle); // Save changes
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
          onChange={() => toggleTodo(id)}
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
          />
        ) : (
          <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {completed ? title : renderHighLight(title, getQuery())}
          </span>
        )}
      </div>

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
            <button className="del-btn" onClick={() => deleteTodo(id)}>
              <MdDelete /> {/* Delete icon */}
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default React.memo(TodoItem);
