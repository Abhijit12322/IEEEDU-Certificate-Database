'use client'
import React, { useState } from 'react';
import { Search, Database } from 'lucide-react';
import * as XLSX from 'xlsx';

interface DataRow {
  'Serial Number': string;
  Name: string;
  'Program\\ Events': string;
  'Issue Date': string;
  Position: string;
  'Program Photo Link': string;
  'Certificate URL': string;
}

function App() {
  const [serialNo, setSerialNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataRow[] | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!serialNo.trim()) {
      setError('Please enter a serial number or name');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch('/data.xlsx'); // Assuming data is stored in data.xlsx
      const arrayBuffer = await res.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: DataRow[] = XLSX.utils.sheet_to_json(sheet);

      const input = serialNo.trim().toLowerCase();

      // Search by either Serial Number or Name (case-insensitive)
      const matchedRows = jsonData.filter(
        (row) =>
          row['Serial Number'] === serialNo.trim() ||
          row.Name?.toLowerCase().includes(input) // Case-insensitive partial match for Name
      );

      if (matchedRows.length > 0) {
        setData(matchedRows); // Show all matching rows
      } else {
        setError('No data found for this serial number or name');
      }
    }  catch (err) {
      console.error('Error reading Excel file:', err);
      setError('Failed to read the Excel file. Make sure it exists and is formatted correctly.');
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
          <p className="mt-2 text-gray-600">Enter a serial number or name to view the details of certificate</p>
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

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md mb-4">
              {error}
            </div>
          )}

          {data && (
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left bg-gray-50 w-1/6">Serial Number</th>
                    <th className="px-4 py-2 text-left bg-gray-50">Name</th>
                    <th className="px-4 py-2 text-left bg-gray-50">Program / Events</th>
                    <th className="px-4 py-2 text-left bg-gray-50">Issue Date</th>
                    <th className="px-4 py-2 text-left bg-gray-50">Position</th>
                    <th className="px-4 py-2 text-left bg-gray-50">Program Photo</th>
                    <th className="px-4 py-2 text-left bg-gray-50">Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{row['Serial Number']}</td>
                      <td className="px-4 py-2">{row.Name}</td>
                      <td className="px-4 py-2">{row['Program\\ Events']}</td>
                      <td className="px-4 py-2">{row['Issue Date']}</td>
                      <td className="px-4 py-2">{row.Position}</td>
                      <td className="px-4 py-2">
                        <a
                          href={row['Program Photo Link']}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Photo
                        </a>
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href={row['Certificate URL']}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Certificate
                        </a>
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