import { useState } from 'react';

function TaskItem({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editText.trim()) return;
    onEdit(task._id, editText.trim());
    setIsEditing(false);
  };

  return (
    <li className='task-item'>
      {isEditing ? (
        <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          {task.text}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;