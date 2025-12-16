import React from 'react';
import { ChevronRight, CheckSquare } from 'lucide-react';

export default function TaskBoard({ tasks, onTaskClick }) {
    const statuses = ['To do', 'Doing', 'Done'];

    if (tasks.length === 0) {
        return (
            <div className="board-empty-state">
                <div className="board-empty-content">
                    <div className="board-empty-icon">
                        <CheckSquare size={32} />
                    </div>
                    <h3 className="board-empty-title">No tasks yet</h3>
                    <p className="board-empty-description">Get started by creating your first task</p>
                </div>
            </div>
        );
    }

    return (
        <div className="task-board">
            {statuses.map((status) => {
                const statusTasks = tasks.filter((task) => task.status === status);
                const statusClass = status.toLowerCase().replace(' ', '-');

                return (
                    <div key={status} className="board-column">
                        <div className="column-header">
                            <div className={`column-indicator ${statusClass}`} />
                            <span className="column-title">{status}</span>
                        </div>

                        <div className="board-tasks">
                            {statusTasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => onTaskClick(task)}
                                    className={`board-task-card ${statusClass}`}
                                >
                                    <div className="board-task-content">
                                        <div className="board-task-info">
                                            <p className="board-task-name">{task.name}</p>
                                            <p className="board-task-due">Due on {task.dueDate}</p>
                                        </div>
                                        <ChevronRight
                                            size={20}
                                            className="board-task-chevron"
                                        />
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
