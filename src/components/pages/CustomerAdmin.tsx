import { useState } from "react";
import { Plus, Key, FileText, Users as UsersIcon } from "lucide-react";
import { mockCustomers } from "@/lib/mockData";
import { StatusChip } from "@/components/StatusChip";
import { DataTable } from "@/components/DataTable";

export function CustomerAdmin() {
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0]);
  const [activeTab, setActiveTab] = useState<"profile" | "contracts" | "api">(
    "profile"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Customer Management</h2>
          <p className="text-[var(--color-text-muted)] mt-1">
            Manage customer accounts, contracts, and API access
          </p>
        </div>
        <button
          onClick={() => setShowNewCustomerModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Customer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-1">
          <DataTable
            columns={[
              {
                key: 'name',
                label: 'Customers',
                render: (customer) => (
                  <div>
                    <p className="text-[var(--color-text-main)]">{customer.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{customer.contractType}</p>
                  </div>
                ),
              },
            ]}
            data={mockCustomers}
            onRowClick={setSelectedCustomer}
            keyExtractor={(customer) => customer.id}
          />
        </div>

        {/* Customer Detail */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3>{selectedCustomer.name}</h3>
                  <p className="text-[var(--color-text-muted)] mt-1">
                    Customer ID: {selectedCustomer.id}
                  </p>
                </div>
                <StatusChip status={selectedCustomer.status} />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'profile', label: 'Profile', icon: UsersIcon },
                { id: 'contracts', label: 'Contracts', icon: FileText },
                { id: 'api', label: 'API Keys', icon: Key },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[var(--color-primary-500)] text-[var(--color-primary-500)]'
                        : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[var(--color-text-muted)] mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={selectedCustomer.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[var(--color-text-muted)] mb-2">
                        Contract Type
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Global Lease</option>
                        <option>Pay-per-Use</option>
                        <option>Regional Contract</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[var(--color-text-muted)] mb-2">
                      Billing Address
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      rows={3}
                      placeholder="Enter billing address..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[var(--color-text-muted)] mb-2">
                        Active Users
                      </label>
                      <input
                        type="number"
                        value={selectedCustomer.activeUsers}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[var(--color-text-muted)] mb-2">
                        API Usage Limit
                      </label>
                      <input
                        type="number"
                        value="1000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'contracts' && (
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-[var(--color-text-main)]">Global Lease Agreement</h4>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">
                          Contract ID: CONTR-2023-001
                        </p>
                      </div>
                      <StatusChip status="active" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-[var(--color-text-muted)]">Start Date</p>
                        <p className="text-[var(--color-text-main)]">Jan 1, 2023</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-muted)]">End Date</p>
                        <p className="text-[var(--color-text-main)]">Dec 31, 2025</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                      <button className="text-[var(--color-primary-500)] hover:underline text-xs">
                        Download PDF
                      </button>
                      <button className="text-[var(--color-primary-500)] hover:underline text-xs">
                        View Details
                      </button>
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-[var(--color-text-muted)] hover:border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] transition-colors">
                    + Upload New Contract
                  </button>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-[var(--color-text-main)]">
                      API keys provide programmatic access to container data and booking functions.
                      Keep these credentials secure and never share them publicly.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-[var(--color-text-main)]">Production Key</h4>
                          <p className="text-xs text-[var(--color-text-muted)] mt-1">
                            Created: Nov 1, 2023
                          </p>
                        </div>
                        <StatusChip status="active" />
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">Client ID</p>
                        <div className="flex gap-2">
                          <code className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs font-mono">
                            pk_live_51H8a9bK2lD3m4N5o6P7q8R9s
                          </code>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText('pk_live_51H8a9bK2lD3m4N5o6P7q8R9s');
                              alert('Copied to clipboard!');
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">Client Secret</p>
                        <div className="flex gap-2">
                          <code className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs font-mono">
                            ••••••••••••••••••••••••••••••••
                          </code>
                          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs">
                            Reveal
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs text-[var(--color-primary-500)] hover:underline">
                          Regenerate
                        </button>
                        <button className="text-xs text-red-600 hover:underline">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-[var(--color-text-muted)] hover:border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] transition-colors">
                    + Generate New API Key
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Customer Modal */}
      {showNewCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3>New Customer</h3>
              <p className="text-[var(--color-text-muted)] mt-1">
                Add a new customer to the platform
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[var(--color-text-muted)] mb-2">Company Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-[var(--color-text-muted)] mb-2">Contract Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Global Lease</option>
                  <option>Pay-per-Use</option>
                  <option>Regional Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-[var(--color-text-muted)] mb-2">Primary Contact Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="contact@company.com"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-2 justify-end">
              <button
                onClick={() => setShowNewCustomerModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Customer created successfully!');
                  setShowNewCustomerModal(false);
                }}
                className="px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
