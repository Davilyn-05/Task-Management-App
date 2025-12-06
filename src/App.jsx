import { useState } from "react";
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";
import AddTask from "./components/AddTask";


export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, desc) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        description: desc,
        status: "todo",
      },
    ]);
  };

  const updateTask = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto p-4 grid grid-cols-1 md:gri-cols-3 gap-4">
        <div>
          <AddTask onAdd={addTask} />
        </div>

        
 

        

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
            

          ))}
        </div>
      </div>
    </div>
  );
}