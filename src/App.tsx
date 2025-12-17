import { useState } from 'react'
import './App.css'
// @ts-ignore
import Sidebar from './components/Sidebar'
// @ts-ignore
import CoverPage from './components/CoverPage'

function App() {
  const [statusFilter, setStatusFilter] = useState(['todo', 'in-progress', 'done'])
  const [showCover, setShowCover] = useState(true)

  return showCover ? (
    <CoverPage onStart={() => setShowCover(false)} />
  ) : (
    <div className="flex h-screen">
      <Sidebar statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          {/* Main content area */}
          <h1 className="text-3xl font-bold mb-4">Task Management</h1>
          <p>Your tasks will appear here</p>
        </main>
      </div>
    </div>
  )
}

export default App
