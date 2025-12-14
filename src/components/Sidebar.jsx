export default function Sidebar({ statusFilter, onStatusFilterChange, taskStats = {} }) {
  const statuses = [
    { id: 'todo', label: 'To Do', color: 'text-red-600', emoji: '' },
    { id: 'in-progress', label: 'In Progress', color: 'text-yellow-600', emoji: '' },
    { id: 'done', label: 'Done', color: 'text-green-600', emoji: '' }
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
    <aside className="shadow-lg p-2 border-r-2 border-gray-300 dark:border-gray-700 h-screen overflow-y-auto flex flex-col bg-white dark:bg-gray-800 flex-shrink-0" style={{ width: '160px', minWidth: '160px', maxWidth: '160px' }}>
      <h2 className="font-bold text-sm mb-2 pb-1.5 border-b-2 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700">
        Filter
      </h2>
      
      {/* Task Statistics */}
      {taskStats && taskStats.total > 0 && (
        <div className="mb-3 p-2 rounded-lg border-2 bg-blue-50 border-blue-200 text-gray-800">
          <p className="font-bold mb-1.5 text-xs text-gray-800">📊 Summary</p>
          <div className="space-y-1 text-xs">
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
            <div className="border-t-2 border-blue-200 pt-1.5 mt-1.5 flex justify-between">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-blue-600">{taskStats.total || 0}</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Checkboxes */}
      <div className="space-y-2 flex-1">
        {statuses.map(status => {
          const isChecked = statusFilter.includes(status.id);
          const count = taskStats[status.id] || 0;
          return (
            <div 
              key={status.id} 
              className={`flex items-center p-2 rounded-lg border-2 transition cursor-pointer ${
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
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <div className="ml-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className={`font-semibold text-xs ${status.color} px-1.5 py-0.5 rounded truncate`}>
                    {status.emoji} {status.label}
                  </span>
          
                </div>
              </div>
              {isChecked && <span className="text-sm font-bold text-blue-600 flex-shrink-0">✓</span>}
            </div>
          );
        })}
      </div> 
      </aside>
      
  );
}
