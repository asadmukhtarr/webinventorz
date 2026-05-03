'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import logo from './images/logo.png';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.webinventorz.com/api';

interface FooterSettings {
    site_name?: string;
    site_logo?: string;
    footer_description?: string;
    footer_copyright?: string;
    contact_email?: string;
    contact_phone?: string;
    contact_phone_2?: string;
    contact_address?: string;
    social_facebook?: string;
    social_twitter?: string;
    social_instagram?: string;
    social_linkedin?: string;
    social_youtube?: string;
    social_github?: string;
    business_hours?: string;
    business_saturday?: string;
    business_sunday?: string;
}

// Quick Links Data
const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

const legalLinks = [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Refund Policy', href: '/refund-policy' },
];

const serviceLinks = [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile Apps', href: '/services/mobile-apps' },
    { name: 'UI/UX Design', href: '/services/ui-ux-design' },
    { name: 'SEO Optimization', href: '/services/seo' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'Cloud Solutions', href: '/services/cloud' },
];

export default function Footer() {
    const [settings, setSettings] = useState<FooterSettings>({});
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subscribing, setSubscribing] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const [general, contact, social, business] = await Promise.all([
                fetch(`${API_URL}/settings/general/all`).then(res => res.json()),
                fetch(`${API_URL}/settings/contact/all`).then(res => res.json()),
                fetch(`${API_URL}/settings/social/all`).then(res => res.json()),
                fetch(`${API_URL}/settings/business/all`).then(res => res.json()),
            ]);

            setSettings({
                ...(general.success ? general.data : {}),
                ...(contact.success ? contact.data : {}),
                ...(social.success ? social.data : {}),
                ...(business.success ? business.data : {}),
            });
        } catch (error) {
            console.error('Error fetching footer settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setSubscribeMessage('Please enter your email address');
            return;
        }

        setSubscribing(true);
        setSubscribeMessage('');

        try {
            const response = await fetch(`${API_URL}/newsletter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();

            if (data.success) {
                setSubscribeMessage('Successfully subscribed! Check your email.');
                setName('');
                setEmail('');
                setTimeout(() => setSubscribeMessage(''), 3000);
            } else {
                setSubscribeMessage(data.message || 'Subscription failed. Please try again.');
            }
        } catch (error) {
            setSubscribeMessage('Network error. Please try again later.');
        } finally {
            setSubscribing(false);
        }
    };

    const logoUrl = settings.site_logo || logo;

    if (loading) {
        return (
            <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <footer className="footer">
            {/* Main Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="row g-4">
                        {/* Column 1 - Brand & About */}
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-brand">
                                {typeof logoUrl === 'string' && logoUrl.startsWith('http') ? (
                                    <img
                                        src={logoUrl}
                                        alt={settings.site_name || 'WebInventorz'}
                                        className="footer-logo"
                                    />
                                ) : (
                                    <Image
                                        src={logo}
                                        alt={settings.site_name || 'WebInventorz'}
                                        className="footer-logo"
                                        width={200}
                                        height={60}
                                    />
                                )}
                                <p className="footer-description">
                                    {settings.footer_description || 'Crafting digital excellence with a human touch. We deliver innovative solutions that drive business growth.'}
                                </p>
                                <div className="footer-social">
                                    <h6 className="social-title">Follow Us</h6>
                                    <div className="social-links">
                                        {settings.social_facebook && (
                                            <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        )}
                                        {settings.social_twitter && (
                                            <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        )}
                                        {settings.social_instagram && (
                                            <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        )}
                                        {settings.social_linkedin && (
                                            <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                        )}
                                        {settings.social_youtube && (
                                            <a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                                                <i className="fab fa-youtube"></i>
                                            </a>
                                        )}
                                        {settings.social_github && (
                                            <a href={settings.social_github} target="_blank" rel="noopener noreferrer" className="social-link">
                                                <i className="fab fa-github"></i>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 - Quick Links */}
                        <div className="col-lg-2 col-md-6">
                            <div className="footer-links">
                                <h5 className="footer-title">Quick Links</h5>
                                <ul>
                                    {quickLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href}>
                                                <i className="fa-solid fa-chevron-right"></i> {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Column 3 - Services */}
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-links">
                                <h5 className="footer-title">Our Services</h5>
                                <ul>
                                    {serviceLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href}>
                                                <i className="fa-solid fa-chevron-right"></i> {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Column 4 - Contact & Newsletter */}
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-contact">
                                <h5 className="footer-title">Contact Info</h5>
                                <div className="contact-item">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <div>
                                        <p>{settings.contact_address || 'Lahore, Pakistan'}</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <i className="fa-solid fa-envelope"></i>
                                    <div>
                                        <a href={`mailto:${settings.contact_email || 'info@webinventorz.com'}`}>
                                            {settings.contact_email || 'info@webinventorz.com'}
                                        </a>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <i className="fa-solid fa-phone"></i>
                                    <div>
                                        <a href={`tel:${settings.contact_phone || '+92 300 1234567'}`}>
                                            {settings.contact_phone || '+92 300 1234567'}
                                        </a>
                                        {settings.contact_phone_2 && (
                                            <a href={`tel:${settings.contact_phone_2}`} className="mt-1">
                                                {settings.contact_phone_2}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <i className="fa-solid fa-clock"></i>
                                    <div>
                                        <p>{settings.business_hours || 'Mon - Fri: 9:00 AM - 6:00 PM'}</p>
                                        {settings.business_saturday && <p className="mb-0">{settings.business_saturday}</p>}
                                        {settings.business_sunday && <p className="mb-0 text-muted">{settings.business_sunday}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Newsletter Section */}
                            <div className="footer-newsletter mt-4">
                                <h5 className="footer-title">Newsletter</h5>
                                <p className="newsletter-text">Subscribe to get special offers and updates</p>
                                <form onSubmit={handleSubscribe} className="newsletter-form">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="newsletter-input"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="newsletter-input"
                                    />
                                    <button type="submit" className="newsletter-btn" disabled={subscribing}>
                                        {subscribing ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-1"></span>
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                Subscribe <i className="fa-solid fa-paper-plane"></i>
                                            </>
                                        )}
                                    </button>
                                </form>
                                {subscribeMessage && (
                                    <p className={`subscribe-message ${subscribeMessage.includes('Success') ? 'text-success' : 'text-danger'}`}>
                                        {subscribeMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legal Links Section */}
            <div className="footer-legal">
                <div className="container">
                    <div className="legal-links">
                        {legalLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="copyright mb-0">
                                {settings.footer_copyright || '© 2026 WebInventorz. All rights reserved.'}
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="credit mb-0">
                                Designed with <i className="fa-solid fa-heart" style={{ color: '#FE171B' }}></i> by WebInventorz
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                /* Footer Styles */
                .footer {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: #94a3b8;
                    position: relative;
                    overflow: hidden;
                }
                
                .footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #FE171B, #6366f1, #FE171B);
                }
                
                .footer-main {
                    padding: 60px 0 40px;
                }
                
                .footer-logo {
                    max-height: 50px;
                    width: auto;
                    margin-bottom: 1rem;
                }
                
                .footer-description {
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    color: #94a3b8;
                }
                
                .footer-title {
                    color: #ffffff;
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    position: relative;
                    padding-bottom: 0.75rem;
                }
                
                .footer-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 40px;
                    height: 3px;
                    background: linear-gradient(90deg, #FE171B, #6366f1);
                    border-radius: 3px;
                }
                
                .footer-links ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .footer-links li {
                    margin-bottom: 0.75rem;
                }
                
                .footer-links a {
                    color: #94a3b8;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 0.9rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .footer-links a i {
                    font-size: 0.7rem;
                    transition: all 0.3s ease;
                }
                
                .footer-links a:hover {
                    color: #FE171B;
                    transform: translateX(5px);
                }
                
                .footer-links a:hover i {
                    transform: translateX(3px);
                }
                
                /* Social Section */
                .social-title {
                    color: #ffffff;
                    font-size: 0.9rem;
                    margin-bottom: 0.75rem;
                }
                
                .social-links {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                
                .social-link {
                    width: 36px;
                    height: 36px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #94a3b8;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                
                .social-link:hover {
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    color: white;
                    transform: translateY(-3px);
                }
                
                /* Contact Items */
                .contact-item {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 1rem;
                }
                
                .contact-item i {
                    width: 20px;
                    color: #FE171B;
                    margin-top: 3px;
                }
                
                .contact-item a,
                .contact-item p {
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 0.85rem;
                    margin-bottom: 0;
                    line-height: 1.5;
                }
                
                .contact-item a:hover {
                    color: #FE171B;
                }
                
                /* Newsletter */
                .footer-newsletter {
                    margin-top: 1.5rem;
                }
                
                .newsletter-text {
                    font-size: 0.8rem;
                    margin-bottom: 0.75rem;
                    color: #94a3b8;
                }
                
                .newsletter-form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .newsletter-input {
                    padding: 10px 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    color: white;
                    font-size: 0.85rem;
                    transition: all 0.3s;
                }
                
                .newsletter-input:focus {
                    outline: none;
                    border-color: #FE171B;
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .newsletter-input::placeholder {
                    color: #64748b;
                }
                
                .newsletter-btn {
                    padding: 10px 16px;
                    background: linear-gradient(105deg, #FE171B, #6366f1);
                    border: none;
                    border-radius: 10px;
                    color: white;
                    font-weight: 600;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .newsletter-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(254, 23, 27, 0.3);
                }
                
                .newsletter-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                
                .subscribe-message {
                    font-size: 0.75rem;
                    margin-top: 0.5rem;
                    margin-bottom: 0;
                }
                
                /* Legal Links Section */
                .footer-legal {
                    padding: 20px 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .legal-links {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                }
                
                .legal-links a {
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 0.85rem;
                    transition: all 0.3s;
                }
                
                .legal-links a:hover {
                    color: #FE171B;
                }
                
                /* Copyright Section */
                .footer-bottom {
                    padding: 20px 0;
                }
                
                .copyright,
                .credit {
                    font-size: 0.8rem;
                    color: #64748b;
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .footer-main {
                        padding: 40px 0 20px;
                    }
                    
                    .footer-title::after {
                        left: 50%;
                        transform: translateX(-50%);
                    }
                    
                    .footer-title {
                        text-align: center;
                    }
                    
                    .footer-links ul {
                        text-align: center;
                    }
                    
                    .footer-links a {
                        justify-content: center;
                    }
                    
                    .contact-item {
                        justify-content: center;
                    }
                    
                    .social-links {
                        justify-content: center;
                    }
                    
                    .legal-links {
                        gap: 15px;
                    }
                    
                    .footer-legal {
                        padding: 15px 0;
                    }
                }
                
                @media (max-width: 480px) {
                    .legal-links {
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                    }
                }
            `}</style>
        </footer>
    );
}