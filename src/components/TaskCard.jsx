export default function TaskCard({ task, onDelete, onUpdate }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'todo':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'done':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusEmoji = (status) => {
    switch(status) {
      case 'todo':
        return '📝';
      case 'in-progress':
        return '⚙️';
      case 'done':
        return '✅';
      default:
        return '📌';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="shadow-lg p-3 rounded-lg border-2 hover:shadow-xl transition flex flex-col h-full bg-white border-gray-200 text-gray-900">
      {/* Header with Title and Date */}
      <div className="mb-2">
        <h3 className="font-bold text-sm mb-1 line-clamp-2">{task.title}</h3>
        <p className="text-xs text-gray-500">📅 {formatDate(task.createdAt)}</p>
      </div>

      {/* Description */}
      <p className="mb-3 text-xs flex-grow text-gray-600 line-clamp-3">
        {task.description || 'No description provided'}
      </p>

      {/* Status and Controls */}
      <div className="space-y-2 mt-auto pt-2 border-t border-gray-200">
        {/* Status Dropdown */}
        <div className="flex items-center gap-1.5">
          <label className="text-xs font-semibold text-gray-600">Status:</label>
          <select
            className={`flex-1 border-2 p-1.5 rounded-lg font-semibold text-xs transition focus:outline-none ${getStatusColor(task.status)}`}
            value={task.status}
            onChange={(e) => onUpdate(task.id, e.target.value)}
          >
            <option value="todo">{getStatusEmoji('todo')} To Do</option>
            <option value="in-progress">{getStatusEmoji('in-progress')} In Progress</option>
            <option value="done">{getStatusEmoji('done')} Done</option>
          </select>
        </div>

        {/* Status Badge */}
        <div className={`text-center py-1.5 px-2 rounded-lg font-semibold text-xs ${getStatusColor(task.status)}`}>
          {getStatusEmoji(task.status)} {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
        </div>

        {/* Delete Button */}
        <button
          className="w-full px-2 py-1.5 rounded-lg font-semibold text-xs transition active:scale-95 bg-blue-300 hover:bg-blue-400 text-blue-900"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}