import { useState } from 'react';
import { Plus, Calendar, Plane } from 'lucide-react';
import { mockContainers } from '@/lib/mockData';
import { StatusChip } from '@/components/StatusChip';

export function ShipmentsBookings() {
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'new'>('active');
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Shipments & Bookings</h2>
          <p className="text-[var(--color-text-muted)] mt-1">
            Manage container bookings and shipment details
          </p>
        </div>
        <button
          onClick={() => setShowNewBookingModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'active', label: 'Active Bookings', count: mockContainers.length },
            { id: 'history', label: 'Booking History', count: 23 },
            { id: 'new', label: 'New Requests', count: 0 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[var(--color-primary-500)] text-[var(--color-primary-500)]'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-[var(--color-primary-500)]'
                  : 'bg-gray-100 text-[var(--color-text-muted)]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Active Bookings */}
        {activeTab === 'active' && (
          <div className="p-6">
            <div className="space-y-4">
              {mockContainers.map((container) => (
                <div
                  key={container.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Plane className="w-6 h-6 text-[var(--color-primary-500)]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[var(--color-primary-500)]">
                            {container.id}
                          </span>
                          <StatusChip status={container.status} />
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          AWB: {container.awb}
                        </p>
                      </div>
                    </div>
                    <button className="text-[var(--color-primary-500)] hover:underline">
                      View Details
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <p className="text-[var(--color-text-muted)] mb-1">Route</p>
                      <p className="text-[var(--color-text-main)]">
                        {container.origin} → {container.destination}
                      </p>
                    </div>
                    <div>
                      <p className="text-[var(--color-text-muted)] mb-1">Current Location</p>
                      <p className="text-[var(--color-text-main)]">{container.currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-[var(--color-text-muted)] mb-1">Lease Start</p>
                      <div className="flex items-center gap-1 text-[var(--color-text-main)]">
                        <Calendar className="w-3 h-3" />
                        {new Date(container.leaseStart).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <p className="text-[var(--color-text-muted)] mb-1">Temperature</p>
                      <p className="text-[var(--color-text-main)]">{container.temperature}°C</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking History */}
        {activeTab === 'history' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-[var(--color-text-muted)]">Booking ID</th>
                    <th className="px-4 py-3 text-left text-[var(--color-text-muted)]">Container</th>
                    <th className="px-4 py-3 text-left text-[var(--color-text-muted)]">Route</th>
                    <th className="px-4 py-3 text-left text-[var(--color-text-muted)]">Duration</th>
                    <th className="px-4 py-3 text-left text-[var(--color-text-muted)]">Completed</th>
                    <th className="px-4 py-3 text-left text-[var(--color-text-muted)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-xs">BK-2310-045</td>
                    <td className="px-4 py-3 font-mono text-[var(--color-primary-500)]">OC-2301</td>
                    <td className="px-4 py-3">FRA → JFK</td>
                    <td className="px-4 py-3">14 days</td>
                    <td className="px-4 py-3">Nov 15, 2025</td>
                    <td className="px-4 py-3">
                      <StatusChip status="success" label="Completed" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-xs">BK-2310-044</td>
                    <td className="px-4 py-3 font-mono text-[var(--color-primary-500)]">OC-2302</td>
                    <td className="px-4 py-3">SIN → LAX</td>
                    <td className="px-4 py-3">21 days</td>
                    <td className="px-4 py-3">Nov 10, 2025</td>
                    <td className="px-4 py-3">
                      <StatusChip status="success" label="Completed" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* New Requests */}
        {activeTab === 'new' && (
          <div className="p-12 text-center">
            <p className="text-[var(--color-text-muted)] mb-4">No new booking requests</p>
            <button
              onClick={() => setShowNewBookingModal(true)}
              className="text-[var(--color-primary-500)] hover:underline"
            >
              Create a new booking
            </button>
          </div>
        )}
      </div>

      {/* New Booking Modal */}
      {showNewBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3>New Booking Request</h3>
              <p className="text-[var(--color-text-muted)] mt-1">
                Reserve a container for your shipment
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--color-text-muted)] mb-2">Container Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>RKN (2-8°C)</option>
                    <option>RAP (15-25°C)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--color-text-muted)] mb-2">Quantity</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="1"
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--color-text-muted)] mb-2">Origin Airport</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., FRA"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-text-muted)] mb-2">Destination Airport</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., JFK"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--color-text-muted)] mb-2">Departure Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[var(--color-text-muted)] mb-2">Estimated Duration</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Days"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--color-text-muted)] mb-2">Air Waybill (AWB)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="AWB-123456789"
                />
              </div>

              <div>
                <label className="block text-[var(--color-text-muted)] mb-2">Special Requirements</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Enter any special handling or temperature requirements..."
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--color-text-muted)]">Estimated Cost</span>
                  <span className="text-[var(--color-text-main)]">$450/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Total (7 days)</span>
                  <span className="text-[var(--color-text-main)]">$3,150</span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-2 justify-end">
              <button
                onClick={() => setShowNewBookingModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Booking request submitted successfully!');
                  setShowNewBookingModal(false);
                }}
                className="px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
