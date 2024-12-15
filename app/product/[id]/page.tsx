'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
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
        location: 'Bakı şəhəri, Yasamal rayonu',
        coordinates: { lat: 40.3776, lng: 49.8925 },
        phone: '+994 55 123 45 67',
        email: 'info@altimoyka.az',
        postedDate: '2023-06-15',
    },
    {
        id: '2',
        name: 'Bərbərxana',
        price: 16500,
        image: 'https://bzns.az/storage/announcements/big/sCw5GbkMkibHAI7BVyxXCZK8VWagbs3wx8lbbNb3.jpg',
        isPremium: true,
        isStore: false, // Explicitly set isStore to false
        description: 'İşlək vəziyyətdə olan bərbərxana satılır. Tam təchizatlı, müştəri bazası olan.',
        location: 'Bakı şəhəri, Nərimanov rayonu',
        coordinates: { lat: 40.4093, lng: 49.8671 },
        phone: '+994 50 987 65 43',
        email: 'info@berbershop.az',
        postedDate: '2023-06-14',
    },
    {
        id: '3',
        name: 'Yeni Açılmış Tədris Mərkəzi Satılır',
        price: 120000,
        image: 'https://avatars.mds.yandex.net/get-altay/4392922/2a0000018296e1783fff9171cdf0f056a2ad/orig',
        isPremium: true,
        isStore: true,
        description: 'Tam təchizatlı, yeni açılmış tədris mərkəzi satılır. Hazır müştəri bazası və peşəkar müəllim heyəti.',
        location: 'Bakı şəhəri, Xətai rayonu',
        coordinates: { lat: 40.3872, lng: 49.9503 },
        phone: '+994 70 555 55 55',
        email: 'info@tedrismarkezi.az',
        postedDate: '2023-06-20',
    },
    {
        id: '4',
        name: 'Bilyard Salonu',
        price: 66000,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f8/88/d2/getlstd-property-photo.jpg?w=1200&h=-1&s=1',
        isPremium: true,
        isStore: false, // Explicitly set isStore to false
        description: 'İşlək vəziyyətdə olan bilyard salonu satılır. 5 stol, bar və istirahət guşəsi mövcuddur.',
        location: 'Bakı şəhəri, Nəsimi rayonu',
        coordinates: { lat: 40.3893, lng: 49.8519 },
        phone: '+994 50 999 99 99',
        email: 'info@bilyardsalonu.az',
        postedDate: '2023-06-18',
    },
    // Add more products as needed
];

const mapContainerStyle = {
    width: '100%',
    height: '300px',
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
    const [isMounted, setIsMounted] = useState(false);

    const [product, setProduct] = useState<Product | null>(null);
    const [otherProducts, setOtherProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (params.id) {
            const foundProduct = products.find(p => p.id === params.id);
            if (foundProduct) {
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
                            height={400} // Keeping the height same to make them consistent
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
                    {/* Əlaqə Məlumatları */}
                    <Card className="mb-6 bg-white shadow-lg rounded-lg overflow-hidden">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">Əlaqə Məlumatları</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-gray-600" />
                                    <div className="flex-1">
                                        <span className="font-medium">Ünvan:</span>
                                        <p className="text-gray-700">{product.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
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
                            <div className="mt-6">
                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">Əlaqə saxla</Button>
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
                <div className="md:col-span-3 h-[300px] rounded-lg overflow-hidden mb-6">
                    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                        <GoogleMap mapContainerStyle={mapContainerStyle} center={product.coordinates} zoom={15}>
                            <MarkerF position={product.coordinates} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>

            {/* Other Products */}
            <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Digər Elanlar</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
