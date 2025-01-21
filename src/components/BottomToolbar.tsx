import { Link, useLocation } from 'react-router-dom';
import { Home, Database, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomToolbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100"
    >
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 ${
              isActive('/') ? 'text-[#ff6b00]' : 'text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/storage"
            className={`flex flex-col items-center space-y-1 ${
              isActive('/storage') ? 'text-[#ff6b00]' : 'text-gray-600'
            }`}
          >
            <Database size={24} />
            <span className="text-xs">Storage</span>
          </Link>
          <Link
            to="/settings"
            className={`flex flex-col items-center space-y-1 ${
              isActive('/settings') ? 'text-[#ff6b00]' : 'text-gray-600'
            }`}
          >
            <Settings size={24} />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BottomToolbar;