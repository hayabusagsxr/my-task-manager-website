import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function TaskList({ tasks, onTaskClick }) {
    const statuses = ['To do', 'Doing', 'Done'];

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-content">
                    <div className="empty-state-icon">
                        <ChevronRight size={32} />
                    </div>
                    <h3 className="empty-state-title">No tasks yet</h3>
                    <p className="empty-state-description">Get started by creating your first task</p>
                </div>
            </div>
        );
    }

    return (
        <div className="task-list-container">
            {statuses.map((status) => {
                const statusTasks = tasks.filter((task) => task.status === status);

                if (statusTasks.length === 0) return null;

                const statusClass = status.toLowerCase().replace(' ', '-');

                return (
                    <div
                        key={status}
                        className={`status-section ${statusClass}`}
                    >
                        <div className="status-header">
                            <div className={`status-indicator ${statusClass}`} />
                            <span className="status-title">{status}</span>
                        </div>

                        <div className="tasks-list">
                            {statusTasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => onTaskClick(task)}
                                    className="task-item"
                                >
                                    <div className="task-name">
                                        <p>{task.name}</p>
                                    </div>
                                    <div className="task-meta">
                    <span className="task-due-date">
                      Due on {task.dueDate}
                    </span>
                                        <ChevronRight
                                            size={20}
                                            className="task-chevron"
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
