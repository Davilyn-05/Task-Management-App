export default function TaskCard({ task, onDelete, onUpdate }) {
  return (
    <div className="bg-white shadow p-4 rounded-md border">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>

      <div className="flex justify-between mt-3">
        <select
          className="border p-1 rounded"
          value={task.status}
          onChange={(e) => onUpdate(task.id, e.target.value)}
        >
          <option value="todo">To-do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}