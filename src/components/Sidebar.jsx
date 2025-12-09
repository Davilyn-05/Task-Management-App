export default function Sidebar({ statusFilter, onStatusFilterChange }) {
  const statuses = ['todo', 'in-progress', 'done'];

  const handleCheckboxChange = (status) => {
    if (statusFilter.includes(status)) {
      onStatusFilterChange(statusFilter.filter(s => s !== status));
    } else {
      onStatusFilterChange([...statusFilter, status]);
    }
  };

  return (
    <div className="w-64 bg-white shadow p-4 rounded-md border">
      <h2 className="font-bold text-lg mb-4">Filter by Status</h2>
      {statuses.map(status => (
        <label key={status} className="block mb-2">
          <input
            type="checkbox"
            checked={statusFilter.includes(status)}
            onChange={() => handleCheckboxChange(status)}
            className="mr-2"
          />
          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        </label>
      ))}
    </div>
  );
}
