import Link from 'next/link';
import Image from "next/legacy/image";
import { Heart } from 'lucide-react';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    location?: string;
    timestamp?: string;
    isPremium?: boolean;
    isStore?: boolean;
}

export default function ProductCard({ id, name, price, image, location = 'Bakı', timestamp = 'bugün, 17:44', isPremium = false, isStore = false }: ProductCardProps) {
    return (
        <Link href={`/product/${id}`}>
            <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-[0_0_10px_rgba(255,230,0,0.5)] transition-shadow duration-300">
                <div className="relative w-full h-48">
                    {' '}
                    {/* Ensure container has height */}
                    <Image
                        src={image}
                        alt={name}
                        layout="fill" // This will make the image fill the container
                        objectFit="cover" // Ensures the image covers the container without distortion
                        className="absolute top-0 left-0"
                    />
                    <button className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors">
                        <Heart className="h-5 w-5 text-black" />
                    </button>
                    {isPremium && <span className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">Premium</span>}
                    {isStore && <span className="absolute bottom-2 left-2 bg-black text-yellow-500 text-xs px-2 py-1 rounded">Mağaza</span>}
                </div>
                <div className="p-4">
                    <div className="font-bold text-xl mb-1 text-black">{price} AZN</div>
                    <h3 className="text-black text-sm mb-2 line-clamp-2">{name}</h3>
                    <div className="flex justify-between items-center text-xs text-gray-700">
                        <span>{location}</span>
                        <span>{timestamp}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
