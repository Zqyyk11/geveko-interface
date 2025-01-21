import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-8"
          >
            <Link to="/" className="text-lg font-medium text-gray-900">
              Geveko Markings
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-[#9b87f5] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Product Calculator
              </Link>
              <Link
                to="/storage"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/storage') 
                    ? 'bg-[#9b87f5] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Storage
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;