'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

import Image from "next/legacy/image";
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

// This would typically come from an API or database
const products = [
    {
        id: '1',
        name: 'Altı Moyka Üstü Çayxana',
        price: 49999,
        image: 'https://bzns.az/storage/announcements/preview/02o1kewwWsTbZzNpoE5eYJx010e92diXH2rprko6.jpg',
        isPremium: true,
        isStore: true,
        description: 'Tam təmirli, işlək vəziyyətdə olan biznes satılır. Alt mərtəbədə 3 boxlu avtoyuma, üst mərtəbədə isə çay evi yerləşir.',
        location: 'Bakı şəhəri, Yasamal',
        coordinates: { lat: 40.3776, lng: 49.8925 },
        phone: '+994 55 123 45 67',
        email: 'info@altimoyka.az',
        postedDate: '2024-12-19',
    },
    {
        id: '2',
        name: 'Bərbərxana',
        price: 16500,
        image: 'https://bzns.az/storage/announcements/big/sCw5GbkMkibHAI7BVyxXCZK8VWagbs3wx8lbbNb3.jpg',
        isPremium: true,
        isStore: false, // Explicitly set isStore to false
        description: 'İşlək vəziyyətdə olan bərbərxana satılır. Tam təchizatlı, müştəri bazası olan.',
        location: 'Bakı şəhəri, Nərimanov',
        coordinates: { lat: 40.4093, lng: 49.8671 },
        phone: '+994 50 987 65 43',
        email: 'info@berbershop.az',
        postedDate: '2024-12-14',
    },
    {
        id: '3',
        name: 'Yeni Açılmış Tədris Mərkəzi Satılır',
        price: 120000,
        image: 'https://avatars.mds.yandex.net/get-altay/4392922/2a0000018296e1783fff9171cdf0f056a2ad/orig',
        isPremium: true,
        isStore: true,
        description: 'Tam təchizatlı, yeni açılmış tədris mərkəzi satılır. Hazır müştəri bazası və peşəkar müəllim heyəti.',
        location: 'Bakı şəhəri, Xətai',
        coordinates: { lat: 40.3872, lng: 49.9503 },
        phone: '+994 70 555 55 55',
        email: 'info@tedrismarkezi.az',
        postedDate: '2024-12-15',
    },
    {
        id: '4',
        name: 'Bilyard Salonu',
        price: 66000,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f8/88/d2/getlstd-property-photo.jpg?w=1200&h=-1&s=1',
        isPremium: true,
        isStore: false, // Explicitly set isStore to false
        description: 'İşlək vəziyyətdə olan bilyard salonu satılır. 5 stol, bar və istirahət guşəsi mövcuddur.',
        location: 'Bakı şəhəri, Nəsimi',
        coordinates: { lat: 40.3893, lng: 49.8519 },
        phone: '+994 50 999 99 99',
        email: 'info@bilyardsalonu.az',
        postedDate: '2024-12-19',
    },
    {
        id: '5',
        name: 'Araz Supermarket',
        price: 149999,
        image: 'https://arazmarket.az/site/assets/files/1039/araz-market-haqqimizda.570x475.webp',
        isPremium: true,
        isStore: true,
        location: 'Bakı şəhəri, Xətai',
        description: 'Yaxşı tanınan və tam fəaliyyət göstərən Araz Supermarket biznesi satışa çıxarılıb! Geniş müştəri bazası və strateji yeri ilə bu hazır biznes, pərakəndə satış sahəsində uğur qazanmaq istəyənlər üçün mükəmməl fürsətdir.',
        coordinates: { lat: 40.4286, lng: 49.8091 },
        phone: '+994 51 777 77 77',
        email: 'info@arazmarket.az',
        postedDate: '2024-12-18',
    },
    {
        id: '6',
        name: 'Playstation Zal',
        price: 16500,
        image: 'https://i.pinimg.com/736x/56/64/8e/56648ec056779db54814327d65a1ae8e.jpg',
        isPremium: true,
        isStore: true,
        location: 'Bakı şəhəri, Xətai',
        description:
            'Hazır və tam fəaliyyət göstərən PlayStation Zalı biznesi satışa çıxarılıb! Əyləncə sənayesində yüksək tələb olunan bu iş modeli yeni sahibini gözləyir. Həm təcrübəli sahibkarlar, həm də bu sahəyə yeni başlayanlar üçün mükəmməl fürsətdir.',
        coordinates: { lat: 40.4266, lng: 49.8624 },
        phone: '+994 55 654 32 10',
        email: 'info@playstationcenter.az',
        postedDate: '2024-12-20',
    },
    {
        id: '7',
        name: '50 Qəpik Avtoyuma',
        price: 99999,
        image: 'https://avatars.mds.yandex.net/get-altay/9916116/2a00000189a2fbbada06c1f8af78be68966d/orig',
        isPremium: false,
        isStore: true,
        location: 'Bakı şəhəri, Nesimi',
        description: 'Yaxşı tanınan və uğurlu fəaliyyət göstərən 50 Qəpik Avtoyuma biznesi satışa çıxarılıb! Avtoyuma sənayesində gəlirli və asan idarə olunan bir işə sahib olmaq istəyənlər üçün möhtəşəm fürsətdir.',
        coordinates: { lat: 40.3229, lng: 49.7519 },
        phone: '+994 70 123 45 67',
        email: 'info@avtoyuma.az',
        postedDate: '2024-12-16',
    },
    {
        id: '8',
        name: 'AREA Restoran',
        price: 87000,
        image: 'https://area.az/frontend/web/uploads/property/04f5a53f-728c-4f75-bb05-aba28aae3a73/04f5a53f-728c-4f75-bb05-aba28aae3a73.jpg',
        isPremium: true,
        isStore: false,
        location: 'Bakı şəhəri, Nerimanov',
        description: 'Looking for an incredible opportunity to own a successful restaurant business? This fully operational restaurant is now available for sale, offering everything you need to step into a profitable and well-established venture.',
        coordinates: { lat: 40.3987, lng: 49.9743 },
        phone: '+994 51 456 78 90',
        email: 'info@restoran.az',
        postedDate: '2024-12-17',
    },
    // Add more products as needed
];

