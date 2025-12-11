export default function Navbar({ onSearch }) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Task Management App</h1>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-lg text-gray-600">
          </span>
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>
    </nav>
  );
}
