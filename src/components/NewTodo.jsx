import React, { useState } from 'react';
// import { useFlasher } from '../utils';
import { useAddTodo } from '../hooks/useAddTodo';

const NewTodo = () => {
  const addTodo = useAddTodo();
  const [text, setText] = useState('');

  const handleTodo = (e) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleTodo}>
      <input
        type="text"
        value={text}
        placeholder="Enter todo....."
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-btn">
        +
      </button>
    </form>
  );
};

export default React.memo(NewTodo);
