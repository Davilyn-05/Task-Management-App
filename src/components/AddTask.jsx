import { useState, useEffect } from "react";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      textarea.description-textarea::placeholder {
        font-size: 10px !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
      className="shadow-lg p-2.5 rounded-lg border-2 bg-white border-gray-200 text-gray-900"
    >
      <h2 className="text-base font-bold mb-2">Add New Task</h2>

      <div className="space-y-2">
        <div>
          <label className="block text-xs font-semibold mb-1 text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter task title..."
            className="border w-full rounded focus:outline-none focus:border-blue-500 transition bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            style={{ 
              padding: '4px 8px', 
              fontSize: '12px',
              borderWidth: '1px',
              height: '30px'
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700" style={{ fontSize: '10px', fontWeight: '600' }}>
            Description
          </label>
          <textarea
            placeholder="Enter description..."
            className="description-textarea border-2  rounded-lg focus:outline-none focus:border-blue-500 transition resize-none bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            style={{ 
              fontSize: '12px',
              borderWidth: '1px',
              padding: '6px 8px',
              width: '100%',
              minHeight: '100px',
              maxHeight: '40px'
            
            }}
            rows="2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-green-600 text-white w-full py-1.5 rounded-lg font-bold text-xs transition shadow-md active:scale-95"
          style={{ background: '#cad7f1ff' }}
          onMouseEnter={(e) => e.target.style.background = '#A56CB9'}
          onMouseLeave={(e) => e.target.style.background = '#cad7f1ff'}
          
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
