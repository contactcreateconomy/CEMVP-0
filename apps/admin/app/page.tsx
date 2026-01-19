export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-slate-700 via-gray-900 to-black">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center space-y-8 bg-white/95 backdrop-blur-lg p-12 rounded-2xl shadow-2xl">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            CreateEconomy Admin
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center max-w-lg">
            Administration console for CreateEconomy platform
          </p>
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
            <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full" />
            <div className="h-1 w-16 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full" />
          </div>
          <p className="text-2xl font-semibold text-gray-400 mb-6">
            ⚙️ Coming Soon
          </p>
          <div className="space-y-3">
            <p className="text-gray-400 text-lg">
              Manage users, tenants, and platform settings
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-sm font-medium text-gray-400">Users</div>
              </div>
              <div className="bg-white/10 p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-2">🏢</div>
                <div className="text-sm font-medium text-gray-400">Tenants</div>
              </div>
              <div className="bg-white/10 p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-sm font-medium text-gray-400">Analytics</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
