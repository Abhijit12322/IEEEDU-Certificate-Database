'use client';
import React, { useState } from 'react';
import { Search, Database } from 'lucide-react';

const BACKEND_URL = 'https://ieeedu-admincertificate.onrender.com';

interface DataRow {
  serialNumber: string;
  name: string;
  programEvents: string;
  issueDate: string;
  position: string;
  programPhotoLink: string;
  certificateUrl: string;
}

function App() {
  const [serialNo, setSerialNo] = useState('');
  const [data, setData] = useState<DataRow[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!serialNo.trim()) {
      setError('Please enter a serial number or name');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`${BACKEND_URL}/participants`);
      const jsonData: DataRow[] = await res.json();

      const input = serialNo.trim().toLowerCase();
      const matchedRows = jsonData.filter(
        (row) =>
          row.serialNumber === serialNo.trim() ||
          row.name?.toLowerCase().includes(input)
      );

      if (matchedRows.length > 0) {
        setData(matchedRows);
      } else {
        setError('No data found for this serial number or name');
      }
    } catch (err) {
      console.error('Error fetching participants:', err);
      setError('Failed to fetch data from server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-20 px-4">
        <div className="text-center mb-8">
          <Database className="w-20 h-20 mx-auto text-blue-600 mb-4" />
          <h1 className="text-5xl font-bold text-gray-900">Certificate Data Viewer</h1>
          <p className="mt-2 text-gray-600">Enter a serial number or name to view certificate details</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              placeholder="Enter serial number or name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4">{error}</div>}

          {data && (
            <div className="border border-gray-200 rounded-md overflow-auto">
              <table className="w-full text-m">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="px-4 py-2 text-left">Serial Number</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Program / Events</th>
                    <th className="px-4 py-2 text-left">Issue Date</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-left">Photo</th>
                    <th className="px-4 py-2 text-left">Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{row.serialNumber}</td>
                      <td className="px-4 py-2">{row.name}</td>
                      <td className="px-4 py-2">{row.programEvents}</td>
                      <td className="px-4 py-2">{row.issueDate}</td>
                      <td className="px-4 py-2">{row.position}</td>
                      <td className="px-4 py-2">
                        <a href={row.programPhotoLink} className="text-blue-600 underline" target="_blank">Photo</a>
                      </td>
                      <td className="px-4 py-2">
                        <a href={row.certificateUrl} className="text-blue-600 underline" target="_blank">Certificate</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
