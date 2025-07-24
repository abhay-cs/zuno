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
				<form className="edit-form" onSubmit={handleSubmit} style={{ display: 'inline' }}>
					<input
						className="edit-input"
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						autoFocus
					/>
					{/* <div className="edit-buttons"> */}
					<button type="submit">Save</button>
					<button type="button" onClick={() => setIsEditing(false)}>
						Cancel
					</button>
					{/* </div> */}

				</form>
			) : (
				<>
					<input
						type="checkbox"
						checked={task.completed}
						onChange={() => onToggleComplete(task._id, !task.completed)}
					/>
					<span
						style={{
							textDecoration: task.completed ? 'line-through' : 'none',
							color: task.completed ? '#999' : '#111',
							marginLeft: '0.5rem',
							flex: 1
						}}
					>
						{task.text}
					</span>
					<button onClick={() => setIsEditing(true)}>Edit</button>
					<button onClick={() => onDelete(task._id)}>Delete</button>
				</>
			)}
		</li>
	);
}

export default TaskItem;