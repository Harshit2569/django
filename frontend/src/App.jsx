import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);

  // Backend API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('API Response:', response.data);
      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else if (response.data && Array.isArray(response.data.results)) {
        // Handle DRF pagination
        setItems(response.data.results);
      } else {
        console.error('API did not return an array:', response.data);
        setItems([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    try {
      const response = await axios.post(API_URL, { name: newItem });
      setItems([response.data, ...items]);
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="card">
      <h1>Items</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item name"
          required
        />
        <button type="submit">Add item</button>
      </form>

      {loading ? (
        <p className="empty-state">Loading...</p>
      ) : (
        <ul>
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <li key={item.id}>
                <span className="item-name">{item.name}</span>
                <span className="item-date">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </li>
            ))
          ) : (
            <li className="empty-state">No items yet.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
