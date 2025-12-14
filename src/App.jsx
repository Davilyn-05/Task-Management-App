import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CoverPage from "./components/CoverPage";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(['todo', 'in-progress', 'done']);
  const [sortBy, setSortBy] = useState('date');
  const [showCoverPage, setShowCoverPage] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    }
    // Check if user has seen cover page
    const hasSeenCoverPage = localStorage.getItem('hasSeenCoverPage');
    if (hasSeenCoverPage === 'true') {
      setShowCoverPage(false);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const onAdd = (title, desc, status = 'todo') => {
    const newTask = {
      id: Date.now(),
      title,
      description: desc,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priority: 'medium'
    };
    setTasks([...tasks, newTask]);
  };

  const onSearch = (term) => {
    setSearchTerm(term);
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const onUpdate = (id, status) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status, updatedAt: new Date().toISOString() } : task
    ));
  };

  let filteredTasks = tasks.filter(task => {
    const matchesSearch = searchTerm.trim() === '' || 
      (task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch && statusFilter.includes(task.status);
  });

  // Sort tasks
  if (sortBy === 'date') {
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === 'priority') {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else if (sortBy === 'status') {
    const statusOrder = { 'todo': 0, 'in-progress': 1, 'done': 2 };
    filteredTasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }

  const taskStats = {
    todo: tasks.filter(t => t.status === 'todo').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    total: tasks.length
  };

  const handleEnterApp = () => {
    setShowCoverPage(false);
    localStorage.setItem('hasSeenCoverPage', 'true');
  };

  return (
    <>
      {showCoverPage && <CoverPage onEnter={handleEnterApp} />}
      <div 
        className={`flex min-h-screen bg-gray-50 h-screen transition-opacity duration-500 ${
          showCoverPage ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`} 
        style={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}
      >
        <Sidebar 
        statusFilter={statusFilter} 
        onStatusFilterChange={setStatusFilter}
        taskStats={taskStats}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ maxWidth: 'calc(100vw - 160px)' }}>
        <Navbar onSearch={onSearch} searchTerm={searchTerm} />
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto p-2 w-full" style={{ maxWidth: 'calc(100vw - 180px)' }}>
            <div className="mb-2">
              <AddTask onAdd={onAdd} />
            </div>

            {/* Sort Controls */}
            <div className="mb-2 flex flex-col gap-1.5 bg-white text-gray-700 p-2 rounded-lg shadow">
              <div className="flex items-center gap-1.5">
                <label className="font-semibold text-xs">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-2 border-gray-300 p-1 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900 text-xs flex-1"
                >
                  <option value="date">📅 Date</option>
                  <option value="priority">⚡ Priority</option>
                  <option value="status">📊 Status</option>
                </select>
              </div>
              <span className="text-xs font-semibold text-gray-600">
                {filteredTasks.length} of {tasks.length} tasks
              </span>
            </div>

            
            {/* No Tasks at All */}
            {tasks.length === 0 && (
              <div className="p-6 rounded-lg border-2 text-center bg-gray-50 text-gray-700 border-gray-200">
                <p className="text-lg font-semibold">📝 No tasks yet</p>
                <p className="text-sm mt-1">Add your first task above to get started!</p>
              </div>
            )}

            {/* No Search Results */}
            {filteredTasks.length === 0 && tasks.length > 0 && (
              <div className="p-6 rounded-lg border-2 text-center bg-blue-50 text-blue-700 border-blue-200">
                <p className="text-lg font-semibold">🔍 No tasks match your search</p>
                <p className="text-sm mt-1">
                  {searchTerm.trim() ? `No tasks found matching "${searchTerm}"` : "Try adjusting your filter selection."}
                </p>
              </div>
            )}

            {/* Task Grid */}
            {filteredTasks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
    </>
  );
}
