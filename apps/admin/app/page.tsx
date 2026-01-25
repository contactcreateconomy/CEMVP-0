export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Createconomy Admin Console
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Manage your Createconomy platform
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Dashboard
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            Users
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            Settings
          </button>
        </div>
      </div>
    </main>
  );
}
