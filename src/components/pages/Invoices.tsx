import { useState } from 'react';
import { Download, Eye, FileText } from 'lucide-react';
import { mockInvoices } from '@/lib/mockData';
import { StatusChip } from '@/components/StatusChip';

export function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(mockInvoices[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Invoice List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3>Invoices</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {mockInvoices.map((invoice) => (
              <button
                key={invoice.id}
                onClick={() => setSelectedInvoice(invoice)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedInvoice.id === invoice.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[var(--color-text-muted)]" />
                    <span className="font-mono text-xs">{invoice.number}</span>
                  </div>
                  <StatusChip status={invoice.status} />
                </div>
                <p className="text-[var(--color-text-main)] mb-1">
                  ${invoice.amount.toLocaleString()}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Due: {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice Detail */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="mb-1">{selectedInvoice.number}</h2>
                <p className="text-[var(--color-text-muted)]">
                  Issued: {new Date(selectedInvoice.date).toLocaleDateString()}
                </p>
              </div>
              <StatusChip status={selectedInvoice.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-[var(--color-text-muted)] text-xs mb-1">Total Amount</p>
                <p className="text-[var(--color-text-main)]">
                  ${selectedInvoice.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[var(--color-text-muted)] text-xs mb-1">Due Date</p>
                <p className="text-[var(--color-text-main)]">
                  {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>

          {/* Line Items */}
          <div className="p-6">
            <h3 className="mb-4">Line Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-[var(--color-text-muted)]">Container ID</th>
                    <th className="px-4 py-3 text-left text-[var(--color-text-muted)]">Route</th>
                    <th className="px-4 py-3 text-right text-[var(--color-text-muted)]">Days Rented</th>
                    <th className="px-4 py-3 text-right text-[var(--color-text-muted)]">Rate/Day</th>
                    <th className="px-4 py-3 text-right text-[var(--color-text-muted)]">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.lineItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <span className="font-mono text-[var(--color-primary-500)]">
                          {item.containerId}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.route}</td>
                      <td className="px-4 py-3 text-right">{item.daysRented}</td>
                      <td className="px-4 py-3 text-right">${item.rate}</td>
                      <td className="px-4 py-3 text-right">${item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-300">
                    <td colSpan={4} className="px-4 py-3 text-right">Total</td>
                    <td className="px-4 py-3 text-right">${selectedInvoice.amount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Options */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="mb-3">Export Options</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                Export as CSV
              </button>
              <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                Export as Excel
              </button>
              <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                Send to ERP
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-[var(--color-text-muted)] mb-1">Total Invoiced (Nov)</p>
            <p className="text-[var(--color-text-main)]">$28,350.00</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-[var(--color-text-muted)] mb-1">Outstanding</p>
            <p className="text-[var(--color-text-main)]">$12,600.00</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-[var(--color-text-muted)] mb-1">Avg. Cost/Day</p>
            <p className="text-[var(--color-text-main)]">$450.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
