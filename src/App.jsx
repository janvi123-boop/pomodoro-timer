import { useState, useEffect } from 'react';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionMinutes * 60);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [hasCountedCompletion, setHasCountedCompletion] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !hasCountedCompletion) {
      setCompletedSessions((prev) => prev + 1);
      setHasCountedCompletion(true);
      setIsRunning(false);
    }

    if (timeLeft > 0 && hasCountedCompletion) {
      setHasCountedCompletion(false);
    }
  }, [timeLeft, hasCountedCompletion]);
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(sessionMinutes * 60);
  };
  const timer25 = () => {
    setSessionMinutes(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const timer5 = () => {
    setSessionMinutes(5);
    setTimeLeft(5 * 60);
    setIsRunning(false);
  };

  const timer20 = () => {
    setSessionMinutes(20);
    setTimeLeft(20 * 60);
    setIsRunning(false);
  };

  return (
    <>
    <div className="bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 space-y-4 min-h-screen">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
        <h1 className="text-center text-xl font-bold">POMODORO TIMER</h1>
        <div className="text-center text-4xl font-mono mt-6">
          {minutes}:{seconds}
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button 
            className="rounded px-6 py-2 bg-green-600 text-white hover:bg-green-700"
            onClick={handleStartPause}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button 
            className="rounded px-6 py-2 bg-red-600 text-white hover:bg-red-700"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button className="flex-1 rounded px-4 py-2 bg-slate-700 border border-slate-500 hover:bg-slate-600 "onClick={timer25}>
            focus
          </button>
          <button className="flex-1 rounded px-4 py-2 bg-slate-700 border border-slate-500 hover:bg-slate-600 "onClick={timer5}>
            short
          </button>
          <button className="flex-1 rounded px-4 py-2 bg-slate-700 border border-slate-500 hover:bg-slate-600"onClick={timer20}>
            long
          </button>
        </div>
      </div>
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-2 shadow-2xl shadow-slate-950/40">
        <h3>No of sessions completed is {completedSessions}</h3>
        </div>
    </div>
    </>
  );
}

export default App;