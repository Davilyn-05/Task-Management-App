export default function Sidebar({ statusFilter, onStatusFilterChange, taskStats = {} }) {
  const statuses = [
    { id: 'todo', label: 'To Do' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'done', label: 'Done' }
  ];

  const handleChange = (statusId) => {
    const newFilter = statusFilter.includes(statusId)
      ? statusFilter.filter(s => s !== statusId)
      : [...statusFilter, statusId];

    onStatusFilterChange(newFilter);
  };

  return (
    <aside
      style={{
        border: '1px solid #ccc',
        margin: '25px',
        padding: '15px'
      }}
      className="w-64 bg-white"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold mb-6 text-gray-800" style={{ color: '#660000'}}>
        Filter Tasks
      </h2>

      {/* Task Summary */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Task Summary
        </h3>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>To Do</span>
            <span className="font-medium">{taskStats.todo || 0}</span>
          </div>

          <div className="flex justify-between">
            <span>In Progress</span>
            <span className="font-medium">{taskStats['in-progress'] || 0}</span>
          </div>

          <div className="flex justify-between">
            <span>Done</span>
            <span className="font-medium">{taskStats.done || 0}</span>
          </div>

          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>{taskStats.total || 0}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {statuses.map(status => (
          <label
            key={status.id}
            className="flex items-center justify-between text-sm text-gray-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={statusFilter.includes(status.id)}
                onChange={() => handleChange(status.id)}
                className="w-4 h-4 accent-blue-600"
              />
              <span>{status.label}</span>
            </div>

            <span className="text-gray-500 text-xs">
              {taskStats[status.id] || 0}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}
