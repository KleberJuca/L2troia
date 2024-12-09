import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useServerSettings } from '../../../hooks/useServerSettings';

const chronicles = ['Interlude', 'Kamael', 'Hellbound', 'Gracia', 'High Five'];

export default function AdminSettings() {
  const { settings, loading, error, loadSettings, updateSettings } = useServerSettings();

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateSettings({
        chronicle: formData.get('chronicle') as string,
        expRate: Number(formData.get('expRate')),
        dropRate: Number(formData.get('dropRate')),
        adenaRate: Number(formData.get('adenaRate')),
        clientDownloadUrl: formData.get('clientDownloadUrl') as string,
        patchDownloadUrl: formData.get('patchDownloadUrl') as string,
        clientVersion: formData.get('clientVersion') as string,
        patchVersion: formData.get('patchVersion') as string,
        clientSize: formData.get('clientSize') as string,
        patchSize: formData.get('patchSize') as string
      });
      alert('Settings updated successfully!');
    } catch (error) {
      alert('Failed to update settings');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Server Settings</h1>

      <div className="bg-gray-800 p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Server Settings */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Server Configuration</h2>
              
              <div>
                <label className="block text-sm font-medium mb-1">Chronicle</label>
                <select
                  name="chronicle"
                  defaultValue={settings.chronicle}
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {chronicles.map((chronicle) => (
                    <option key={chronicle} value={chronicle}>
                      {chronicle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Exp Rate</label>
                <input
                  type="number"
                  name="expRate"
                  defaultValue={settings.expRate}
                  min="1"
                  max="1000"
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Drop Rate</label>
                <input
                  type="number"
                  name="dropRate"
                  defaultValue={settings.dropRate}
                  min="1"
                  max="1000"
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Adena Rate</label>
                <input
                  type="number"
                  name="adenaRate"
                  defaultValue={settings.adenaRate}
                  min="1"
                  max="10000"
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Download Settings */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Download Settings</h2>
              
              <div>
                <label className="block text-sm font-medium mb-1">Client Download URL</label>
                <input
                  type="url"
                  name="clientDownloadUrl"
                  defaultValue={settings.clientDownloadUrl}
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Client Version</label>
                <input
                  type="text"
                  name="clientVersion"
                  defaultValue={settings.clientVersion}
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Client Size</label>
                <input
                  type="text"
                  name="clientSize"
                  defaultValue={settings.clientSize}
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Patch Download URL</label>
                <input
                  type="url"
                  name="patchDownloadUrl"
                  defaultValue={settings.patchDownloadUrl}
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Patch Version</label>
                <input
                  type="text"
                  name="patchVersion"
                  defaultValue={settings.patchVersion}
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Patch Size</label>
                <input
                  type="text"
                  name="patchSize"
                  defaultValue={settings.patchSize}
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </form>
      </div>
    </motion.div>
  );
}