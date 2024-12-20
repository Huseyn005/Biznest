import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-yellow-500 text-black py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Biznest</h3>
                        <p>Biznesinizi hazır alın, vaxt itirməyin!</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Keçidlər</h3>
                        <ul>
                            <li>
                                <Link href="/terms" className="hover:underline">
                                    Xidmət Şərtləri
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:underline">
                                    Məxfilik Siyasəti
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold mb-2">Bizimlə Əlaqə Saxla</h3>
                        <p>Email: info@biznest.az</p>
                        <p>Tel: (055) 919-1950</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2024 Biznest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
