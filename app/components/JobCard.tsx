'use client'

import { useState } from 'react'
import { deleteApplication, updateApplicationStatus } from '@/actions/applicationActions'

interface JobApplication {
  _id: string;
  company: string;
  role: string;
  status?: string;
  jobDescription?: string;
  coverLetter?: string;
  createdAt: string;
}

// Helper function to render correct badge colors
function getStatusBadgeClass(status?: string) {
  const norm = (status || "").toLowerCase();
  if (norm.includes("applied")) return "bg-green-100 text-green-800 border-green-200";
  if (norm.includes("interview")) return "bg-blue-100 text-blue-800 border-blue-200";
  if (norm.includes("rejected")) return "bg-red-100 text-red-800 border-red-200";
  if (norm.includes("offer")) return "bg-purple-100 text-purple-800 border-purple-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
}

export default function JobCard({ app }: { app: JobApplication }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200 group relative">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {app.company}
          </h3>
          <p className="text-base text-gray-600 font-medium">{app.role}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              defaultValue={app.status || "Applied"}
              onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
              className={`appearance-none cursor-pointer outline-none px-3 py-1.5 pr-8 text-xs font-bold rounded-full border ${getStatusBadgeClass(app.status)} shadow-sm whitespace-nowrap focus:ring-2 focus:ring-blue-500`}
            >
              <option value="Wishlist">Wishlist</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
            title="Delete Application"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {app.jobDescription}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center text-xs font-medium text-gray-400">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Added on {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        
        {app.coverLetter && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            {isExpanded ? 'Hide Cover Letter' : 'View Cover Letter'}
            <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        )}
      </div>

      {isExpanded && app.coverLetter && (
        <div className="mt-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h4 className="text-sm font-bold text-gray-900 mb-3">AI Generated Cover Letter</h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {app.coverLetter}
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Application?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteApplication(app._id);
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 font-medium bg-red-600 text-white hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
