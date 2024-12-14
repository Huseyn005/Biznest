import { notFound } from 'next/navigation'

const startups = [
  { id: '1', name: 'TechInnovate', description: 'Revolutionizing AI for small businesses', fullDescription: 'TechInnovate is at the forefront of bringing advanced AI solutions to small businesses. Our platform democratizes access to cutting-edge technology, enabling small enterprises to compete with larger corporations in terms of efficiency and innovation.' },
  { id: '2', name: 'GreenGrowth', description: 'Sustainable solutions for urban farming', fullDescription: 'GreenGrowth is transforming urban spaces into productive, sustainable farms. Our vertical farming technology and smart irrigation systems make it possible to grow fresh produce in the heart of cities, reducing food miles and increasing access to nutritious food.' },
  { id: '3', name: 'FinFlow', description: 'Streamlining financial processes for startups', fullDescription: 'FinFlow is revolutionizing financial management for startups. Our AI-powered platform automates bookkeeping, provides real-time financial insights, and simplifies fundraising processes, allowing founders to focus on growing their business.' },
]

export default function StartupPage({ params }: { params: { id: string } }) {
  const startup = startups.find(s => s.id === params.id)

  if (!startup) {
    notFound()
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">{startup.name}</h1>
      <p className="text-xl mb-8">{startup.description}</p>
      <h2 className="text-2xl font-semibold mb-4">About {startup.name}</h2>
      <p className="text-gray-700">{startup.fullDescription}</p>
      <button className="mt-8 bg-yellow-500 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-300">
        Contact Startup
      </button>
    </div>
  )
}

