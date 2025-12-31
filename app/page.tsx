'use client';
import React, { useState } from 'react';
// 1. Added Next.js Image component for optimization
import Image from 'next/image';
import {
  Search,
  // Database, <--- Removed this unused import
  FileText,
  Image as ImageIcon,
  Loader2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Users,
  Building2,
  Lock
} from 'lucide-react';

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
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!serialNo.trim()) {
      setError('Please enter a serial number or name');
      const input = document.getElementById('searchInput');
      input?.classList.add('animate-shake');
      setTimeout(() => input?.classList.remove('animate-shake'), 500);
      return;
    }

    setLoading(true);
    setError('');
    setData(null);
    setHasSearched(true);

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
      }
    } catch (err) {
      console.error('Error fetching participants:', err);
      setError('Failed to fetch data from server.');
    } finally {
      setLoading(false);
    }
  };

  const getPositionStyle = (pos: string) => {
    const p = pos.toLowerCase();
    if (p.includes('winner') || p.includes('1st')) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (p.includes('runner') || p.includes('2nd')) return 'bg-slate-100 text-slate-700 border-slate-300';
    if (p.includes('coordinator')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    return 'bg-sky-50 text-sky-700 border-sky-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 font-sans text-slate-900 overflow-x-hidden flex flex-col">

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent opacity-50"></div>
      </div>

      <main className="flex-grow relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 w-full">

        {/* Branding & Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-[fade-in-up_0.6s_ease-out_both]">

          {/* --- LOCAL LOGO SECTION (Fixed with Next.js Image) --- */}
          <div className="flex justify-center mb-8">
            <Image
              src="/4.png"
              alt="IEEE Dibrugarh University Logo"
              width={120}
              height={120}
              className="h-24 md:h-28 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-indigo-100 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-indigo-900 tracking-wide uppercase">Official IEEE Dibrugarh University Database</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
            Certificate Validation <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Portal</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Welcome to the centralized verification system. Ensure the authenticity of academic and co-curricular achievements issued by the IEEE Dibrugarh University Student Branch.
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 border border-white/50 p-3 mb-20 transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group/input" id="searchInput">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
              </div>
              <input
                type="text"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
                placeholder="Enter Certificate Serial ID (e.g., IEEE20240001) or Name..."
                className="block w-full pl-14 pr-4 py-4 bg-transparent border-transparent focus:border-transparent focus:ring-0 text-slate-900 placeholder-slate-400 text-lg font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Verify Now'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-12 p-4 bg-red-50/90 backdrop-blur border border-red-100 text-red-700 rounded-xl flex items-center gap-3 animate-[fade-in_0.3s_ease-out]">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            {error}
          </div>
        )}

        {/* --- DETAILED INFO SECTION (Visible when not searching) --- */}
        {!data && !hasSearched && (
          <div className="animate-[fade-in_1s_ease-out]">

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20">
              <div className="bg-white/60 p-4 rounded-2xl border border-white text-center">
                <div className="text-2xl font-bold text-indigo-600">500+</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Certificates Issued</div>
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-white text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Events Hosted</div>
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-white text-center">
                <div className="text-2xl font-bold text-indigo-600">24/7</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Verification API</div>
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-white text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Uptime</div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900">Why Verification Matters?</h2>
              <p className="text-slate-500 mt-2">Ensuring trust and transparency in every achievement.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Lock className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Tamper-Proof Data</h3>
                <p className="text-slate-500 leading-relaxed">
                  Our certificates are stored in a secure, immutable database. This prevents forgery and ensures that every credential presented is legitimate and unaltered.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                  <Globe className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Global Accessibility</h3>
                <p className="text-slate-500 leading-relaxed">
                  {/* Fixed: candidate's -> candidate&apos;s */}
                  Recruiters, universities, and institutions worldwide can instantly verify a candidate&apos;s claims without needing to contact the student branch manually.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Validation</h3>
                <p className="text-slate-500 leading-relaxed">
                  Simply enter the unique serial number found on the certificate. The system checks our records in milliseconds and returns the official status.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- RESULTS TABLE --- */}
        {data && (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-slate-800 text-xl">Verification Results</h3>
                <p className="text-slate-500 text-sm mt-1">Official records retrieved from the database</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4" /> Authenticated
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/30">
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Serial ID</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Participant</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Issuer</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Event Details</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Documents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.map((row, index) => (
                    <tr key={index} className="hover:bg-indigo-50/30 transition-all duration-200 ease-in-out hover:-translate-y-0.5 group/row">
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 mx-auto sm:mx-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                          {row.serialNumber}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
                            {row.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{row.name}</div>
                            <div className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getPositionStyle(row.position)}`}>
                              {row.position}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-slate-400" /> IEEE Branch
                          </span>
                          <span className="text-xs text-slate-400 pl-4">Verified Issuer</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold text-slate-800">{row.programEvents}</span>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Calendar className="w-3 h-3" />
                            <span className="font-medium">Issued: {row.issueDate}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-3">
                          {row.programPhotoLink && (
                            <a
                              href={row.programPhotoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 text-slate-400 hover:text-indigo-600 bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 rounded-xl transition-all shadow-sm group/btn"
                              title="Event Photo"
                            >
                              <ImageIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                            </a>
                          )}
                          {row.certificateUrl && (
                            <a
                              href={row.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wide rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-0.5"
                            >
                              <FileText className="w-4 h-4" />
                              Certificate
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" />
                This record is digitally signed and secured by the IEEE Student Branch database.
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!data && hasSearched && !loading && !error && (
          <div className="text-center py-24 bg-white/80 backdrop-blur rounded-3xl border border-slate-200 border-dashed animate-in fade-in zoom-in-95 duration-500">
            <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Records Found</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              {/* Fixed: couldn't -> couldn&apos;t */}
              We couldn&apos;t find a certificate matching that Serial ID. Please check the ID on your document and try again.
            </p>
            <button
              onClick={() => { setSerialNo(''); setHasSearched(false); }}
              className="mt-6 text-indigo-600 font-semibold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

      {/* Footer - Simplified (Links Removed) */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">

          {/* Branding - Centered */}
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-slate-900">IEEE<span className="text-indigo-600">Verify</span></span>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed max-w-md mb-8">
            The official digital credential verification system for the IEEE Student Branch. Dedicated to maintaining the integrity of academic and professional achievements.
          </p>

          {/* Copyright & Icons */}
          <div className="w-full border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} IEEE Student Branch. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Globe className="w-5 h-5 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
              <Users className="w-5 h-5 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
              <Building2 className="w-5 h-5 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;