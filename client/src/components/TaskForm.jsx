import { useState } from "react";

function TaskForm({ onAdd }) {
    const [text, setText] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText("");
    };
    return (
        <form className = "task-form" onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a task..."
            />
            <button type="submit">Add</button>
        </form>
    );
}


export default TaskForm;