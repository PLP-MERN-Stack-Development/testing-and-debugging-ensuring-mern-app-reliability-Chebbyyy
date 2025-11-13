import { useState } from 'react';
import { updateBug, deleteBug } from '../lib/api';

const BugItem = ({ bug, onUpdate, onDelete }) => {
  const [status, setStatus] = useState(bug.status);

  const handleStatusChange = async (newStatus) => {
    console.log('Changing status to:', newStatus);
    try {
      await updateBug(bug._id, { status: newStatus });
      console.log('API call successful');
      setStatus(newStatus);
      onUpdate();
    } catch (error) {
      console.error('Error updating bug:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBug(bug._id);
      onDelete();
    } catch (error) {
      console.error('Error deleting bug:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-2">
      <h3 className="font-bold">{bug.title}</h3>
      <p>{bug.description}</p>
      <p>Status: {status}</p>
      <select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
      <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 ml-2">Delete</button>
    </div>
  );
};

export default BugItem;