import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/AddTaskModal.css';

export default function AddTaskModal({ onClose, onSubmit, editTask }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('January');
    const [year, setYear] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [status, setStatus] = useState('To do');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        if (editTask) {
            setName(editTask.name);
            setDescription(editTask.description);
            setStatus(editTask.status);

            const dateParts = editTask.dueDate.match(/(\w+)\s+(\d+),\s+(\d+)\s+at\s+(\d+):(\d+)/);
            if (dateParts) {
                setMonth(dateParts[1]);
                setDay(dateParts[2]);
                setYear(dateParts[3]);
                setHour(dateParts[4]);
                setMinute(dateParts[5]);
            }
        }
    }, [editTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedHour = hour.padStart(2, '0');
        const formattedMinute = minute.padStart(2, '0');
        const dueDate = `${month} ${day}, ${year} at ${formattedHour}:${formattedMinute}`;

        onSubmit({
            name,
            description,
            dueDate,
            status,
        });
    };

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="modal-close-button"
                >
                    <X size={24} />
                </button>

                <h2 className="modal-title">{editTask ? 'Edit task' : 'Add task'}</h2>

                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-row">
                        <div className="form-group form-flex-2">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="form-input"
                                placeholder="Enter task name"
                            />
                        </div>

                        <div className="form-group form-flex-1">
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="form-select"
                            >
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="form-textarea"
                            placeholder="Enter task description"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group form-flex-2">
                            <label className="form-label">Due date</label>
                            <div className="date-grid">
                                <div>
                                    <select
                                        id="month"
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}
                                        required
                                        className="form-select"
                                    >
                                        {months.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        id="day"
                                        value={day}
                                        onChange={(e) => setDay(e.target.value)}
                                        required
                                        placeholder="Day"
                                        className="form-input"
                                        min="1"
                                        max="31"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        id="year"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        required
                                        placeholder="Year"
                                        className="form-input"
                                        min="2000"
                                        max="2100"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group form-flex-1">
                            <label className="form-label">Time</label>
                            <div className="time-grid">
                                <div>
                                    <input
                                        type="number"
                                        id="hour"
                                        value={hour}
                                        onChange={(e) => setHour(e.target.value)}
                                        required
                                        placeholder="Hour"
                                        className="form-input"
                                        min="0"
                                        max="23"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        id="minute"
                                        value={minute}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val.length <= 2) {
                                                setMinute(val);
                                            }
                                        }}
                                        required
                                        placeholder="Min"
                                        className="form-input"
                                        min="0"
                                        max="59"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                        >
                            {editTask ? 'Update task' : 'Add task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}