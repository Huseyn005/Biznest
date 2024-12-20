import StartupCard from '../components/StartupCard';

const allStartups = [
    { id: '1', name: 'TechInnovate', description: 'Revolutionizing AI for small businesses' },
    { id: '2', name: 'GreenGrowth', description: 'Sustainable solutions for urban farming' },
    { id: '3', name: 'FinFlow', description: 'Streamlining financial processes for startups' },
    { id: '4', name: 'HealthHub', description: 'Connecting patients with healthcare providers' },
    { id: '5', name: 'EduTech', description: 'Personalized learning experiences for students' },
    { id: '6', name: 'CleanEnergy', description: 'Innovative solutions for renewable energy' },
];

export default function Marketplace() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Startup Marketplace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allStartups.map(startup => (
                    <StartupCard key={startup.id} {...startup} />
                ))}
            </div>
        </div>
    );
}
