'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

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
        name: 'Təbii Şirə Dükkanı',
        price: 24999,
        image: 'https://bzns.az/storage/announcements/preview/c7smrfqkpo5pIcXHJPr9A5I8oa0X25AkhWV9f08f.jpg',
        isPremium: false,
        isStore: true,
        description: 'Təbii şirə və təzə meyvə şirəsi dükkanı satılır. Yaxın zamanda fəaliyyətə başlayacaq.',
        location: 'Bakı şəhəri, Nərimanov rayonu',
        coordinates: { lat: 40.385, lng: 49.8587 },
        phone: '+994 55 987 65 43',
        email: 'info@tebiishirə.az',
        postedDate: '2023-07-10',
    },
    {
        id: '3',
        name: 'Paltar Yuyulma Maşını Servisi',
        price: 15999,
        image: 'https://bzns.az/storage/announcements/preview/eVXEX1rYhHhNBmuFqazHwe1vQ9GQREjo5D6D1wRv.jpg',
        isPremium: true,
        isStore: true,
        description: 'Paltar yuyulma maşını servisi. Hər növ təmir işləri mövcuddur.',
        location: 'Bakı şəhəri, Binəqədi rayonu',
        coordinates: { lat: 40.4706, lng: 49.8924 },
        phone: '+994 50 123 45 67',
        email: 'info@paltaryuyulmaservisi.az',
        postedDate: '2023-08-05',
    },
    {
        id: '4',
        name: 'Büro Ləvazimatları Mağazası',
        price: 17999,
        image: 'https://bzns.az/storage/announcements/preview/5G9V97XE4C92t8nM1WV4eZlNVXY34foHjOEkzEZa.jpg',
        isPremium: false,
        isStore: true,
        description: 'Büro ləvazimatları mağazası, ofis avadanlıqları, dəftərlər, kağızlar və daha çox.',
        location: 'Bakı şəhəri, Xətai rayonu',
        coordinates: { lat: 40.378, lng: 49.8501 },
        phone: '+994 50 789 12 34',
        email: 'info@buroaz.az',
        postedDate: '2023-08-15',
    },
    {
        id: '5',
        name: 'Texnika və Elektronika Mağazası',
        price: 39999,
        image: 'https://bzns.az/storage/announcements/preview/c7smrfqkpo5pIcXHJPr9A5I8oa0X25AkhWV9f08f.jpg',
        isPremium: true,
        isStore: true,
        description: 'Texnika və elektronika mağazası, telefonlar, televizorlar, kompüterlər və s.',
        location: 'Bakı şəhəri, Nəsimi rayonu',
        coordinates: { lat: 40.383, lng: 49.8612 },
        phone: '+994 55 334 56 78',
        email: 'info@texnikaelektronika.az',
        postedDate: '2023-09-01',
    },
    {
        id: '6',
        name: 'Restoran və Kafeteriya',
        price: 74999,
        image: 'https://bzns.az/storage/announcements/preview/c7smrfqkpo5pIcXHJPr9A5I8oa0X25AkhWV9f08f.jpg',
        isPremium: true,
        isStore: true,
        description: 'Restoran və kafeteriya fəaliyyətə başlamaq üçün satışa çıxarılıb.',
        location: 'Bakı şəhəri, Sabunçu rayonu',
        coordinates: { lat: 40.5452, lng: 49.941 },
        phone: '+994 50 654 78 90',
        email: 'info@restorankafeteriya.az',
        postedDate: '2023-09-20',
    },
    {
        id: '7',
        name: 'Avtomobil Satisı',
        price: 18999,
        image: 'https://bzns.az/storage/announcements/preview/c7smrfqkpo5pIcXHJPr9A5I8oa0X25AkhWV9f08f.jpg',
        isPremium: false,
        isStore: false,
        description: 'Satışda olan avtomobillər, təmirli və yaxşı vəziyyətdə.',
        location: 'Bakı şəhəri, Suraxanı rayonu',
        coordinates: { lat: 40.3757, lng: 49.8387 },
        phone: '+994 50 123 12 34',
        email: 'info@avtomobilsatisi.az',
        postedDate: '2023-10-01',
    },
    {
        id: '8',
        name: 'Gözəllik və Sağlamlıq Mərkəzi',
        price: 29999,
        image: 'https://bzns.az/storage/announcements/preview/c7smrfqkpo5pIcXHJPr9A5I8oa0X25AkhWV9f08f.jpg',
        isPremium: false,
        isStore: true,
        description: 'Gözəllik və sağlamlıq mərkəzi, spa, masaj və digər xidmətlər.',
        location: 'Bakı şəhəri, Səbail rayonu',
        coordinates: { lat: 40.3892, lng: 49.8767 },
        phone: '+994 50 987 65 43',
        email: 'info@gozelliksağlamlıq.az',
        postedDate: '2023-10-15',
    },
];

// TypeScript type for product
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
                setProduct(foundProduct);
                setOtherProducts(products.filter(p => p.id !== params.id).slice(0, 4));
            } else {
                notFound();
            }
        }
        setIsMounted(true);
    }, [params.id]);

    if (!isMounted || !product) {
        return null; // Optionally, show a loading indicator
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
                        <Image src={product.image} alt={product.name} width={800} height={450} className="rounded-lg object-cover w-full h-[450px] mb-6" />
                    </div>
                    <div className="mt-6 text-center">
                        <h2 className="text-2xl font-semibold mb-2">Qiymət: {product.price} AZN</h2>
                        <p className="text-gray-700 mb-6">{product.description}</p>
                    </div>
                </div>

                {/* Right Column - Contact Information */}
                <div>
                    <Card className="mb-6 shadow-lg rounded-lg">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-6 text-center">Əlaqə Məlumatları</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-gray-600" />
                                    <span className="font-medium">{product.location}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-gray-600" />
                                    <span className="font-medium">{product.phone}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-gray-600" />
                                    <span className="font-medium">{product.email}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="h-5 w-5 text-gray-600" />
                                    <span className="font-medium">{product.postedDate}</span>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Əlaqə saxla</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Map Section */}
                <div className="md:col-span-3 h-[300px] rounded-lg overflow-hidden mb-6">
                    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                        <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={product.coordinates} zoom={15}>
                            <MarkerF position={product.coordinates} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>

            {/* Other Products */}
            <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Digər Elanlar</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {otherProducts.map(other => (
                        <div key={other.id} className="border rounded-lg shadow hover:shadow-lg transition">
                            <Image src={other.image} alt={other.name} width={500} height={300} className="w-full h-[200px] object-cover" />
                            <div className="p-4">
                                <h4 className="text-lg font-semibold">{other.name}</h4>
                                <p className="text-gray-500">{other.location}</p>
                                <p className="text-gray-700">{other.price} AZN</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
