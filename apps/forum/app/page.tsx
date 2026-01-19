export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-emerald-50 via-teal-600 to-cyan-700">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center space-y-8 bg-white/90 backdrop-blur-lg p-12 rounded-2xl shadow-2xl">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            CreateEconomy Forum
          </h1>
          <p className="text-xl text-emerald-100 mb-8 text-center max-w-lg">
            Community discussions about AI workflows
          </p>
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
            <div className="h-1 w-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full" />
            <div className="h-1 w-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full" />
          </div>
          <p className="text-2xl font-semibold text-emerald-200 mb-6">
            💬 Coming Soon
          </p>
          <div className="space-y-3">
            <p className="text-gray-300 text-lg">
              Join the conversation and share your ideas
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/20 p-6 rounded-xl">
                <div className="text-4xl mb-2">💭</div>
                <div className="text-sm font-medium text-emerald-200">Discuss</div>
              </div>
              <div className="bg-white/20 p-6 rounded-xl">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-sm font-medium text-emerald-200">Share</div>
              </div>
              <div className="bg-white/20 p-6 rounded-xl">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-sm font-medium text-emerald-200">Learn</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
