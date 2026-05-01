'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types
interface PortfolioItem {
    id: number;
    title: string;
    slug: string;
    category: string;
    description: string;
    featured_image: string | null;
    gallery: string[];
    technologies: string[];
    challenges: string[];
    solutions: string[];
    results: string[];
    completion_date: string | null;
    is_featured: boolean;
    is_active: boolean;
}

export default function PortfolioPage() {
    const [mounted, setMounted] = useState(false);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const [filteredPortfolio, setFilteredPortfolio] = useState<PortfolioItem[]>([]);

    useEffect(() => {
        setMounted(true);
        fetchPortfolio();
    }, []);

    useEffect(() => {
        if (activeCategory === "all") {
            setFilteredPortfolio(portfolio);
        } else {
            setFilteredPortfolio(portfolio.filter(item => item.category === activeCategory));
        }
    }, [activeCategory, portfolio]);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/portfolio`);
            const data = await response.json();

            if (data.success) {
                const portfolioData = data.data as PortfolioItem[];
                setPortfolio(portfolioData);
                setFilteredPortfolio(portfolioData);

                // Extract unique categories - Fixed TypeScript issue
                const categorySet = new Set<string>();
                portfolioData.forEach((item: PortfolioItem) => {
                    if (item.category && item.category.trim() !== '') {
                        categorySet.add(item.category);
                    }
                });
                const uniqueCategories = Array.from(categorySet);
                setCategories(uniqueCategories);
            }
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) {
        return null;
    }

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
                        src="/logo.gif"
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
                            0%, 100% { transform: scale(1); opacity: 1; }
                            50% { transform: scale(1.1); opacity: 0.8; }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Portfolio Hero Section with Bubbles */}
            <section className="portfolio-hero">
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
                        <div className="col-lg-8" data-aos="fade-up" data-aos-duration="800">
                            <span className="badge bg-light text-dark px-3 py-2 rounded-pill mb-4 badge-animate"
                                style={{ background: '#f0f4fe !important', color: '#FE171B' }}>
                                <i className="fa fa-rocket me-1"></i> Our Work
                            </span>
                            <h1 className="display-3 fw-bold mb-4">
                                Our <span className="gradient-text">Portfolio</span>
                            </h1>
                            <p className="lead text-secondary mb-4 px-md-4">
                                Explore our latest projects and success stories. We've helped businesses across various industries achieve their digital goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            {categories.length > 0 && (
                <section className="filter-bar-section">
                    <div className="container">
                        <div className="filter-bar" data-aos="fade-up">
                            <div className="filter-title">
                                <i className="fa-solid fa-filter"></i> Filter by Category:
                            </div>
                            <div className="filter-buttons">
                                <button
                                    onClick={() => setActiveCategory("all")}
                                    className={`filter-chip ${activeCategory === "all" ? 'active' : ''}`}
                                >
                                    <i className="fa-solid fa-grid-2"></i> All Projects
                                    <span className="count">{portfolio.length}</span>
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                                    >
                                        <i className="fa-solid fa-tag"></i> {category}
                                        <span className="count">{portfolio.filter(p => p.category === category).length}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Portfolio Grid Section */}
            <section className="portfolio-grid-section">
                <div className="container">
                    {filteredPortfolio.length > 0 ? (
                        <div className="row g-4">
                            {filteredPortfolio.map((item, index) => (
                                <div key={item.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                                    <Link href={`/portfolio/${item.slug}`} className="portfolio-card">
                                        <div className="portfolio-image">
                                            <img src={item.featured_image || '/placeholder.jpg'} alt={item.title} />
                                            <div className="portfolio-overlay">
                                                <span className="portfolio-view">
                                                    <i className="fa-solid fa-magnifying-glass-plus"></i> View Project
                                                </span>
                                            </div>
                                            <span className="portfolio-category">{item.category}</span>
                                        </div>
                                        <div className="portfolio-body">
                                            <h4 className="fw-bold mb-2">{item.title}</h4>
                                            <p className="text-muted small mb-0">{item.description?.substring(0, 100)}</p>
                                            {item.technologies && item.technologies.length > 0 && (
                                                <div className="portfolio-tech mt-3">
                                                    {item.technologies.slice(0, 3).map((tech: string, idx: number) => (
                                                        <span key={idx} className="tech-tag">{tech}</span>
                                                    ))}
                                                    {item.technologies.length > 3 && (
                                                        <span className="tech-tag">+{item.technologies.length - 3}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <i className="fas fa-folder-open fa-4x text-muted mb-3"></i>
                            <h3 className="text-muted">No projects found</h3>
                            <p className="text-muted">Try changing the filter or check back later.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-wrapper text-center mx-auto" data-aos="zoom-in">
                        <h2 className="fw-bold display-6">Ready to Start Your Project?</h2>
                        <p className="text-secondary mb-4 col-lg-8 mx-auto">
                            Let's discuss your ideas and create something amazing together.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <Link href="/quote" className="btn btn-custom px-5 py-3">
                                Get a Quote <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                            <Link href="/contact" className="btn btn-outline-custom px-5 py-3">
                                Contact Us <i className="fa-solid fa-headset ms-2"></i>
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
                .portfolio-hero {
                    min-height: 50vh;
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
                
                .portfolio-hero .container {
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
                
                /* Filter Bar */
                .filter-bar-section {
                    padding: 30px 0;
                    background: #ffffff;
                    border-bottom: 1px solid #f0f2f5;
                    position: sticky;
                    top: 76px;
                    z-index: 99;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                }
                
                .filter-bar {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                
                .filter-title {
                    font-weight: 600;
                    color: #1e293b;
                }
                
                .filter-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .filter-chip {
                    background: #f1f5f9;
                    border: none;
                    padding: 8px 18px;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .filter-chip i {
                    font-size: 0.8rem;
                }
                
                .filter-chip .count {
                    background: #e2e8f0;
                    padding: 2px 6px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                }
                
                .filter-chip:hover {
                    background: #e2e8f0;
                    transform: translateY(-2px);
                }
                
                .filter-chip.active {
                    background: linear-gradient(135deg, #FE171B, #cc1215);
                    color: white;
                }
                
                .filter-chip.active .count {
                    background: rgba(255, 255, 255, 0.3);
                    color: white;
                }
                
                /* Portfolio Grid */
                .portfolio-grid-section {
                    padding: 80px 0;
                    background: #f9fafc;
                }
                
                .portfolio-card {
                    display: block;
                    background: #ffffff;
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
                    text-decoration: none;
                    color: inherit;
                    height: 100%;
                }
                
                .portfolio-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.15);
                }
                
                .portfolio-image {
                    position: relative;
                    height: 220px;
                    overflow: hidden;
                }
                
                .portfolio-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                
                .portfolio-card:hover .portfolio-image img {
                    transform: scale(1.05);
                }
                
                .portfolio-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(254, 23, 27, 0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                
                .portfolio-card:hover .portfolio-overlay {
                    opacity: 1;
                }
                
                .portfolio-view {
                    color: white;
                    font-weight: 600;
                    padding: 10px 20px;
                    border: 2px solid white;
                    border-radius: 40px;
                    font-size: 0.85rem;
                }
                
                .portfolio-view i {
                    margin-right: 8px;
                }
                
                .portfolio-category {
                    position: absolute;
                    bottom: 15px;
                    left: 15px;
                    background: #FE171B;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    z-index: 1;
                }
                
                .portfolio-body {
                    padding: 1.5rem;
                }
                
                .portfolio-tech {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 1rem;
                }
                
                .tech-tag {
                    background: #f1f5f9;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    color: #475569;
                }
                
                /* CTA Section */
                .cta-section {
                    padding: 80px 0;
                    background: #ffffff;
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
                
                .cta-wrapper .text-secondary {
                    color: #94a3b8 !important;
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
                
                @media (max-width: 992px) {
                    .portfolio-hero {
                        margin-top: 60px;
                    }
                    .filter-bar-section {
                        top: 60px;
                    }
                }
                
                @media (max-width: 768px) {
                    .portfolio-hero {
                        margin-top: 56px;
                    }
                    .filter-bar-section {
                        top: 56px;
                    }
                    .portfolio-grid-section {
                        padding: 50px 0;
                    }
                    .cta-section {
                        padding: 50px 0;
                    }
                    .cta-wrapper {
                        padding: 2rem;
                    }
                    .filter-bar {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .filter-buttons {
                        width: 100%;
                        overflow-x: auto;
                        padding-bottom: 10px;
                    }
                    .filter-chip {
                        white-space: nowrap;
                    }
                }
            `}</style>
        </>
    );
}