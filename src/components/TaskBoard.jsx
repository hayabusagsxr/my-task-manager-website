import React from 'react';
import '../styles/TaskBoard.css';

export default function TaskBoard({ tasks, onTaskClick, onStatusUpdate }) {
    const statuses = ['To do', 'Doing', 'Done'];

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('taskId', id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        const draggedTaskId = e.dataTransfer.getData('taskId');
        if (draggedTaskId) {
            onStatusUpdate(draggedTaskId, status);
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="task-board">
                {statuses.map((status) => {
                    const statusClass = status.toLowerCase().replace(' ', '-');

                    return (
                        <div
                            key={status}
                            className={`board-column ${statusClass}`}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, status)}
                        >
                            <div className={`column-header ${statusClass}`}>
                                <div className={`column-indicator ${statusClass}`} />
                                <span className="column-title">{status}</span>
                                <span className="column-count">0</span>
                            </div>

                            <div className="board-tasks">
                                <div className="board-column-empty">
                                    <p>No tasks</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="task-board">
            {statuses.map((status) => {
                const statusTasks = tasks.filter((task) => task.status === status);
                const statusClass = status.toLowerCase().replace(' ', '-');

                return (
                    <div
                        key={status}
                        className={`board-column ${statusClass}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, status)}
                    >
                        <div className={`column-header ${statusClass}`}>
                            <div className={`column-indicator ${statusClass}`} />
                            <span className="column-title">{status}</span>
                            <span className="column-count">{statusTasks.length}</span>
                        </div>

                        <div className="board-tasks">
                            {statusTasks.map((task) => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id)}
                                    onClick={() => onTaskClick(task)}
                                    className={`board-task-card ${statusClass}`}
                                >
                                    <div className="board-card-top">
                                        <h4 className="board-task-title">{task.name}</h4>
                                        <div className={`board-status-badge ${statusClass}`}>
                                            <div className={`board-status-dot ${statusClass}`} />
                                        </div>
                                    </div>
                                    <p className="board-task-description">{task.description}</p>
                                    <div className="board-card-bottom">
                                        <span className="board-task-date">{task.dueDate}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}