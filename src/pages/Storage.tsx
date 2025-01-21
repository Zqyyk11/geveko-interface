import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, X } from 'lucide-react';

interface StorageItem {
  id: string;
  title: string;
  content: string;
  category: string;
}

const Storage = () => {
  const [items, setItems] = useState<StorageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', content: '', category: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setItems(prev => [...prev, { ...newItem, id: Date.now().toString() }]);
    setNewItem({ title: '', content: '', category: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(
    item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-purple"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-soft-purple text-gray-700 rounded-lg flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Item</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-white rounded-xl shadow-lg p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-purple"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-purple"
                />
                <textarea
                  placeholder="Content"
                  value={newItem.content}
                  onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-purple"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-soft-purple text-gray-700 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-lg p-6 relative"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </motion.button>
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-sm bg-soft-gray rounded-full">
                    {item.category || 'Uncategorized'}
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Storage;