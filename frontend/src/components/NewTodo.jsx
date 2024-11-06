import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import { MdCalendarToday } from 'react-icons/md'; // Import calendar icon
import '../css/newtodo.css';

const NewTodo = ({ todos, setTodos }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Track whether calendar is open

  const addTodo = async (newTodo) => {
    const response = await fetch('https://task-manager-backend-tau-lemon.vercel.app/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    const savedTodo = await response.json();
    setTodos([...todos, savedTodo]);
  };

  const handleTodo = (e) => {
    e.preventDefault();

    if (text.trim()) {
      const newTodo = { title: text, dueDate };
      addTodo(newTodo);
      setText('');
      setDueDate(null);
      setIsCalendarOpen(false); // Close calendar after submission
    }
  };

  return (
    <form onSubmit={handleTodo}>
      <input
        type="text"
        value={text}
        placeholder="Enter task....."
        onChange={(e) => setText(e.target.value)}
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
