export default function Sidebar({ statusFilter, onStatusFilterChange, taskStats = {} }) {
  const statuses = [
    { id: 'todo', label: 'To Do', color: 'text-red-600', emoji: '📝' },
    { id: 'in-progress', label: 'In Progress', color: 'text-yellow-600', emoji: '⚙️' },
    { id: 'done', label: 'Done', color: 'text-green-600', emoji: '✅' }
  ];

  const handleCheckboxChange = (statusId) => {
    let newFilter;
    if (statusFilter.includes(statusId)) {
      newFilter = statusFilter.filter(s => s !== statusId);
    } else {
      newFilter = [...statusFilter, statusId];
    }
    onStatusFilterChange(newFilter);
  };

  const handleSelectAll = () => {
    onStatusFilterChange(['todo', 'in-progress', 'done']);
  };

  return (
    <aside className="w-64 shadow-lg p-6 border-r-2 border-gray-300 dark:border-gray-700 min-h-screen flex flex-col bg-white dark:bg-gray-800">
      <h2 className="font-bold text-2xl mb-6 pb-4 border-b-2 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700">
        🔍 Filter Tasks
      </h2>
      
      {/* Task Statistics */}
      {taskStats && taskStats.total > 0 && (
        <div className="mb-6 p-4 rounded-lg border-2 bg-blue-50 border-blue-200 text-gray-800">
          <p className="font-bold mb-3 text-sm text-gray-800">📊 Task Summary</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>To Do:</span>
              <span className="font-bold text-red-600">{taskStats.todo || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>In Progress:</span>
              <span className="font-bold text-yellow-600">{taskStats['in-progress'] || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Done:</span>
              <span className="font-bold text-green-600">{taskStats.done || 0}</span>
            </div>
            <div className="border-t-2 border-blue-200 pt-2 mt-2 flex justify-between">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-blue-600">{taskStats.total || 0}</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Checkboxes */}
      <div className="space-y-4 flex-1">
        {statuses.map(status => {
          const isChecked = statusFilter.includes(status.id);
          const count = taskStats[status.id] || 0;
          return (
            <div 
              key={status.id} 
              className={`flex items-center p-4 rounded-lg border-2 transition cursor-pointer ${
                isChecked 
                  ? 'bg-blue-50 border-blue-400 text-blue-800' 
                  : 'bg-gray-50 border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleCheckboxChange(status.id)}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(status.id)}
                className="w-6 h-6 cursor-pointer accent-blue-600"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-base ${status.color} px-3 py-1 rounded`}>
                    {status.emoji} {status.label}
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-200 text-gray-500">
                    {count}
                  </span>
                </div>
              </div>
              {isChecked && <span className="text-lg font-bold text-blue-600">✓</span>}
            </div>
          );
        })}
      </div> 
      </aside>
      
  );
}
