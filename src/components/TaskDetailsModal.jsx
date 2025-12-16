import React from 'react';
import { X, Edit, Trash2 } from 'lucide-react';

export default function TaskDetailsModal({ task, onClose, onDelete, onEdit }) {
    const handleDelete = () => {
        onDelete(task.id);
        onClose();
    };

    const handleEdit = () => {
        onEdit(task);
        onClose();
    };

    const statusClass = task.status.toLowerCase().replace(' ', '-');

    return (
        <div
            className="details-modal-overlay"
            onClick={onClose}
        >
            <div
                className="details-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="details-close-button"
                >
                    <X size={24} />
                </button>

                <div className="details-content">
                    <div className="detail-section">
                        <h3 className="detail-label">Name</h3>
                        <p className="detail-value">{task.name}</p>
                    </div>

                    <div className="detail-section">
                        <h3 className="detail-label">Description</h3>
                        <p className="detail-description">{task.description}</p>
                    </div>

                    <div className="detail-section">
                        <h3 className="detail-label">Due date</h3>
                        <span className="detail-description">{task.dueDate}</span>
                    </div>

                    <div className="detail-section">
                        <h3 className="detail-label">Status</h3>
                        <div className="status-badge">
                            <div className={`status-badge-indicator ${statusClass}`} />
                            <span className="status-badge-text">{task.status}</span>
                        </div>
                    </div>

                    <div className="details-actions">
                        <button
                            onClick={handleEdit}
                            className="edit-button"
                            title="Edit task"
                        >
                            <Edit size={20} />
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="delete-button"
                            title="Delete task"
                        >
                            <Trash2 size={20} />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
