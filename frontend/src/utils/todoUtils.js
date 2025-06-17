export const getDueDateLabel = (dueDate) => {
  if (!dueDate) return 'No due date';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDue = new Date(dueDate);
  taskDue.setHours(0, 0, 0, 0);

  if (taskDue < today) return 'Due passed';
  if (taskDue.getTime() === today.getTime()) return 'Due today';

  return taskDue.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const getDueDateClass = (label) => {
  return (
    {
      'Due passed': 'overdue',
      'Due today': 'due-today',
      'No due date': 'no-date',
    }[label] || ''
  );
};
