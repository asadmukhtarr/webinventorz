// app/components/Loader.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from './images/logo.png';

interface LoaderProps {
    children: React.ReactNode;
}

export default function Loader({ children }: LoaderProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="ai-loader-wrapper">
                    {/* AI Neural Network Connections */}
                    <div className="neural-line line-1"></div>
                    <div className="neural-line line-2"></div>
                    <div className="neural-line line-3"></div>
                    <div className="neural-line line-4"></div>
                    <div className="neural-line line-5"></div>
                    <div className="neural-line line-6"></div>

                    {/* Orbiting Planets */}
                    <div className="orbit orbit-1">
                        <div className="planet planet-1"></div>
                    </div>
                    <div className="orbit orbit-2">
                        <div className="planet planet-2"></div>
                    </div>
                    <div className="orbit orbit-3">
                        <div className="planet planet-3"></div>
                    </div>

                    {/* Energy Rings */}
                    <div className="energy-ring ring-outer"></div>
                    <div className="energy-ring ring-middle"></div>
                    <div className="energy-ring ring-inner"></div>

                    {/* Pulsing Waves */}
                    <div className="pulse-wave wave-1"></div>
                    <div className="pulse-wave wave-2"></div>
                    <div className="pulse-wave wave-3"></div>

                    {/* Glowing Particles */}
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                    <div className="particle particle-4"></div>
                    <div className="particle particle-5"></div>
                    <div className="particle particle-6"></div>
                    <div className="particle particle-7"></div>
                    <div className="particle particle-8"></div>

                    {/* Center Logo with Glow */}
                    <div className="logo-center">
                        <div className="logo-glow"></div>
                        <Image
                            src={logo}
                            alt="WebInventorz"
                            width={180}
                            height={60}
                            priority
                        />
                    </div>

                    {/* AI Typing Text */}
                    <div className="ai-text">
                        <span className="ai-label">
                            <i className="fa-solid fa-microchip"></i> AI INITIALIZING
                        </span>
                        <div className="typing-text">
                            <span>L</span>
                            <span>o</span>
                            <span>a</span>
                            <span>d</span>
                            <span>i</span>
                            <span>n</span>
                            <span>g</span>
                            <span className="cursor">_</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}