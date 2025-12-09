import { useState } from "react";
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onAdd = (title, desc) => {
    setTasks([...tasks, { id: Date.now(), title, description: desc, status: 'todo' }]);
  };

  const onSearch = (term) => {
    setSearchTerm(term);
  };

  const onDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const onUpdate = (id, status) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  const filteredTasks = tasks.filter(task =>
    (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    statusFilter.includes(task.status)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar onSearch={onSearch} />
      <div className="max-w-4xl mx-auto">
        <AddTask onAdd={onAdd} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
