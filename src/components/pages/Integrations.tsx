import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { mockIntegrations } from '@/lib/mockData';
import { StatusChip } from '@/components/StatusChip';

export function Integrations() {
  const [selectedIntegration, setSelectedIntegration] = useState(mockIntegrations[0]);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      alert('Connection test successful!');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Settings & Integrations</h2>
        <p className="text-[var(--color-text-muted)] mt-1">
          Configure system integrations and external data sources
        </p>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedIntegration(integration)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{integration.logo}</div>
                <div>
                  <h3 className="text-[var(--color-text-main)]">{integration.name}</h3>
                  <StatusChip status={integration.status} />
                </div>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  integration.status === 'connected'
                    ? 'bg-green-500'
                    : integration.status === 'error'
                    ? 'bg-red-500'
                    : 'bg-gray-300'
                }`}
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Last Sync</span>
                <span className="text-[var(--color-text-main)]">
                  {new Date(integration.lastSync).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Status</span>
                <span className="text-[var(--color-text-main)]">{integration.status}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIntegration(integration);
                  setShowConfigModal(true);
                }}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Configure
              </button>
            </div>
          </div>
        ))}

        {/* Add New Integration Card */}
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center hover:border-[var(--color-primary-500)] hover:bg-blue-50 transition-colors cursor-pointer">
          <div className="text-4xl mb-3">➕</div>
          <h3 className="text-[var(--color-text-main)] mb-1">Add Integration</h3>
          <p className="text-xs text-[var(--color-text-muted)] text-center">
            Connect a new service or data source
          </p>
        </div>
      </div>

      {/* Integration Details */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{selectedIntegration.logo}</div>
              <div>
                <h3>{selectedIntegration.name}</h3>
                <p className="text-[var(--color-text-muted)] mt-1">
                  Integration ID: {selectedIntegration.id}
                </p>
              </div>
            </div>
            <StatusChip status={selectedIntegration.status} />
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {selectedIntegration.status === 'connected' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : selectedIntegration.status === 'error' ? (
                  <XCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                )}
                <span className="text-[var(--color-text-main)]">Connection Status</span>
              </div>
              <p className="text-[var(--color-text-main)] capitalize">
                {selectedIntegration.status}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-[var(--color-text-muted)] mb-2">Last Successful Sync</p>
              <p className="text-[var(--color-text-main)]">
                {new Date(selectedIntegration.lastSync).toLocaleDateString()}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                {new Date(selectedIntegration.lastSync).toLocaleTimeString()}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-[var(--color-text-muted)] mb-2">Sync Frequency</p>
              <p className="text-[var(--color-text-main)]">Every 5 minutes</p>
            </div>
          </div>

          {selectedIntegration.status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-[var(--color-text-main)] mb-1">Connection Error</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Unable to authenticate with SAP ERP. Please check your credentials and try again.
                  </p>
                  <button className="mt-2 text-xs text-[var(--color-primary-500)] hover:underline">
                    View Error Log
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h4 className="text-[var(--color-text-main)]">Integration Settings</h4>

            <div>
              <label className="block text-[var(--color-text-muted)] mb-2">Endpoint URL</label>
              <input
                type="text"
                value="https://api.databricks.com/v2/"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[var(--color-text-muted)] mb-2">API Key / Secret</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="••••••••••••••••••••••••"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Reveal
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[var(--color-text-muted)] mb-2">Sync Options</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-[var(--color-text-main)]">Enable automatic sync</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-[var(--color-text-main)]">Send error notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-[var(--color-text-main)]">Retry failed requests</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex gap-2">
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
              {isTesting ? 'Testing...' : 'Test Connection'}
            </button>
            <button className="px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Configuration
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3>Recent Activity Log</h3>
        </div>
        <div className="p-6">
          <div className="space-y-2 font-mono text-xs">
            <div className="flex gap-4 text-[var(--color-text-muted)]">
              <span>2025-11-28 11:30:00</span>
              <span className="text-green-600">[INFO]</span>
              <span>Databricks sync completed successfully</span>
            </div>
            <div className="flex gap-4 text-[var(--color-text-muted)]">
              <span>2025-11-28 11:25:00</span>
              <span className="text-green-600">[INFO]</span>
              <span>Power BI data refresh initiated</span>
            </div>
            <div className="flex gap-4 text-[var(--color-text-muted)]">
              <span>2025-11-27 15:30:00</span>
              <span className="text-red-600">[ERROR]</span>
              <span>SAP ERP connection failed: Authentication error</span>
            </div>
            <div className="flex gap-4 text-[var(--color-text-muted)]">
              <span>2025-11-27 15:00:00</span>
              <span className="text-green-600">[INFO]</span>
              <span>Databricks sync completed successfully</span>
            </div>
          </div>
        </div>
      </div>

      {/* Config Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h3>Configure {selectedIntegration.name}</h3>
            </div>
            <div className="p-6">
              <p className="text-[var(--color-text-muted)]">
                Configuration modal for {selectedIntegration.name} integration.
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-2 justify-end">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
