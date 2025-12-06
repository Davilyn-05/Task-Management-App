export default function Navbar({ onSearch }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Management App</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value)}
        className="px-4 py-2 rounded-md text-black"
      />
    </nav>
  );
}
