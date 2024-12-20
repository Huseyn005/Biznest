import Link from 'next/link';

interface StartupCardProps {
    id: string;
    name: string;
    description: string;
}

export default function StartupCard({ id, name, description }: StartupCardProps) {
    return (
        <Link href={`/startup/${id}`}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </Link>
    );
}
