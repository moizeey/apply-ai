'use client'

import { addApplication } from "@/actions/applicationActions"

export default function JobForm() {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Application</h2>

            <form action={addApplication} className="flex flex-col gap-5">
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="e.g., Google"
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        placeholder="e.g., Software Engineer"
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                </div>
                <div>
                    <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        placeholder="Paste the job description here..."
                        required
                        rows={5}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full mt-2 bg-blue-600 font-semibold text-white py-3 px-4 rounded-lg hover:bg-blue-700 hover:shadow-md focus:ring-4 focus:ring-blue-500/20 active:bg-blue-800 transition-all duration-200"
                >
                    Save Application
                </button>
            </form>
        </div>
    )
}