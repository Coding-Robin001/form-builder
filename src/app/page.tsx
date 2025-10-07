export default async function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        Next.js 15 + <span className="text-indigo-600">Better Auth</span> Starter
      </h1>
      <p className="mt-3 text-gray-600 max-w-lg">
        A modern authentication starter kit for Next.js 15 — featuring seamless sign-in,
        dashboard, and secure session handling powered by Better Auth.
      </p>
      <div className="mt-6 flex gap-4">
        <a
          href="/auth"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
        <a
          href="https://github.com/Coding-Robin001/Next.js-15-Better-Auth-Starter"
          target="_blank"
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          View on GitHub
        </a>
      </div>
    </main>
  )
}
