// Common function to update a todo (for both editing and toggling)
const updateTodo = async (id, updates, fetchTodos) => {
  try {
    const response = await fetch(`https://task-manager-backend-tau-lemon.vercel.app/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates), // Pass the fields to update (e.g., title or completed)
    });

    if (!response.ok) {
      throw new Error('Failed to update the todo');
    }

    // Refetch the updated todo list
    fetchTodos();
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

//Delete fucntion
export const deleteTodo = async (id, fetchTodos) => {
  try {
    // sending delete request
    const response = await fetch(`https://task-manager-backend-tau-lemon.vercel.app/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete the todo');
    }

    fetchTodos();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Hook for editing todo title
export const editTodo = (id, newTitle, fetchTodos) => {
  updateTodo(id, { title: newTitle }, fetchTodos);
};

// Hook for toggling completed state
export const toggleTodo = (id, completed, fetchTodos) => {
  updateTodo(id, { completed: !!completed }, fetchTodos); // !! ensures it's a boolean
};
