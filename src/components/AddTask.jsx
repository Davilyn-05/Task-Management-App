import { useState } from "react";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a task title");

    onAdd(title, desc, "todo");
    setTitle("");
    setDesc("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg p-6 rounded-lg border-2 bg-white border-gray-200 text-gray-900"
    >
      <h2 className="text-2xl font-bold mb-4">✨ Add New Task</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter task title..."
            className="border-2 p-3 w-full rounded-lg focus:outline-none focus:border-blue-500 transition bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Description (Optional)
          </label>
          <textarea
            placeholder="Enter task description..."
            className="border-2 p-3 w-full rounded-lg focus:outline-none focus:border-blue-500 transition resize-none bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            rows="3"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-bold text-lg transition shadow-md active:scale-95"
        >
          ➕Add Task
        </button>
      </div>
    </form>
  );
}
