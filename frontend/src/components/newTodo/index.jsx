import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import { MdCalendarToday } from 'react-icons/md'; // Import calendar icon
import './newtodo.css';
import { addTask } from '../../api';

const NewTodo = ({ todos, setTodos }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Track whether calendar is open

  const addTodo = async (newTodo) => {
    const { data } = await addTask(newTodo);
    setTodos([...todos, data]);
  };

  const handleTodo = (e) => {
    e.preventDefault();

    if (title.trim()) {
      const newTodo = { title, dueDate };
      addTodo(newTodo);
      setTitle('');
      setDueDate(null);
      setIsCalendarOpen(false); // Close calendar after submission
    }
  };

  return (
    <form onSubmit={handleTodo}>
      <input
        type="text"
        value={title}
        placeholder="Enter task ....."
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Icon to trigger calendar */}
      <span className="calendar-icon" onClick={() => setIsCalendarOpen(true)}>
        <MdCalendarToday size={24} /> {/* Calendar icon */}
      </span>
      <button type="submit" className="add-btn">
        +
      </button>

      {/* Hidden DatePicker that opens on icon click */}
      {isCalendarOpen && (
        <div className="calendar">
          <DatePicker
            selected={dueDate}
            onChange={(date) => {
              setDueDate(date);
              setIsCalendarOpen(false); // Close the calendar after selecting a date
            }}
            onClickOutside={() => setIsCalendarOpen(false)} // Close if clicked outside
            inline // Display the calendar inline when open
          />
        </div>
      )}
    </form>
  );
};

export default React.memo(NewTodo);
