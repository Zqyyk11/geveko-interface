import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        <div className="ios-card p-6">
          <p className="text-gray-600">Settings page content coming soon...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;