'use client';

import { useEffect, useState } from 'react';

interface FearGreedGaugeProps {
    value: number;
    size?: number;
    className?: string;
}

export function FearGreedGauge({ value, size = 144, className = '' }: FearGreedGaugeProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // Normalize value between 0 and 100
    const normalizedValue = Math.min(Math.max(value, 0), 100);

    // Calculate the angle for the gauge needle
    const angle = (normalizedValue / 100) * 180 - 90;

    // Get the status based on the value
    const getStatus = (value: number) => {
        if (value <= 25) return 'Extreme Fear';
        if (value <= 45) return 'Fear';
        if (value <= 55) return 'Neutral';
        if (value <= 75) return 'Greed';
        return 'Extreme Greed';
    };

    // Calculate path for each segment
    const calculatePath = (startAngle: number, endAngle: number) => {
        const start = polarToCartesian(startAngle);
        const end = polarToCartesian(endAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
        return `M ${start.x} ${start.y} A 59 59 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
    };

    const polarToCartesian = (angle: number) => {
        const radians = ((angle - 90) * Math.PI) / 180;
        return {
            x: 72 + 59 * Math.cos(radians),
            y: 68 + 59 * Math.sin(radians),
        };
    };

    return (
        <div className={`relative flex flex-col items-center ${className}`} data-role="progressbar-wrapper">
            <svg width={size} height={size / 2 + 10} viewBox="0 0 144 78">
                <path d={calculatePath(-90, -54)} stroke="#EA3943" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d={calculatePath(-54, -18)} stroke="#EA8C00" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d={calculatePath(-18, 18)} stroke="#F3D42F" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d={calculatePath(18, 54)} stroke="#93D900" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d={calculatePath(54, 90)} stroke="#16C784" strokeWidth="6" strokeLinecap="round" fill="none" />

                {/* Needle */}
                <g transform={`rotate(${angle} 72 68)`}>
                    <circle cx="72" cy="68" r="5" fill="black" />
                    <rect x="70" y="20" width="4" height="48" fill="black" rx="2" />
                </g>
            </svg>

            <div className="absolute bottom-0 flex flex-col items-center">
                <span className="text-2xl font-bold">{value}</span>
                <span className="text-sm text-gray-600">{getStatus(value)}</span>
            </div>
        </div>
    );
}
