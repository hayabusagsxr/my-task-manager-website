import React from 'react';
import '../styles/TaskList.css';

export default function TaskList({ tasks, onTaskClick }) {
    const statuses = ['To do', 'Doing', 'Done'];

    if (tasks.length === 0) {
        return (
            <div className="task-list-wrapper">
                <div className="list-table">
                    <div className="list-table-header">
                        <div className="list-header-cell name-cell">Task Name</div>
                        <div className="list-header-cell description-cell">Description</div>
                        <div className="list-header-cell date-cell">Due Date</div>
                        <div className="list-header-cell status-cell">Status</div>
                    </div>

                    <div className="list-empty-message">
                        <p>No tasks</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="task-list-wrapper">
            <div className="list-table">
                <div className="list-table-header">
                    <div className="list-header-cell name-cell">Task Name</div>
                    <div className="list-header-cell description-cell">Description</div>
                    <div className="list-header-cell date-cell">Due Date</div>
                    <div className="list-header-cell status-cell">Status</div>
                </div>

                {statuses.map((status) => {
                    const statusTasks = tasks.filter((task) => task.status === status);

                    if (statusTasks.length === 0) return null;

                    const statusClass = status.toLowerCase().replace(' ', '-');

                    return (
                        <div key={status} className={`status-group ${statusClass}`}>
                            <div className={`status-divider ${statusClass}`}>
                                <div className="status-divider-line">
                                    <div className={`status-divider-indicator ${statusClass}`} />
                                    <span className="status-divider-text">{status}</span>
                                    <span className="status-divider-count">
                    {statusTasks.length} {statusTasks.length === 1 ? 'task' : 'tasks'}
                  </span>
                                </div>
                            </div>

                            {statusTasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => onTaskClick(task)}
                                    className={`list-row ${statusClass}`}
                                >
                                    <div className="list-cell name-cell">
                                        <p className="task-name-text">{task.name}</p>
                                    </div>
                                    <div className="list-cell description-cell">
                                        <p className="task-description-text">{task.description}</p>
                                    </div>
                                    <div className="list-cell date-cell">
                                        <span className="task-date-badge">{task.dueDate}</span>
                                    </div>
                                    <div className="list-cell status-cell">
                                        <div className={`status-tag ${statusClass}`}>
                                            <div className={`status-tag-dot ${statusClass}`} />
                                            <span>{status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}