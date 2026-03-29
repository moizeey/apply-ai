import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";

export default async function Home() {
  await connectToDatabase();

  const applicationsResult = await Application.find().sort({ createdAt: -1 }).lean();

  // Serialize MongoDB documents into plain JS objects
  const applications = applicationsResult.map((app: any) => ({
    _id: app._id.toString(),
    company: app.company,
    role: app.role,
    status: app.status,
    jobDescription: app.jobDescription,
    coverLetter: app.coverLetter,
    createdAt: app.createdAt.toISOString()
  }));

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex flex-col  text-center lg:text-left">
          <h1 className="text-3xl p-2 font-extrabold tracking-tight text-gray-900 sm:text-4xl shadow-sm rounded">
            ApplyAI Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl">
            Track your job applications, tailored cover letters, and interview progress all in one place.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
            <JobForm />
          </div>

          {/* Right Column: Applications List */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Applications</h2>

            <div className="flex flex-col gap-6">
              {applications.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500 shadow-sm">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="text-base">No Applications saved yet. Add one using the form.</p>
                </div>
              ) : (
                applications.map((app) => (
                  <JobCard key={app._id} app={app} />
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
