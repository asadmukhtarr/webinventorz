'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.webinventorz.com/api';

// Types
interface Testimonial {
    id: number;
    client_name: string;
    client_position: string;
    client_company: string;
    client_avatar: string | null;
    content: string;
    rating: number;
    star_rating: string;
    service_used: string;
    is_featured: boolean;
    created_at: string;
}

export default function TestimonialsPage() {
    const [mounted, setMounted] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[]>([]);
    const [services, setServices] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setMounted(true);
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const [testimonialsRes, featuredRes, servicesRes] = await Promise.all([
                fetch(`${API_URL}/testimonials?per_page=50`),
                fetch(`${API_URL}/testimonials/featured/list?limit=3`),
                fetch(`${API_URL}/testimonials/services/all`)
            ]);

            const testimonialsData = await testimonialsRes.json();
            if (testimonialsData.success) {
                setTestimonials(testimonialsData.data);
            }

            const featuredData = await featuredRes.json();
            if (featuredData.success) {
                setFeaturedTestimonials(featuredData.data);
            }

            const servicesData = await servicesRes.json();
            if (servicesData.success) {
                setServices(servicesData.data);
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter testimonials based on filters
    const getFilteredTestimonials = () => {
        let filtered = [...testimonials];

        if (activeFilter === 'featured') {
            filtered = filtered.filter(t => t.is_featured);
        }

        if (selectedRating) {
            filtered = filtered.filter(t => t.rating === selectedRating);
        }

        if (searchTerm) {
            filtered = filtered.filter(t =>
                t.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.client_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.service_used?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    // Render stars based on rating
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fa-star ${i <= rating ? 'fa-solid text-warning' : 'fa-regular text-muted'}`}
                    style={{ fontSize: '14px' }}
                ></i>
            );
        }
        return stars;
    };

    if (!mounted) {
        return null;
    }

    if (loading) {
        return (
            <div className="text-center" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
            }}>
                <div className="loader-wrapper">
                    <img src="/logo.gif" alt="Loading..." className="loader-gif" style={{
                        width: '120px',
                        height: 'auto',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }} />
                    <style>{`
                        @keyframes pulse {
                            0%, 100% { transform: scale(1); opacity: 1; }
                            50% { transform: scale(1.1); opacity: 0.8; }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    const filteredTestimonials = getFilteredTestimonials();

    return (
        <>
            {/* Hero Section */}
            <section className="testimonials-hero">
                <div className="hero-bg-animation">
                    {[...Array(10)].map((_, i) => (
                        <div key={`bubble-${i}`} className="bubble"></div>
                    ))}
                    {[...Array(8)].map((_, i) => (
                        <div key={`particle-${i}`} className="ai-particle"></div>
                    ))}
                    <div className="glow-orb"></div>
                    <div className="glow-orb"></div>
                </div>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8" data-aos="fade-up">
                            <span className="badge bg-light text-dark px-3 py-2 rounded-pill mb-4">
                                <i className="fa-regular fa-message me-1"></i> Client Stories
                            </span>
                            <h1 className="display-3 fw-bold mb-4">
                                What Our <span className="gradient-text">Clients Say</span>
                            </h1>
                            <p className="lead text-secondary mb-4 px-md-4">
                                Don't just take our word for it. Here's what our amazing clients have to say about working with us.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Testimonials Section */}
            {featuredTestimonials.length > 0 && (
                <section className="featured-section">
                    <div className="container">
                        <div className="row g-4">
                            {featuredTestimonials.map((testimonial, idx) => (
                                <div key={testimonial.id} className="col-md-4" data-aos="fade-up" data-aos-delay={idx * 100}>
                                    <div className="featured-card">
                                        <div className="quote-icon">
                                            <i className="fa-solid fa-quote-right"></i>
                                        </div>
                                        <div className="stars mb-3">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                        <p className="testimonial-text">{testimonial.content}</p>
                                        <div className="client-info">
                                            {testimonial.client_avatar ? (
                                                <img src={testimonial.client_avatar} alt={testimonial.client_name} className="client-avatar" />
                                            ) : (
                                                <div className="client-avatar-placeholder">
                                                    <i className="fa-solid fa-user"></i>
                                                </div>
                                            )}
                                            <div>
                                                <h5 className="mb-0">{testimonial.client_name}</h5>
                                                <p className="mb-0 text-muted small">
                                                    {testimonial.client_position}
                                                    {testimonial.client_company && ` at ${testimonial.client_company}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Filters Section */}
            <section className="filters-section">
                <div className="container">
                    <div className="filters-wrapper">
                        <div className="row align-items-center g-3">
                            <div className="col-md-8">
                                <div className="filter-buttons">
                                    <button
                                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                        onClick={() => setActiveFilter('all')}
                                    >
                                        All Reviews
                                    </button>
                                    <button
                                        className={`filter-btn ${activeFilter === 'featured' ? 'active' : ''}`}
                                        onClick={() => setActiveFilter('featured')}
                                    >
                                        <i className="fa-solid fa-star me-1"></i> Featured
                                    </button>
                                    <div className="rating-filter">
                                        {[5, 4, 3, 2, 1].map(rating => (
                                            <button
                                                key={rating}
                                                className={`rating-btn ${selectedRating === rating ? 'active' : ''}`}
                                                onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                                            >
                                                {rating} <i className="fa-solid fa-star"></i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="search-box">
                                    <i className="fa-solid fa-search"></i>
                                    <input
                                        type="text"
                                        placeholder="Search by name, company or service..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* All Testimonials Grid */}
            <section className="testimonials-grid-section">
                <div className="container">
                    {filteredTestimonials.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fa-regular fa-face-frown fa-3x text-muted mb-3"></i>
                            <h4 className="text-muted">No testimonials found</h4>
                            <p className="text-secondary">Try adjusting your search or filter criteria.</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredTestimonials.map((testimonial, idx) => (
                                <div key={testimonial.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={idx % 3 * 100}>
                                    <div className="testimonial-card">
                                        <div className="stars mb-3">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                        <p className="testimonial-text">"{testimonial.content.substring(0, 150)}..."</p>
                                        <div className="service-tag">
                                            <i className="fa-solid fa-tag me-1"></i> {testimonial.service_used || 'General'}
                                        </div>
                                        <hr />
                                        <div className="client-info">
                                            {testimonial.client_avatar ? (
                                                <img src={testimonial.client_avatar} alt={testimonial.client_name} className="client-avatar-sm" />
                                            ) : (
                                                <div className="client-avatar-placeholder-sm">
                                                    <i className="fa-solid fa-user"></i>
                                                </div>
                                            )}
                                            <div>
                                                <h6 className="mb-0 fw-bold">{testimonial.client_name}</h6>
                                                <p className="mb-0 text-muted small">
                                                    {testimonial.client_position}
                                                    {testimonial.client_company && ` at ${testimonial.client_company}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-wrapper text-center mx-auto" data-aos="zoom-in">
                        <h2 className="fw-bold display-6">Ready to Start Your Journey?</h2>
                        <p className="text-secondary mb-4 col-lg-8 mx-auto">
                            Join our happy clients and let's create something amazing together.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <Link href="/contact" className="btn btn-custom px-5 py-3">
                                Contact Us <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                            <Link href="/portfolio" className="btn btn-outline-custom px-5 py-3">
                                View Our Work
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
                
                /* Hero Section */
                .testimonials-hero {
                    min-height: 45vh;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    position: relative;
                    overflow: hidden;
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
                
                @keyframes pulseGlow {
                    0% { opacity: 0.3; transform: scale(1); }
                    100% { opacity: 0.7; transform: scale(1.2); }
                }
                
                .testimonials-hero .container {
                    position: relative;
                    z-index: 2;
                }
                
                .gradient-text {
                    background: linear-gradient(120deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                /* Featured Section */
                .featured-section {
                    padding: 60px 0 40px 0;
                    background: #ffffff;
                }
                
                .featured-card {
                    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    border-radius: 24px;
                    padding: 2rem;
                    position: relative;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                    border: 1px solid #eef2f6;
                    transition: all 0.3s ease;
                    height: 100%;
                }
                
                .featured-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }
                
                .quote-icon {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-size: 3rem;
                    color: #FE171B20;
                }
                
                .testimonial-text {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #475569;
                    margin-bottom: 1.5rem;
                    font-style: italic;
                }
                
                .client-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .client-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                
                .client-avatar-placeholder {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                
                .client-avatar-sm {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                
                .client-avatar-placeholder-sm {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 0.9rem;
                }
                
                /* Filters Section */
                .filters-section {
                    padding: 30px 0;
                    background: #f8fafc;
                }
                
                .filters-wrapper {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 20px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
                }
                
                .filter-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    align-items: center;
                }
                
                .filter-btn {
                    padding: 8px 20px;
                    border-radius: 30px;
                    border: 1.5px solid #e2e8f0;
                    background: white;
                    color: #475569;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .filter-btn.active {
                    background: linear-gradient(135deg, #FE171B, #cc1215);
                    border-color: #FE171B;
                    color: white;
                }
                
                .filter-btn:hover:not(.active) {
                    border-color: #FE171B;
                    color: #FE171B;
                }
                
                .rating-filter {
                    display: flex;
                    gap: 8px;
                    margin-left: 10px;
                }
                
                .rating-btn {
                    padding: 8px 12px;
                    border-radius: 30px;
                    border: 1.5px solid #e2e8f0;
                    background: white;
                    color: #475569;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .rating-btn.active {
                    background: #fbbf24;
                    border-color: #fbbf24;
                    color: white;
                }
                
                .rating-btn:hover:not(.active) {
                    border-color: #fbbf24;
                    color: #fbbf24;
                }
                
                .search-box {
                    position: relative;
                }
                
                .search-box i {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }
                
                .search-box input {
                    width: 100%;
                    padding: 10px 15px 10px 40px;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 30px;
                    outline: none;
                    transition: all 0.3s;
                }
                
                .search-box input:focus {
                    border-color: #FE171B;
                    box-shadow: 0 0 0 3px rgba(254, 23, 27, 0.1);
                }
                
                /* Testimonials Grid */
                .testimonials-grid-section {
                    padding: 60px 0;
                    background: #ffffff;
                }
                
                .testimonial-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    border: 1px solid #eef2f6;
                    transition: all 0.3s ease;
                    height: 100%;
                }
                
                .testimonial-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }
                
                .stars {
                    display: flex;
                    gap: 2px;
                }
                
                .service-tag {
                    display: inline-block;
                    background: #f1f5f9;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    color: #475569;
                    margin-bottom: 1rem;
                }
                
                hr {
                    margin: 1rem 0;
                    border-color: #eef2f6;
                }
                
                /* CTA Section */
                .cta-section {
                    padding: 80px 0;
                    background: #f8fafc;
                }
                
                .cta-wrapper {
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    padding: 3rem;
                    border-radius: 32px;
                    color: white;
                }
                
                .cta-wrapper h2 {
                    color: white;
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
                
                @media (max-width: 768px) {
                    .testimonials-hero {
                        min-height: 35vh;
                    }
                    .testimonials-hero h1 {
                        font-size: 2rem;
                    }
                    .featured-section {
                        padding: 40px 0 20px 0;
                    }
                    .filters-section {
                        padding: 20px 0;
                    }
                    .filter-buttons {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .rating-filter {
                        justify-content: center;
                    }
                    .testimonials-grid-section {
                        padding: 40px 0;
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