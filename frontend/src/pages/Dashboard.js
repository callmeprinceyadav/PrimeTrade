import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiTrash2, FiPlusCircle, FiCheckCircle, FiSearch } from "react-icons/fi";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await API.put(`/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-5 bg-white/10 backdrop-blur-md shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">🚀 Dashboard</h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 px-4 py-2 rounded-lg transition"
        >
          <FiLogOut /> Logout
        </button>
      </header>

      {/* Add Task */}
      <div className="px-8 mt-6">
        <form
          onSubmit={addTask}
          className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-md shadow-lg"
        >
          <input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <FiPlusCircle /> Add
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="px-8 mt-4">
        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md shadow-lg">
          <FiSearch className="text-gray-200 text-xl" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-300 focus:outline-none"
          />
        </div>
      </div>

      {/* Tasks List */}
      <main className="flex-1 overflow-y-auto p-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className={`relative bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-[1.02] ${
                task.completed ? "opacity-70" : ""
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  task.completed ? "line-through text-gray-300" : "text-white"
                }`}
              >
                {task.title}
              </h3>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => toggleComplete(task)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                    task.completed
                      ? "bg-green-500/20 hover:bg-green-500/40 text-green-300"
                      : "bg-blue-500/20 hover:bg-blue-500/40 text-blue-300"
                  }`}
                >
                  <FiCheckCircle /> {task.completed ? "Done" : "Mark Done"}
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full text-gray-200 mt-20">
            <p className="text-xl">No tasks found 😴</p>
            <p className="text-sm text-gray-300 mt-2">
              Try adding a few tasks to get started!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
