import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import toast from 'react-hot-toast';
import './todoitem.css';
import { deleteTask, getTasks, updateTask } from '../../api';

const TodoItem = ({ id, title, completed, dueDate, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [newTitle, setNewTitle] = useState(title); // Store new title

  const getDueDateText = () => {
    // If no due date or empty string, return "No due date"
    if (!dueDate || dueDate === '') {
      return 'No due date';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

    const taskDueDate = new Date(dueDate);
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

  // Define fetchTodos function
  const fetchTodos = async () => {
    try {
      const { data } = await getTasks();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      await fetchTodos();

      toast.success('Task deleted successfully', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#6B7280',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
        },
        className: 'toast-animation',
      });
    } catch (error) {
      toast.error('Failed to delete task', {
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
        },
        className: 'toast-animation',
      });
      console.error('Error deleting todo:', error);
    }
  };

  const handleSave = async () => {
    try {
      await updateTask(id, { title: newTitle, completed });
      await fetchTodos();
      setIsEditing(false);

      toast.success('Task updated successfully', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#3B82F6',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
        },
        className: 'toast-animation',
      });
    } catch (error) {
      toast.error('Failed to update task', {
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
        },
        className: 'toast-animation',
      });
      console.error('Error updating todo:', error);
    }
  };

  const handleCancel = () => {
    setNewTitle(title); // Revert to the original title
    setIsEditing(false); // Exit edit mode
  };

  const toggleTodo = async () => {
    try {
      await updateTask(id, { completed: !completed });
      await fetchTodos();

      const toastOptions = {
        duration: 2000,
        position: 'top-right',
        style: {
          padding: '16px',
          borderRadius: '10px',
          transition: 'all 0.3s ease-in-out',
        },
        // Add custom animation
        className: 'toast-animation',
      };

      if (!completed) {
        toast.success('Task marked as completed! 🎉', {
          ...toastOptions,
          style: {
            ...toastOptions.style,
            background: '#10B981',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10B981',
          },
        });
      } else {
        toast('Task marked as incomplete', {
          ...toastOptions,
          style: {
            ...toastOptions.style,
            background: '#6B7280',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error('Failed to update task status', {
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
          transition: 'all 0.3s ease-in-out',
        },
        className: 'toast-animation',
      });
      console.error('Error toggling todo:', error);
    }
  };

  const dueDateText = getDueDateText();

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <div className="todo-item-left">
          <div className="checkbox-wrapper">
            <input type="checkbox" checked={completed} onChange={toggleTodo} />
          </div>

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
              autoFocus
            />
          ) : (
            <span className="task-title">{title}</span>
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
                  onClick={handleSave}
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