const mapContainerStyle = {
    width: '100%',
    height: '500px',
};

// Updated Product type definition with all required fields
interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    location: string;
    phone: string;
    email: string;
    postedDate: string;
    coordinates: { lat: number; lng: number };
    isPremium: boolean;
    isStore: boolean;
    image: string;
}

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    console.log('ProductPage component initialized');
    console.log('Component mounted with params:', params);
    const [isMounted, setIsMounted] = useState(false);

    const [product, setProduct] = useState<Product | null>(null);
    const [otherProducts, setOtherProducts] = useState<Product[]>([]);

    useEffect(() => {
        
        if (params.id) {
            console.log('Searching for product with id:', params.id);
            console.log('Available products:', products);
            const foundProduct = products.find(p => p.id === params.id);
            if (foundProduct) {
                console.log('Product found:', foundProduct);
                foundProduct.isStore = foundProduct.isStore ?? false; // Default to false if undefined
                setProduct(foundProduct);
                setOtherProducts(products.filter(p => p.id !== params.id).slice(0, 4));
            } else {
                notFound();
            }
        }
        setIsMounted(true);
    }, [params.id]);

    if (!isMounted || !product) {
        return null; // Optionally, return a loading indicator
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Product Title */}
            <h1 className="text-3xl font-bold mb-6 text-center">{product.name}</h1>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column - Product Image and Description */}
                <div className="md:col-span-2">
                    <div className="relative">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={500} // Reduced the width from 600 to 500
                            height={450} // Keeping the height same to make them consistent
                            className="rounded-lg object-cover w-[800px] h-[450px] mb-6"
                        />
                    </div>
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-2 text-center">Qiymət: {product.price} AZN</h2>
                        <p className="text-gray-700 mb-6 text-center">{product.description}</p>
                    </div>
                </div>

                {/* Right Column - Contact Information and Features */}
                <div>
                    {/* Add Image Above Əlaqə Məlumatları */}
                    <div className="mb-3">
                        <Image
                            src="https://i.imgur.com/LMUMDV1.png" // Replace with your image URL
                            alt="Image description"
                            width={400}
                            height={250}
                            className="rounded-lg object-cover"
                        />
                    </div>

                    {/* Əlaqə Məlumatları */}
                    <Card className="mb-5 bg-white shadow-lg rounded-lg overflow-hidden">
                        <CardContent className="p-0">
                            {' '}
                            {/* Reduced padding to decrease height */}
                            <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">Əlaqə Məlumatları</h3> {/* Adjusted margin */}
                            <div className="space-y-1">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-gray-600" />
                                    <div className="flex-1">
                                        <span className="font-medium">Ünvan:</span>
                                        <p className="text-gray-700">{product.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-5 w-5 text-gray-600" />
                                    <div className="flex-1">
                                        <span className="font-medium">Telefon:</span>
                                        <p className="text-gray-700">{product.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-gray-600" />
                                    <div className="flex-1">
                                        <span className="font-medium">E-poçt:</span>
                                        <p className="text-gray-700">{product.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="h-5 w-5 text-gray-600" />
                                    <div className="flex-1">
                                        <span className="font-medium">Elan tarixi:</span>
                                        <p className="text-gray-700">{product.postedDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-0.5">
                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 py-1">Əlaqə saxla</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Xüsusiyyətlər */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 text-center">Xüsusiyyətlər</h3>
                        <ul className="list-disc list-inside space-y-1 text-center">
                            <li>{product.isPremium ? 'Premium Elan' : 'Standart Elan'}</li>
                            <li>{product.isStore ? 'Mağaza' : 'Fərdi Satıcı'}</li>
                        </ul>
                    </div>
                </div>

                {/* Map Section - Full Width Below */}
                <div className="md:col-span-3 h-[400px] rounded-lg overflow-hidden mb-6">
                    <LoadScript googleMapsApiKey="AIzaSyDov61U_ntrpE8N7dfJ5ARWbKIeMwqFIjw">
                        <GoogleMap mapContainerStyle={mapContainerStyle} center={product.coordinates} zoom={15}>
                            <MarkerF position={product.coordinates} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>

            {/* Other Products */}
            <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Digər Elanlar</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherProducts.map(otherProduct => (
                        <div key={otherProduct.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                            <Image
                                src={otherProduct.image}
                                alt={otherProduct.name}
                                width={500} // Same width as the main product image
                                height={300} // Same height ratio
                                className="w-full h-[200px] object-cover"
                            />
                            <div className="p-4">
                                <h4 className="text-lg font-semibold">{otherProduct.name}</h4>
                                <p className="text-gray-500">{otherProduct.location}</p>
                                <p className="text-gray-700">{otherProduct.price} AZN</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
