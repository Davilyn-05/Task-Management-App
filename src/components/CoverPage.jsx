import { useState, useEffect } from "react";

export default function CoverPage({ onEnter }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => {
      if (onEnter) {
        onEnter();
      }
    }, 500);
  };

  return (
    <div 
      className={`fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #cad7f1ff 100%)',
        width: '100vw',
        height: '100vh',
        minWidth: '100vw',
        minHeight: '100vh',
        margin: 0,
        padding: 0
      }}
    >
      <div className="text-center text-white px-8 max-w-3xl">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="text-8xl mb-6 animate-bounce"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          Welcome to
        </h1>
        <h2 className="text-5xl font-bold mb-8 text-yellow-300">
          Task Manager
        </h2>

        {/* Description */}
        <p className="text-2xl mb-4 text-blue-100 font-light">
          Organize your life, one task at a time
        </p>
        <p className="text-lg mb-12 text-blue-200">
          Stay productive and achieve your goals
        </p>

        {/* Enter Button */}
        <button
          onClick={handleEnter}
          className="bg-white text-purple-700 px-12 py-4 rounded-full font-bold text-xl hover:bg-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:-translate-y-1"
        >
          Enter App →
        </button>

        {/* Footer Info */}
        <div className="mt-16 text-sm text-blue-200">
          <p className="mb-2">BSIT 3-4</p>
          <p className="text-xs opacity-75">Click "Enter App" to get started</p>
        </div>
      </div>
    </div>
  );
}

