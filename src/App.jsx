import React, { useState } from 'react';
import { List, LayoutGrid } from 'lucide-react';
import TaskList from './components/TaskList';
import TaskBoard from './components/TaskBoard';
import AddTaskModal from './components/AddTaskModal';
import TaskDetailsModal from './components/TaskDetailsModal';
import './styles/App.css';

function App() {
    const [view, setView] = useState('list');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    const handleAddTask = (task) => {
        const newTask = {
            ...task,
            id: Date.now().toString(),
        };
        setTasks([...tasks, newTask]);
        setIsModalOpen(false);
    };

    const handleEditTask = (task) => {
        if (editingTask) {
            setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...task, id: editingTask.id } : t)));
            setEditingTask(null);
            setSelectedTask(null);
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setSelectedTask(null);
    };

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <h1 className="header-title">My tasks</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="add-task-button"
                    >
                        Add task
                    </button>
                </div>
            </header>

            <div className="view-toggle">
                <div className="view-toggle-buttons">
                    <button
                        onClick={() => setView('list')}
                        className={`view-button ${view === 'list' ? 'active' : ''}`}
                    >
                        <List size={20} />
                        <span>List</span>
                    </button>
                    <button
                        onClick={() => setView('board')}
                        className={`view-button ${view === 'board' ? 'active' : ''}`}
                    >
                        <LayoutGrid size={20} />
                        <span>Board</span>
                    </button>
                </div>
            </div>

            <main className="main-content">
                {view === 'list' ? (
                    <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
                ) : (
                    <TaskBoard tasks={tasks} onTaskClick={handleTaskClick} />
                )}
            </main>

            {isModalOpen && (
                <AddTaskModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddTask}
                />
            )}

            {editingTask && (
                <AddTaskModal
                    onClose={() => setEditingTask(null)}
                    onSubmit={handleEditTask}
                    editTask={editingTask}
                />
            )}

            {selectedTask && (
                <TaskDetailsModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditClick}
                />
            )}
        </div>
    );
}

export default App;
