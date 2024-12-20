'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, MapPin, Heart, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
    const [city, setCity] = useState<string>('Şəhər'); // Explicitly typed
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // Explicitly typed
    const cities: string[] = ['Bakı', 'Gancə', 'Sumqayıt', 'Şamaxı', 'Qəbələ']; // Explicitly typed

    const handleCitySelect = (selectedCity: string) => {
        // TypeScript fix
        setCity(selectedCity);
        setDropdownOpen(false);
    };

    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center gap-4">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        <Menu className="h-6 w-6" />
                        <Link href="/" className="text-2xl font-bold text-[#FFE600]">
                            Biznest
                        </Link>
                        <Button className="bg-[#FFE600] hover:bg-[#FFD000] text-black">Kataloq</Button>
                    </div>

                    {/* Search Section */}
                    <div className="flex-1 max-w-2xl">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input className="w-full pl-10" placeholder="Biznes axtarışı" />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* City Dropdown */}
                        <div className="relative">
                            <div className="flex items-center gap-2 text-gray-600 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <MapPin className="h-4 w-4" />
                                <span>{city}</span>
                                <ChevronDown className="h-4 w-4" />
                            </div>
                            {dropdownOpen && (
                                <div className="absolute mt-2 bg-white border rounded shadow-lg z-10">
                                    {cities.map(cityOption => (
                                        <div key={cityOption} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCitySelect(cityOption)}>
                                            {cityOption}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Button variant="default" className="bg-[#FFE600] hover:bg-[#FFD000] text-black">
                            Göstər
                        </Button>
                        <Button variant="ghost" className="text-gray-600">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" className="text-gray-600">
                            <MessageCircle className="h-5 w-5" />
                        </Button>
                        <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                            Elan+
                        </Button>
                        <Button variant="outline" className="text-black border-black">
                            Giriş
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
