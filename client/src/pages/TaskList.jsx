import React, { useState, useEffect } from 'react';
import { Plus, Check, Edit3, Trash2, Share2, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { getTasks, createTask, deleteTask, updateTask } from '../api/api';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';



function TaskList({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Fetch tasks from backend
  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch(() => onLogout());
  }, [onLogout]);

  // Filtering logic
  const filteredTasks = tasks.filter(task => {
    switch (activeFilter) {
      case 'active':
        return !task.isComplete;
      case 'completed':
        return task.isComplete;
      default:
        return true;
    }
  });

  // Toggle complete
  const toggleTask = async (id, isComplete) => {
    await updateTask(id, { isComplete: !isComplete });
    setTasks(tasks =>
      tasks.map(task =>
        task._id === id ? { ...task, isComplete: !isComplete } : task
      )
    );
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks => tasks.filter(task => task._id !== id));
  };

  // Add task
  const handleAddTask = async () => {
    if (newTaskTitle.trim()) {
      const res = await createTask(newTaskTitle);
      setTasks([res.data, ...tasks]);
      setNewTaskTitle('');
      setShowAddTask(false);
    }
  };

  // Start editing
  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditingText(task.text);
  };

  // Save edit
  const handleEditSave = async (taskId) => {
    await updateTask(taskId, { text: editingText });
    setTasks(tasks =>
      tasks.map(task =>
        task._id === taskId ? { ...task, text: editingText } : task
      )
    );
    setEditingTaskId(null);
    setEditingText('');
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditingTaskId(null);
    setEditingText('');
  };

  // Priority color (dummy, since backend doesn't have priority)
  const getPriorityColor = () => 'border-blue-500';

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Zuno</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
            >
              <User size={16} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <hr className="my-1" />
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                  onClick={() => {
                    localStorage.removeItem('token');
                    onLogout();
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-64 h-screen lg:h-auto bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            {/* Lists Section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">My Lists</h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-900">Personal Tasks</span>
                  </div>
                  <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full">{tasks.length}</span>
                </div>
                {/* <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors opacity-50">
                  <Plus size={12} />
                  <span className="text-sm text-gray-600">Add List</span>
                </button> */}
              </div>
            </div>
            {/* Filters Section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Filters</h3>
              <div className="space-y-1">
                {[
                  { key: 'all', label: 'All Tasks', count: tasks.length },
                  { key: 'active', label: 'Active', count: tasks.filter(t => !t.isComplete).length },
                  { key: 'completed', label: 'Completed', count: tasks.filter(t => t.isComplete).length }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                      activeFilter === filter.key 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="text-sm">{filter.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeFilter === filter.key 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {/* Future Shared Lists Section */}
            {/* <div className="opacity-50">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Shared Lists</h3>
              <p className="text-xs text-gray-400 p-2">None.</p>
            </div> */}
          </div>
        </aside>
        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          />
        )}
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* List Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Tasks</h2>
              <p className="text-gray-600">
                {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} 
                {activeFilter !== 'all' && ` • ${activeFilter}`}
              </p>
            </div>
            {/* Task List */}
            <div className="space-y-3">
              {filteredTasks.map(task => (
                <div
                  key={task._id}
                  className={`bg-white rounded-lg border-l-4 ${getPriorityColor()} shadow-sm hover:shadow-md transition-shadow p-4 ${
                    task.isComplete ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleTask(task._id, task.isComplete)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        task.isComplete
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {task.isComplete && <Check size={12} />}
                    </button>
                    <div className="flex-1">
                      {editingTaskId === task._id ? (
                        <div>
                          <input
                            type="text"
                            value={editingText}
                            onChange={e => setEditingText(e.target.value)}
                            className="font-medium text-gray-900 w-full border-b border-gray-300 focus:outline-none"
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleEditSave(task._id);
                              if (e.key === 'Escape') handleEditCancel();
                            }}
                            autoFocus
                          />
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => handleEditSave(task._id)}
                              className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleEditCancel}
                              className="px-2 py-1 text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <h3 className={`font-medium ${task.isComplete ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.text}
                        </h3>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {formatDate(task.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                        onClick={() => handleEditClick(task)}
                      >
                        <Edit3 size={20} />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                  <p className="text-gray-500 mb-4">
                    {activeFilter === 'all' 
                      ? "Get started by adding your first task"
                      : `No ${activeFilter} tasks at the moment`
                    }
                  </p>
                  <button
                    onClick={() => setShowAddTask(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Task
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* Floating Add Task Button (Mobile) */}
      <button
        onClick={() => setShowAddTask(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-30"
      >
        <Plus size={24} />
      </button>
      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <input
              type="text"
              placeholder="Task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;


