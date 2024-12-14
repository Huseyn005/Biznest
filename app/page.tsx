import CategoryGrid from '@components/CategoryGrid';
import ProductCard from '@components/ProductCard';

const featuredProducts = [
    {
        id: '1',
        name: 'Altı Moyka Üstü Çayxana',
        price: 49999,
        image: 'https://bzns.az/storage/announcements/preview/02o1kewwWsTbZzNpoE5eYJx010e92diXH2rprko6.jpg',
        isPremium: true,
        isStore: true,
    },
    {
        id: '2',
        name: 'Bərbərxana',
        price: 16500,
        image: 'https://bzns.az/storage/announcements/big/sCw5GbkMkibHAI7BVyxXCZK8VWagbs3wx8lbbNb3.jpg',
        isPremium: true,
    },
    {
        id: '3',
        name: 'Yeni Açılmış Tədris Mərkəzi Satılır',
        price: 120000,
        image: 'https://avatars.mds.yandex.net/get-altay/4392922/2a0000018296e1783fff9171cdf0f056a2ad/orig',
        isPremium: true,
        isStore: true,
    },
    {
        id: '4',
        name: 'Bilyard Salonu',
        price: 66000,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f8/88/d2/getlstd-property-photo.jpg?w=1200&h=-1&s=1',
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
