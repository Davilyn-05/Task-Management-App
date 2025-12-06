import { useState } from "react";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert("Please enter a task title");

    onAdd(title, desc);
    setTitle("");
    setDesc("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-4 rounded-md border"
    >
      <h2 className="text-lg font-bold mb-2">Add Task</h2>

      <input
        type="text"
        placeholder="Task title"
        className="border p-2 w-full rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full rounded mb-2"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button className="bg-blue-600 text-white w-full py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
