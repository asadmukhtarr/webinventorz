'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import logo from './images/logo.png';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.webinventorz.com/api';

// Types
interface Settings {
    site_name?: string;
    site_logo?: string;
    contact_phone?: string;
    contact_email?: string;
    social_facebook?: string;
    social_twitter?: string;
    social_instagram?: string;
    social_linkedin?: string;
}

interface Country {
    id: number;
    name: string;
    code: string;
    currency_symbol: string;
    currency_code: string;
    is_active: boolean;
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [settings, setSettings] = useState<Settings>({});
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    useEffect(() => {
        setIsMounted(true);
        fetchSettings();
        fetchCountries();

        // Load selected country from localStorage
        const savedCountry = localStorage.getItem('selectedCountry');
        if (savedCountry) {
            setSelectedCountry(savedCountry);
        } else {
            setSelectedCountry('PK'); // Default to Pakistan
        }
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch(`${API_URL}/settings/general/all`);
            const data = await response.json();
            if (data.success) {
                setSettings(data.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await fetch(`${API_URL}/countries`);
            const data = await response.json();
            if (data.success) {
                setCountries(data.data);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCountrySelect = (countryCode: string) => {
        setSelectedCountry(countryCode);
        localStorage.setItem('selectedCountry', countryCode);
        // Redirect to pricing page with selected country
        window.location.href = `/pricing?country=${countryCode}`;
    };

    // Don't render interactive elements until mounted on client
    if (!isMounted || loading) {
        return (
            <>
                <div className="top-bar">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="top-bar-left">
                                    <span className="welcome-text">
                                        <i className="fa-regular fa-hand-peace"></i> Welcome to WebInventorz
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="top-bar-right">
                                    <div className="language-selector">
                                        <i className="fa fa-globe"></i>
                                        <select className="lang-select">
                                            <option value="en">English (EN)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg sticky-top shadow-lg">
                    <div className="container">
                        <Link className="navbar-brand fw-bold" href="/">
                            <Image src={logo} width={150} height={50} alt="WebInventorz Logo" priority />
                        </Link>
                        <div className="collapse navbar-collapse show">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" href="/">
                                        <i className="fa fa-home"></i> Home
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }

    const logoUrl = settings.site_logo || logo;

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="top-bar-left">
                                <span className="welcome-text">
                                    <i className="fa-regular fa-hand-peace"></i> Welcome to {settings.site_name || 'WebInventorz'}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="top-bar-right">
                                <div className="language-selector">
                                    <i className="fa fa-globe"></i>
                                    <select className="lang-select">
                                        <option value="en">English (EN)</option>
                                        <option value="es">Español (ES)</option>
                                        <option value="fr">Français (FR)</option>
                                        <option value="de">Deutsch (DE)</option>
                                        <option value="ar">العربية (AR)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="navbar navbar-expand-lg sticky-top shadow-lg">
                <div className="container">
                    <Link className="navbar-brand fw-bold" href="/">
                        {typeof logoUrl === 'string' && logoUrl.startsWith('http') ? (
                            <img src={logoUrl} alt={settings.site_name || 'WebInventorz'} width={150} height={50} style={{ objectFit: 'contain' }} />
                        ) : (
                            <Image src={logo} width={150} height={50} alt={settings.site_name || 'WebInventorz Logo'} priority />
                        )}
                    </Link>

                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" style={{ filter: 'invert(0.2)' }}></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="nav">
                        <ul className="navbar-nav ms-auto align-items-center gap-1">
                            <li className="nav-item">
                                <Link className="nav-link" href="/">
                                    <i className="fa fa-home"></i> Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/products">
                                    <i className="fa fa-box"></i> Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/services">
                                    <i className="fa fa-cogs"></i> Services
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle"
                                    id="countryDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-tag"></i> Pricing
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="countryDropdown">
                                    {countries.map((country) => (
                                        <li key={country.id}>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => handleCountrySelect(country.code)}
                                            >
                                                {country.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/blog">
                                    <i className="fa fa-list"></i> Blog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-custom ms-2 cta-pulse" href="/quote">
                                    <i className="fa fa-paper-plane"></i> Get Quote
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}