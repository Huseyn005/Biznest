import Link from 'next/link';
import Image from "next/legacy/image";

const categories = [
    { id: 1, name: 'Kafe və Restoranlar', icon: 'https://cdn-icons-png.flaticon.com/512/9620/9620771.png' },
    { id: 2, name: 'Gözəllik Salonları', icon: 'https://cdn-icons-png.flaticon.com/512/3791/3791216.png' },
    { id: 3, name: 'Fitness & SPA Mərkəzləri', icon: 'https://cdn-icons-png.flaticon.com/512/13632/13632470.png' },
    { id: 4, name: 'Təlim-Tədris mərkəzləri', icon: 'https://cdn-icons-png.flaticon.com/512/9733/9733500.png' },
    { id: 5, name: 'Tibb mərkəzləri və klinikalar', icon: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png' },
    { id: 6, name: 'Mədəniyyət obyektləri', icon: 'https://cdn-icons-png.flaticon.com/512/10987/10987278.png' },
    { id: 7, name: 'Hotellər və Turizm biznesləri', icon: 'https://cdn-icons-png.flaticon.com/512/3009/3009487.png' },
    { id: 8, name: 'Market və satış biznəsləri', icon: 'https://cdn-icons-png.flaticon.com/512/2552/2552166.png' },
];

export default function CategoryGrid() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
            {categories.map(category => (
                <Link key={category.id} href={`/category/${category.id}`} className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-[0_0_10px_rgba(255,230,0,0.5)] transition-shadow">
                    <div className="w-12 h-16 mb-2 relative">
                        <Image src={category.icon} alt={category.name} layout='fill' className="object-contain" />
                    </div>
                    <span className="text-sm text-center text-black">{category.name}</span>
                </Link>
            ))}
        </div>
    );
}
