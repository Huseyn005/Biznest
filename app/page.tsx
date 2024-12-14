import CategoryGrid from '@components/CategoryGrid';
import ProductCard from '@components/ProductCard';

const featuredProducts = [
    {
        id: '1',
        name: 'Kombi "Immergas EOLO STAR 24kW"',
        price: 1045,
        image: '/placeholder.svg?height=200&width=200',
        isPremium: true,
        isStore: true,
    },
    {
        id: '2',
        name: 'Xiaomi Redmi Note 13 Midnight Black 128GB/8GB',
        price: 320,
        image: '/placeholder.svg?height=200&width=200',
        isPremium: true,
    },
    {
        id: '3',
        name: 'Apple iPhone 16 Pro Desert Titanium 256GB/8GB',
        price: 2699,
        image: '/placeholder.svg?height=200&width=200',
        isPremium: true,
        isStore: true,
    },
    {
        id: '4',
        name: 'Həyət evi, Aşağı Güzdək qəs.',
        price: 66000,
        image: '/placeholder.svg?height=200&width=200',
        isPremium: true,
    },
];

export default function Home() {
    return (
        <div className="space-y-8">
            <CategoryGrid />

            <div>
                <h2 className="text-xl font-semibold mb-4 text-black">PREMIUM ELANLAR</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
