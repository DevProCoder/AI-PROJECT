'use client';
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🛡️ AI Anti-Bullying Support
        </h1>
        <ChatInterface />
      </div>
    </main>
  );
}

function ChatInterface() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 h-96 flex flex-col">
      <div>Chat will appear here</div>
    </div>
  );
}
