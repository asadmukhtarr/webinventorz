'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from "./logo.gif";

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

const processSteps = [
    {
        number: "01",
        title: "Discovery",
        description: "Understanding your goals, requirements, and target audience.",
        aosDelay: "100"
    },
    {
        number: "02",
        title: "Strategy",
        description: "Creating a comprehensive plan and architecture for your project.",
        aosDelay: "200"
    },
    {
        number: "03",
        title: "Development",
        description: "Agile development with regular updates and feedback loops.",
        aosDelay: "300"
    },
    {
        number: "04",
        title: "Launch & Support",
        description: "Deployment, testing, and ongoing maintenance and support.",
        aosDelay: "400"
    }
];

export default function Services() {
    const [mounted, setMounted] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch(`${API_URL}/services`);
            const data = await response.json();

            if (data.success) {
                setServices(data.data);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            // Add a small delay to show loader
            setTimeout(() => {
                setLoading(false);
            }, 500);
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
                    margin: '-70px'
                }}
            >
                <div className="loader-wrapper">
                    <img
                        src="./logo.gif"
                        alt="Loading..."
                        className="loader-gif"
                        style={{
                            width: '120px',
                            height: 'auto',
                            animation: 'pulse 1.5s ease-in-out infinite'
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

    return (
        <>
            {/* Services Hero Section with Bubbles */}
            <section className="services-hero">
                {/* Animated Bubbles & AI Particles Background */}
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
                        <div className="col-lg-8" data-aos="fade-up" data-aos-duration="800">
                            <span className="badge bg-light text-dark px-3 py-2 rounded-pill mb-4 badge-animate"
                                style={{ background: '#f0f4fe !important', color: '#FE171B' }}>
                                <i className="fa fa-rocket me-1"></i> What We Offer
                            </span>
                            <h1 className="display-3 fw-bold mb-4">
                                Expert <span className="gradient-text">Digital Services</span>
                            </h1>
                            <p className="lead text-secondary mb-4 px-md-4" style={{ fontSize: '1.2rem' }}>
                                Comprehensive technology solutions tailored to your business needs, from development to
                                marketing and beyond.
                            </p>
                            <div className="d-flex flex-wrap gap-3 justify-content-center">
                                <Link href="#services" className="btn btn-custom btn-lg px-4">
                                    View All Services <i className="fa fa-arrow-right ms-2"></i>
                                </Link>
                                <Link href="/contact" className="btn btn-outline-custom btn-lg px-4">
                                    Contact Us <i className="fa fa-headset ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="services-section bg-mild-gray" id="services">
                <div className="container">
                    <div className="text-center mb-5" data-aos="fade-up">
                        <h2 className="fw-bold display-6">Our Core Services</h2>
                        <p className="text-secondary col-lg-6 mx-auto">
                            Comprehensive digital solutions to help your business thrive in the modern era.
                        </p>
                    </div>
                    <div className="row g-4">
                        {services.map((service, index) => (
                            <div key={service.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                                <div className="service-card">
                                    <div className="service-icon">
                                        <i className={service.icon || "fa-solid fa-code"}></i>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.short_description || service.description}</p>
                                    <div className="service-tags">
                                        {(service.tags || service.technologies || ["Development", "Support"]).slice(0, 4).map((tag, idx) => (
                                            <span key={idx} className="service-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <Link href={`/services/${service.slug || service.id}`} className="btn btn-outline-custom mt-2">
                                        Learn More →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="text-center mb-5" data-aos="fade-up">
                        <h2 className="fw-bold display-6">Our Process</h2>
                        <p className="text-secondary col-lg-6 mx-auto">
                            A streamlined approach to deliver exceptional results every time.
                        </p>
                    </div>
                    <div className="row g-4">
                        {processSteps.map((step, index) => (
                            <div key={index} className="col-md-3" data-aos="fade-up" data-aos-delay={step.aosDelay}>
                                <div className="process-step">
                                    <div className="step-number">{step.number}</div>
                                    <h5 className="fw-bold">{step.title}</h5>
                                    <p className="small text-secondary">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-mild-gray">
                <div className="container">
                    <div className="cta-wrapper text-center mx-auto" style={{ maxWidth: '900px' }} data-aos="zoom-in">
                        <h2 className="fw-bold display-6">Ready to Elevate Your Business?</h2>
                        <p className="text-secondary mb-4 col-lg-8 mx-auto">
                            Let's discuss how our services can help you achieve your goals. Get a free consultation today.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <Link href="/quote" className="btn btn-custom px-5 py-3">
                                Get Started <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                            <Link href="/pricing" className="btn btn-outline-custom px-5 py-3">
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Inter', 'Poppins', sans-serif;
                    background-color: #ffffff;
                    color: #1e293b;
                    overflow-x: hidden;
                }
                
                h1, h2, h3 {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }
                
                .bg-mild-gray {
                    background: #f8fafc;
                }
                
                .section {
                    padding: 80px 0;
                }
                
                /* Hero Section */
                .services-hero {
                    min-height: 70vh;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    position: relative;
                    overflow: hidden;
                    margin-top:-20px;
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
                
                .services-hero .container {
                    position: relative;
                    z-index: 2;
                }
                
                .gradient-text {
                    background: linear-gradient(120deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                .badge-animate {
                    transition: all 0.2s;
                }
                
                .btn-custom {
                    background: linear-gradient(105deg, #FE171B 0%, #6366f1 100%);
                    color: white;
                    border: none;
                    border-radius: 40px;
                    transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
                    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
                }
                
                .btn-custom:hover {
                    transform: translateY(-3px);
                    background: linear-gradient(105deg, #4338ca, #FE171B);
                    box-shadow: 0 15px 25px -8px rgba(79, 70, 229, 0.5);
                    color: white;
                }
                
                .btn-outline-custom {
                    color: #FE171B;
                    background: transparent;
                    border-radius: 40px;
                    transition: all 0.3s;
                }
                
                .btn-outline-custom:hover {
                    color: white;
                    transform: translateY(-2px);
                }
                
                /* Service Cards */
                .service-card {
                    background: white;
                    border-radius: 24px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    height: 100%;
                    box-shadow: 0 10px 30px -15px rgba(0,0,0,0.05);
                    border: 1px solid #eef2f6;
                }
                
                .service-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 35px -12px rgba(0,0,0,0.1);
                    border-color: #FE171B;
                }
                
                .service-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                }
                
                .service-icon i {
                    font-size: 32px;
                    color: white;
                }
                
                .service-card h3 {
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                }
                
                .service-card p {
                    color: #64748b;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }
                
                .service-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                .service-tag {
                    background: #f1f5f9;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    color: #475569;
                }
                
                
                
                /* CTA Section */
                .cta-wrapper {
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    padding: 3rem;
                    border-radius: 32px;
                    color: white;
                }
                
                .cta-wrapper h2 {
                    color: white;
                }
                
                .cta-wrapper .text-secondary {
                    color: #94a3b8 !important;
                }
                
                @media (max-width: 768px) {
                    .section {
                        padding: 60px 0;
                    }
                    .services-hero {
                        min-height: 50vh;
                        text-align: center;
                    }
                    .service-card {
                        padding: 1.5rem;
                    }
                    .cta-wrapper {
                        padding: 2rem;
                    }
                }
            `}</style>
        </>
    );
}