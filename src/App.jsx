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
  const [showCover, setShowCover] = useState(true);

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

  let filteredTasks = tasks.filter(task =>
    (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    statusFilter.includes(task.status)
  );

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

  return showCover ? <CoverPage onStart={() => setShowCover(false)} /> : (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        statusFilter={statusFilter} 
        onStatusFilterChange={setStatusFilter}
        taskStats={taskStats}
      />
      <div className="flex-1 flex flex-col">
        <Navbar onSearch={onSearch} />
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            <div className="mb-6">
              <AddTask onAdd={onAdd} />
            </div>

            {/* Sort Controls */}
            <div className="mb-6 flex gap-4 items-center  p-4 rounded-lg shadow" style={{ marginLeft: '15px', marginRight: '15px', padding: '10px', border: '1px solid #ccc' }}>
              <label className="font-semibold">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                style={{ padding: '3px', marginLeft: '3px' }}
              >
                <option value="date">Date (Newest)</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
              </select>
              <span className="ml-auto font-semibold">
                Showing {filteredTasks.length} of {tasks.length} tasks
              </span>
            </div>

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="text-center py-12 bg-white text-gray-600 rounded-lg shadow" >
                <p className="text-2xl mb-2">No tasks yet</p>
                <p>Create your first task to get started!</p>
              </div>
            )}

            {/* No Results */}
            {filteredTasks.length === 0 && tasks.length > 0 && (
              <div className="p-6 rounded-lg border-2 text-center bg-blue-50 text-blue-700 border-blue-200">
                <p className="text-lg font-semibold">🔍 No tasks match your filters</p>
                <p className="text-sm mt-1">Try adjusting your search or filter selection.</p>
              </div>
            )}

            {/* Task Grid */}
            {filteredTasks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginLeft: '15px', marginRight: '15px', padding: '10px', border: '1px solid #ccc' }}>
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
  );
}
