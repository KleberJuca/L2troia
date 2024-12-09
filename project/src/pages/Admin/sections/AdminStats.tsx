import { motion } from 'framer-motion';

export default function AdminStats() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Player Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Registered</span>
              <span>1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Today</span>
              <span>456</span>
            </div>
            <div className="flex justify-between items-center">
              <span>New This Week</span>
              <span>78</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Server Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Uptime</span>
              <span>99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Average Load</span>
              <span>45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Memory Usage</span>
              <span>67%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}