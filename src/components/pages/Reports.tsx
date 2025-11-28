import { useState } from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { mockContainers } from '@/lib/mockData';

export function Reports() {
  const [reportType, setReportType] = useState('temperature');
  const [selectedContainer, setSelectedContainer] = useState('all');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Report generated successfully! Download starting...');
    }, 2000);
  };

  const reportTypes = [
    { id: 'temperature', label: 'Temperature Logs', description: 'Detailed temperature data for compliance' },
    { id: 'compliance', label: 'Compliance Bundle', description: 'Complete GDP compliance package' },
    { id: 'utilization', label: 'Fleet Utilization', description: 'Container usage statistics' },
    { id: 'billing', label: 'Billing Summary', description: 'Cost breakdown and invoicing details' },
    { id: 'maintenance', label: 'Maintenance Reports', description: 'Service history and schedules' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Reports & Documents</h2>
        <p className="text-[var(--color-text-muted)] mt-1">
          Generate compliance reports and export shipment data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Type Selection */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">Select Report Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    reportType === type.id
                      ? 'border-[var(--color-primary-500)] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FileText className={`w-5 h-5 mt-0.5 ${
                      reportType === type.id
                        ? 'text-[var(--color-primary-500)]'
                        : 'text-[var(--color-text-muted)]'
                    }`} />
                    <div>
                      <p className="text-[var(--color-text-main)] mb-1">{type.label}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{type.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-[var(--color-text-muted)]" />
              <h3>Report Filters</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[var(--color-text-muted)] mb-2">Container Selection</label>
                <select
                  value={selectedContainer}
                  onChange={(e) => setSelectedContainer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Containers</option>
                  {mockContainers.map((container) => (
                    <option key={container.id} value={container.id}>
                      {container.id} - {container.origin} → {container.destination}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[var(--color-text-muted)] mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="last-7-days">Last 7 Days</option>
                    <option value="last-30-days">Last 30 Days</option>
                    <option value="last-90-days">Last 90 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  {dateRange === 'custom' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-[var(--color-text-muted)]">to</span>
                      <input
                        type="date"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {reportType === 'temperature' && (
                <div>
                  <label className="block text-[var(--color-text-muted)] mb-2">Data Granularity</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Hourly</option>
                    <option>Daily Average</option>
                  </select>
                </div>
              )}

              {reportType === 'compliance' && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-[var(--color-text-main)] mb-2">
                    This bundle includes:
                  </p>
                  <ul className="text-xs text-[var(--color-text-muted)] space-y-1">
                    <li>• Temperature log PDF</li>
                    <li>• Sensor calibration certificate</li>
                    <li>• Lease agreement</li>
                    <li>• Maintenance records</li>
                    <li>• Pro forma invoice</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Generate Report
              </>
            )}
          </button>
        </div>

        {/* Recent Reports Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">Recent Reports</h3>
            <div className="space-y-3">
              {[
                { name: 'Temperature_Log_OC-2401.pdf', date: '2025-11-28', size: '1.2 MB' },
                { name: 'Compliance_Bundle_Nov.zip', date: '2025-11-27', size: '4.8 MB' },
                { name: 'Fleet_Utilization_Q4.xlsx', date: '2025-11-25', size: '856 KB' },
                { name: 'Billing_Summary_Nov.pdf', date: '2025-11-24', size: '342 KB' },
              ].map((report, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[var(--color-primary-500)] mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--color-text-main)] mb-1">{report.name}</p>
                        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                          <Calendar className="w-3 h-3" />
                          <span>{report.date}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="text-xs text-[var(--color-primary-500)] hover:underline">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4">Export Formats</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-[var(--color-text-main)]">PDF</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-[var(--color-text-main)]">CSV</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-[var(--color-text-main)]">Excel (XLSX)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-[var(--color-text-main)]">JSON</span>
              </label>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <h3 className="mb-3">Quick Actions</h3>
            <div className="space-y-2 text-xs">
              <button className="w-full text-left text-[var(--color-primary-500)] hover:underline">
                Schedule Automated Reports
              </button>
              <button className="w-full text-left text-[var(--color-primary-500)] hover:underline">
                Email Report to Team
              </button>
              <button className="w-full text-left text-[var(--color-primary-500)] hover:underline">
                View Report Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
