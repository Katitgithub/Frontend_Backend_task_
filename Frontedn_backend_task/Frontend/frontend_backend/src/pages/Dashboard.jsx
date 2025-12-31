import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const headers = {
    Authorization: token,
  };

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", { headers });
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers }
    );
    setTitle("");
    fetchTasks();
  };

  const toggleStatus = async (id) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      {},
      { headers }
    );
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      { headers }
    );
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Task Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 transition">
          Add
        </button>
      </form>

      {/* Task List */}
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center">
          No tasks yet. Start by adding one 🚀
        </p>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center p-3 border rounded-lg bg-gray-50"
          >
            <span
              className={`${
                task.status === "Completed"
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => toggleStatus(task._id)}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
              >
                {task.status === "Pending" ? "Done" : "Undo"}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
