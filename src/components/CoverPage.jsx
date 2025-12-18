export default function CoverPage({ onStart }) 
{
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-[#660000] mb-4 m-2 p-2">Task Management App</h1>
        <p className="text-gray-600 mb-8 m-2 p-2 " 
        style={{ margin: '25px'}}>
          Organize your tasks efficiently. Add, edit, and track your progress with ease.
        </p>
        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}