'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.webinventorz.com/api';

// Types
interface Service {
    id: number;
    title: string;
    slug: string;
    icon: string;
    short_description: string;
    description: string;
    features: string[];
    technologies: string[];
    tags: string[];
    is_active: boolean;
    order: number;
}

export default function SingleService({ params }: { params: Promise<{ slug: string }> }) {
    const [mounted, setMounted] = useState(false);
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [slug, setSlug] = useState<string | null>(null);

    // Unwrap params using React.use()
    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setSlug(resolvedParams.slug);
        };
        unwrapParams();
    }, [params]);

    useEffect(() => {
        setMounted(true);
        if (slug) {
            fetchService();
        }
    }, [slug]);

    const fetchService = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching service with slug:', slug);

            const response = await fetch(`${API_URL}/services/${slug}`);
            const data = await response.json();

            console.log('API Response:', data);

            if (data.success) {
                setService(data.data);
            } else {
                setError(data.message || 'Service not found');
            }
        } catch (error) {
            console.error('Error fetching service:', error);
            setError('Failed to load service. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) {
        return null;
    }

    // Show loader while loading
    if (loading) {
        return (
            <div
                className="text-center"
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                }}
            >
                <div className="loader-wrapper">
                    <img
                        src="../logo.gif"
                        alt="Loading..."
                        className="loader-gif"
                        style={{
                            width: '120px',
                            height: 'auto',
                            animation: 'pulse 1.5s ease-in-out infinite',
                            margin: '-70px'
                        }}
                    />
                    <style>{`
                        @keyframes pulse {
                            0%, 100% {
                                transform: scale(1);
                                opacity: 1;
                            }
                            50% {
                                transform: scale(1.1);
                                opacity: 0.8;
                            }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="text-center py-5" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h2>Service Not Found</h2>
                    <p className="text-muted">{error || "The service you're looking for doesn't exist."}</p>
                    <Link href="/services" className="btn btn-primary mt-3">Back to Services</Link>
                </div>
            </div>
        );
    }

    // Convert features array to HTML list
    const featuresList = service.features && service.features.length > 0 ? service.features : [];

    // Convert technologies array
    const technologiesList = service.technologies && service.technologies.length > 0 ? service.technologies : [];

    return (
        <>
            {/* Service Hero Section */}
            <section className="service-hero">
                <div className="hero-bg-animation">
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="ai-particle"></div>
                    <div className="ai-particle"></div>
                    <div className="ai-particle"></div>
                    <div className="ai-particle"></div>
                    <div className="ai-particle"></div>
                    <div className="ai-particle"></div>
                    <div className="ai-particle"></div>
                    <div className="ai-particle"></div>
                    <div className="glow-orb"></div>
                    <div className="glow-orb"></div>
                </div>

                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8 p-5" data-aos="fade-up">
                            <div className="service-icon-hero">
                                <i className={service.icon || "fa-solid fa-code"}></i>
                            </div>
                            <span className="service-category" style={{ background: "#FE171B" }}>
                                Featured Service
                            </span>
                            <h1 className="display-3 fw-bold mb-4">{service.title}</h1>
                            <p className="lead text-secondary mb-4">{service.short_description || service.description?.substring(0, 150)}</p>
                            <div className="hero-buttons">
                                <Link href="/quote" className="btn btn-custom btn-lg px-4">
                                    Get Started <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Link>
                                <Link href="/contact" className="btn btn-outline-custom btn-lg px-4">
                                    Contact Us <i className="fa-solid fa-headset ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Content */}
            <section className="service-content-section">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-8">
                            <article className="service-article" data-aos="fade-up">
                                <div dangerouslySetInnerHTML={{ __html: service.description || "<p>Comprehensive service description will be available soon. Contact us for more details about this service.</p>" }} />
                            </article>

                            {/* Features Grid */}
                            {featuresList.length > 0 && (
                                <div className="features-grid" data-aos="fade-up">
                                    <h2 className="fw-bold mb-4">Key Features</h2>
                                    <div className="row g-4">
                                        {featuresList.map((feature, index) => (
                                            <div key={index} className="col-md-6">
                                                <div className="feature-item">
                                                    <i className="fa-solid fa-check-circle"></i>
                                                    <div>
                                                        <label className="fw-bold mb-1">{feature}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Technologies Section */}
                            {technologiesList.length > 0 && (
                                <div className="technologies-section" data-aos="fade-up">
                                    <h2 className="fw-bold mb-4">Technologies We Use</h2>
                                    <div className="d-flex flex-wrap gap-2">
                                        {technologiesList.map((tech, index) => (
                                            <span key={index} className="technology-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="service-sidebar" data-aos="fade-left">
                                {/* Quick Contact Widget */}
                                <div className="sidebar-widget contact-widget">
                                    <h4 className="widget-title">Quick Contact</h4>
                                    <p>Ready to start your project? Get in touch with us today!</p>
                                    <form className="quick-contact-form" action="/quote" method="GET">
                                        <input type="text" placeholder="Your Name" />
                                        <input type="email" placeholder="Your Email" />
                                        <textarea rows={3} placeholder="Tell us about your project"></textarea>
                                        <button type="submit" className="btn btn-custom w-100">
                                            Send Message <i className="fa-solid fa-paper-plane ms-2"></i>
                                        </button>
                                    </form>
                                </div>

                                {/* Why Choose Us Widget */}
                                <div className="sidebar-widget">
                                    <h4 className="widget-title">Why Choose Us?</h4>
                                    <ul className="why-choose-list">
                                        <li><i className="fa-solid fa-trophy"></i> 8+ Years Experience</li>
                                        <li><i className="fa-solid fa-users"></i> 100+ Happy Clients</li>
                                        <li><i className="fa-solid fa-rocket"></i> 150+ Projects Delivered</li>
                                        <li><i className="fa-solid fa-clock"></i> 24/7 Support Available</li>
                                        <li><i className="fa-solid fa-shield"></i> 100% Satisfaction Guarantee</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-wrapper text-center" data-aos="zoom-in">
                        <h2 className="fw-bold display-6 mb-3">Ready to Transform Your Business?</h2>
                        <p className="text-secondary mb-4 col-lg-7 mx-auto">
                            Let's discuss your project and create something amazing together.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <Link href="/quote" className="btn btn-custom btn-lg px-5">
                                Start Your Project <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                            <Link href="/contact" className="btn btn-outline-custom btn-lg px-5">
                                Schedule Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS Styles */}
            <style jsx>{`
                .service-hero {
                    min-height: 60vh;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    position: relative;
                    overflow: hidden;
                    margin-top: 76px;
                }

                .hero-bg-animation {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    pointer-events: none;
                }

                .bubble {
                    position: absolute;
                    bottom: -100px;
                    background: radial-gradient(circle, rgba(254, 23, 27, 0.15) 0%, rgba(99, 102, 241, 0.08) 100%);
                    border-radius: 50%;
                    opacity: 0.6;
                    animation: rise 12s infinite ease-in-out;
                }

                .bubble:nth-child(1) { width: 80px; height: 80px; left: 5%; animation-duration: 8s; }
                .bubble:nth-child(2) { width: 120px; height: 120px; left: 15%; animation-duration: 12s; animation-delay: 2s; }
                .bubble:nth-child(3) { width: 60px; height: 60px; left: 25%; animation-duration: 7s; animation-delay: 1s; }
                .bubble:nth-child(4) { width: 100px; height: 100px; left: 35%; animation-duration: 10s; animation-delay: 3s; }
                .bubble:nth-child(5) { width: 150px; height: 150px; left: 55%; animation-duration: 14s; animation-delay: 4s; }
                .bubble:nth-child(6) { width: 70px; height: 70px; left: 70%; animation-duration: 9s; animation-delay: 1.5s; }
                .bubble:nth-child(7) { width: 90px; height: 90px; left: 80%; animation-duration: 11s; animation-delay: 2.5s; }
                .bubble:nth-child(8) { width: 110px; height: 110px; left: 90%; animation-duration: 13s; animation-delay: 1s; }

                @keyframes rise {
                    0% { bottom: -100px; transform: translateX(0) rotate(0deg); opacity: 0; }
                    20% { opacity: 0.6; }
                    80% { opacity: 0.4; }
                    100% { bottom: 100%; transform: translateX(40px) rotate(360deg); opacity: 0; }
                }

                .ai-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    border-radius: 50%;
                    opacity: 0;
                    animation: floatParticle 8s infinite ease-in-out;
                }

                .ai-particle:nth-child(11) { top: 20%; left: 10%; animation-duration: 6s; }
                .ai-particle:nth-child(12) { top: 50%; left: 85%; width: 6px; height: 6px; animation-duration: 7s; animation-delay: 1s; }
                .ai-particle:nth-child(13) { top: 70%; left: 20%; animation-duration: 5s; animation-delay: 2s; }
                .ai-particle:nth-child(14) { top: 30%; left: 75%; animation-duration: 8s; animation-delay: 0.5s; }

                @keyframes floatParticle {
                    0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
                    20% { opacity: 0.6; }
                    50% { transform: translateY(-60px) translateX(30px) scale(1.2); opacity: 0.8; }
                    80% { opacity: 0.4; }
                    100% { transform: translateY(-120px) translateX(60px) scale(0.8); opacity: 0; }
                }

                .glow-orb {
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(254, 23, 27, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%);
                    filter: blur(40px);
                    animation: pulseGlow 6s infinite alternate ease-in-out;
                }

                .glow-orb:nth-child(17) { width: 300px; height: 300px; top: -100px; right: -100px; animation-duration: 8s; }
                .glow-orb:nth-child(18) { width: 250px; height: 250px; bottom: -80px; left: -80px; animation-duration: 10s; animation-delay: 2s; }

                @keyframes pulseGlow {
                    0% { opacity: 0.3; transform: scale(1); }
                    100% { opacity: 0.7; transform: scale(1.2); }
                }

                .service-hero .container {
                    position: relative;
                    z-index: 2;
                }

                .service-icon-hero {
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, #FE171B10, #6366f110);
                    border-radius: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                }

                .service-icon-hero i {
                    font-size: 3rem;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .service-category {
                    display: inline-block;
                    padding: 6px 16px;
                    border-radius: 30px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 1.5rem;
                }

                .hero-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin-top: 2rem;
                }

                .btn-custom {
                    background: linear-gradient(105deg, #FE171B 0%, #6366f1 100%);
                    color: white;
                    border: none;
                    border-radius: 40px;
                    transition: all 0.3s;
                }

                .btn-custom:hover {
                    transform: translateY(-3px);
                    background: linear-gradient(105deg, #4338ca, #FE171B);
                    box-shadow: 0 15px 25px -8px rgba(79, 70, 229, 0.5);
                    color: white;
                }

                .btn-outline-custom {
                    border: 2px solid #FE171B;
                    color: #FE171B;
                    background: transparent;
                    border-radius: 40px;
                    transition: all 0.3s;
                }

                .btn-outline-custom:hover {
                    background: #FE171B;
                    color: white;
                    transform: translateY(-2px);
                }

                .service-content-section {
                    padding: 80px 0;
                    background: #ffffff;
                }

                .service-article {
                    font-size: 1.05rem;
                    line-height: 1.8;
                    color: #334155;
                }

                .service-article h2 {
                    font-size: 1.8rem;
                    margin: 2rem 0 1rem;
                    color: #1e293b;
                }

                .service-article h3 {
                    font-size: 1.4rem;
                    margin: 1.5rem 0 1rem;
                    color: #1e293b;
                }

                .service-article p {
                    margin-bottom: 1.5rem;
                }

                .service-article ul {
                    margin: 1rem 0 1.5rem;
                    padding-left: 1.5rem;
                }

                .service-article li {
                    margin-bottom: 0.5rem;
                }

                .features-grid {
                    margin: 3rem 0;
                }

                .feature-item {
                    display: flex;
                    gap: 15px;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                }

                .feature-item:hover {
                    transform: translateX(5px);
                    background: #f1f5f9;
                }

                .feature-item i {
                    font-size: 1.5rem;
                    color: #FE171B;
                    flex-shrink: 0;
                }

                .technologies-section {
                    margin: 3rem 0;
                }

                .technology-tag {
                    background: #f1f5f9;
                    padding: 8px 16px;
                    border-radius: 30px;
                    font-size: 0.85rem;
                    color: #1e293b;
                    transition: all 0.3s ease;
                }

                .technology-tag:hover {
                    background: #FE171B;
                    color: white;
                    transform: translateY(-2px);
                }

                .service-sidebar {
                    position: sticky;
                    top: 100px;
                }

                .sidebar-widget {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
                    border: 1px solid #f0f2f5;
                }

                .widget-title {
                    font-size: 1.2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #FE171B;
                    display: inline-block;
                }

                .quick-contact-form input,
                .quick-contact-form textarea {
                    width: 100%;
                    padding: 10px 15px;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .quick-contact-form input:focus,
                .quick-contact-form textarea:focus {
                    border-color: #FE171B;
                }

                .why-choose-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .why-choose-list li {
                    padding: 10px 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .why-choose-list li i {
                    color: #FE171B;
                    width: 20px;
                }

                .brochure-widget {
                    text-align: center;
                }

                .brochure-widget i {
                    font-size: 3rem;
                    color: #FE171B;
                    margin-bottom: 1rem;
                }

                .cta-section {
                    padding: 80px 0;
                    background: #f9fafc;
                }

                .cta-wrapper {
                    background: #ffffff;
                    border-radius: 48px;
                    padding: 3rem;
                    box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.05);
                    border: 1px solid #f0f2f5;
                }

                @media (max-width: 992px) {
                    .service-hero {
                        margin-top: 60px;
                    }
                }

                @media (max-width: 768px) {
                    .service-hero {
                        margin-top: 56px;
                    }
                    
                    .service-hero h1 {
                        font-size: 1.8rem;
                    }
                    
                    .hero-buttons {
                        flex-direction: column;
                    }
                    
                    .service-content-section {
                        padding: 50px 0;
                    }
                    
                    .service-sidebar {
                        position: static;
                        margin-top: 40px;
                    }
                    
                    .cta-section {
                        padding: 50px 0;
                    }
                    
                    .cta-wrapper {
                        padding: 2rem;
                    }
                }
            `}</style>
        </>
    );
}