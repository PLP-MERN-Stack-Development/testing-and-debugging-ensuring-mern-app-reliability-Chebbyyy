import { useState, useEffect } from 'react';
import { getBugs, createBug } from './lib/api';
import BugItem from './components/BugItem';

function App() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const response = await getBugs();
      setBugs(response.data);
    } catch (error) {
      console.error('Error fetching bugs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBug({ title, description });
      setTitle('');
      setDescription('');
      fetchBugs();
    } catch (error) {
      console.error('Error creating bug:', error);
    }
  };

  const handleUpdate = () => {
    fetchBugs();
  };

  const handleDelete = () => {
    fetchBugs();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bug Tracker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Bug Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Bug Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Bug</button>
      </form>
      <div>
        {bugs.map((bug) => (
          <BugItem key={bug._id} bug={bug} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;