'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.webinventorz.com/api';

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
    client_name?: string;
    project_url?: string;
}

interface RelatedPortfolio {
    id: number;
    title: string;
    slug: string;
    category: string;
    featured_image: string | null;
}

export default function SinglePortfolioPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [mounted, setMounted] = useState(false);
    const [portfolio, setPortfolio] = useState<PortfolioItem | null>(null);
    const [relatedProjects, setRelatedProjects] = useState<RelatedPortfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showLightbox, setShowLightbox] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (slug) {
            fetchPortfolio();
        }
    }, [slug]);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/portfolio/${slug}`);
            const data = await response.json();

            if (data.success) {
                setPortfolio(data.data);
                if (data.data.featured_image) {
                    setSelectedImage(data.data.featured_image);
                } else if (data.data.gallery && data.data.gallery.length > 0) {
                    setSelectedImage(data.data.gallery[0]);
                }
                if (data.data.category) {
                    fetchRelatedProjects(data.data.category);
                }
            } else {
                setError(data.message || 'Project not found');
            }
        } catch (error: any) {
            console.error('Error fetching portfolio:', error);
            setError(error.message || 'Failed to load project');
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProjects = async (category: string) => {
        try {
            const response = await fetch(`${API_URL}/portfolio?category=${category}&limit=3`);
            const data = await response.json();
            if (data.success) {
                const filtered = data.data.filter((p: RelatedPortfolio) => p.slug !== slug);
                setRelatedProjects(filtered.slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching related projects:', error);
        }
    };

    const getImageUrl = (imagePath: string | null): string => {
        if (imagePath) {
            return imagePath;
        }
        return '/placeholder.jpg';
    };

    const getGalleryArray = (gallery: string[] | string): string[] => {
        if (Array.isArray(gallery)) return gallery;
        if (typeof gallery === 'string' && gallery) {
            try {
                const parsed = JSON.parse(gallery);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        return [];
    };

    const openLightbox = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setShowLightbox(true);
    };

    const closeLightbox = () => {
        setShowLightbox(false);
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
                    <h4 className="mt-3 text-muted">Loading project details...</h4>
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

    if (error || !portfolio) {
        return (
            <div className="text-center py-5" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <i className="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
                <h2>Project Not Found</h2>
                <p className="text-muted">{error || "The project you're looking for doesn't exist."}</p>
                <Link href="/portfolio" className="btn btn-primary mt-3">Back to Portfolio</Link>
            </div>
        );
    }

    const gallery = getGalleryArray(portfolio.gallery);
    const technologies = portfolio.technologies || [];
    const challenges = portfolio.challenges || [];
    const solutions = portfolio.solutions || [];
    const results = portfolio.results || [];

    return (
        <>
            {/* Portfolio Hero Section - Top Margin 0 */}
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
                        <div className="col-lg-10" data-aos="fade-up">
                            <span className="badge bg-light text-dark px-3 py-2 rounded-pill mb-4 badge-animate"
                                style={{ background: '#f0f4fe !important', color: '#FE171B' }}>
                                <i className="fa fa-rocket me-1"></i> {portfolio.category}
                            </span>
                            <h1 className="display-3 fw-bold mb-4">
                                <span className="gradient-text">{portfolio.title}</span>
                            </h1>
                            <p className="lead text-secondary mb-4">
                                {portfolio.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Content - Wider Container */}
            <section className="project-detail-section">
                <div className="container-fluid px-4 px-lg-5">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            {/* Featured Image */}
                            {portfolio.featured_image && (
                                <div className="featured-image-wrapper" data-aos="fade-up">
                                    <img
                                        src={getImageUrl(portfolio.featured_image)}
                                        alt={portfolio.title}
                                        className="img-fluid rounded-4 shadow-lg w-100"
                                        onClick={() => openLightbox(getImageUrl(portfolio.featured_image))}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            )}

                            {/* Gallery Section */}
                            {gallery.length > 0 && (
                                <div className="gallery-section" data-aos="fade-up">
                                    <h2 className="fw-bold mb-4">Project Gallery</h2>
                                    <div className="gallery-grid">
                                        {gallery.map((img, index) => (
                                            <div
                                                key={index}
                                                className="gallery-item"
                                                onClick={() => openLightbox(getImageUrl(img))}
                                            >
                                                <img src={getImageUrl(img)} alt={`${portfolio.title} - ${index + 1}`} />
                                                <div className="gallery-overlay">
                                                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Technologies Section */}
                            {technologies.length > 0 && (
                                <div className="technologies-section" data-aos="fade-up">
                                    <h2 className="fw-bold mb-4">Technologies Used</h2>
                                    <div className="tech-list">
                                        {technologies.map((tech, index) => (
                                            <span key={index} className="tech-badge">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Challenges & Solutions Section */}
                            {(challenges.length > 0 || solutions.length > 0) && (
                                <div className="row g-5" data-aos="fade-up">
                                    {challenges.length > 0 && (
                                        <div className="col-md-6">
                                            <div className="info-card">
                                                <div className="info-icon">
                                                    <i className="fa-solid fa-exclamation-triangle"></i>
                                                </div>
                                                <h3 className="fw-bold mb-3">Challenges Faced</h3>
                                                <ul className="info-list">
                                                    {challenges.map((challenge, index) => (
                                                        <li key={index}>
                                                            <i className="fa-solid fa-circle-exclamation"></i>
                                                            {challenge}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    {solutions.length > 0 && (
                                        <div className="col-md-6">
                                            <div className="info-card">
                                                <div className="info-icon">
                                                    <i className="fa-solid fa-lightbulb"></i>
                                                </div>
                                                <h3 className="fw-bold mb-3">Solutions Provided</h3>
                                                <ul className="info-list">
                                                    {solutions.map((solution, index) => (
                                                        <li key={index}>
                                                            <i className="fa-solid fa-check-circle"></i>
                                                            {solution}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Results Section */}
                            {results.length > 0 && (
                                <div className="results-section" data-aos="fade-up">
                                    <h2 className="fw-bold mb-4">Results Achieved</h2>
                                    <div className="row g-4">
                                        {results.map((result, index) => (
                                            <div key={index} className="col-md-4">
                                                <div className="result-card">
                                                    <i className="fa-solid fa-chart-line"></i>
                                                    <p>{result}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Project Info */}
                            <div className="project-info-section" data-aos="fade-up">
                                <div className="row g-4">
                                    {portfolio.completion_date && (
                                        <div className="col-md-4">
                                            <div className="info-item">
                                                <i className="fa-solid fa-calendar-alt"></i>
                                                <div>
                                                    <strong>Completion Date</strong>
                                                    <p>{new Date(portfolio.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {portfolio.client_name && (
                                        <div className="col-md-4">
                                            <div className="info-item">
                                                <i className="fa-solid fa-user"></i>
                                                <div>
                                                    <strong>Client</strong>
                                                    <p>{portfolio.client_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {portfolio.project_url && (
                                        <div className="col-md-4">
                                            <div className="info-item">
                                                <i className="fa-solid fa-globe"></i>
                                                <div>
                                                    <strong>Live Project</strong>
                                                    <a href={portfolio.project_url} target="_blank" rel="noopener noreferrer">Visit Website <i className="fa-solid fa-arrow-right"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="related-section">
                    <div className="container">
                        <div className="text-center mb-5" data-aos="fade-up">
                            <h2 className="fw-bold display-6">Related Projects</h2>
                            <p className="text-secondary col-lg-6 mx-auto">
                                Explore more projects in similar categories
                            </p>
                        </div>
                        <div className="row g-4">
                            {relatedProjects.map((project, index) => (
                                <div key={project.id} className="col-md-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                                    <Link href={`/portfolio/${project.slug}`} className="related-card">
                                        <div className="related-image">
                                            <img src={getImageUrl(project.featured_image)} alt={project.title} />
                                            <span className="related-category">{project.category}</span>
                                        </div>
                                        <div className="related-body">
                                            <h5 className="fw-bold mb-2">{project.title}</h5>
                                            <span className="related-link">View Project <i className="fa-solid fa-arrow-right"></i></span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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

            {/* Lightbox Modal */}
            {showLightbox && selectedImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>×</button>
                        <img src={getImageUrl(selectedImage)} alt="Project" />
                    </div>
                </div>
            )}

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
                
                /* Hero Section - Top Margin 0 */
                .portfolio-hero {
                    min-height: 50vh;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    position: relative;
                    overflow: hidden;
                    margin-top: 0;
                    padding-top: 40px;
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
                
                /* Project Detail - Wider Content */
                .project-detail-section {
                    padding: 60px 0;
                    background: #ffffff;
                }
                
                .featured-image-wrapper {
                    margin-bottom: 3rem;
                    cursor: pointer;
                }
                
                .featured-image-wrapper img {
                    width: 100%;
                    height: auto;
                    transition: transform 0.3s ease;
                }
                
                .featured-image-wrapper img:hover {
                    transform: scale(1.02);
                }
                
                /* Gallery Section */
                .gallery-section {
                    margin-bottom: 3rem;
                }
                
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                }
                
                .gallery-item {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    aspect-ratio: 1 / 1;
                }
                
                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                
                .gallery-item:hover img {
                    transform: scale(1.05);
                }
                
                .gallery-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(254, 23, 27, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                
                .gallery-item:hover .gallery-overlay {
                    opacity: 1;
                }
                
                .gallery-overlay i {
                    color: white;
                    font-size: 2rem;
                }
                
                /* Technologies */
                .technologies-section {
                    margin-bottom: 3rem;
                }
                
                .tech-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                
                .tech-badge {
                    background: linear-gradient(135deg, #FE171B10, #6366f110);
                    color: #1e293b;
                    padding: 8px 20px;
                    border-radius: 40px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                
                .tech-badge:hover {
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    color: white;
                    transform: translateY(-2px);
                }
                
                /* Info Cards */
                .info-card {
                    background: #f8fafc;
                    border-radius: 24px;
                    padding: 2rem;
                    height: 100%;
                    transition: all 0.3s ease;
                }
                
                .info-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                }
                
                .info-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #FE171B10, #6366f110);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                }
                
                .info-icon i {
                    font-size: 1.8rem;
                    color: #FE171B;
                }
                
                .info-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .info-list li {
                    padding: 10px 0;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .info-list li:last-child {
                    border-bottom: none;
                }
                
                .info-list i {
                    color: #FE171B;
                    width: 20px;
                }
                
                /* Results Section */
                .results-section {
                    margin-bottom: 3rem;
                }
                
                .result-card {
                    background: #f8fafc;
                    border-radius: 20px;
                    padding: 1.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    height: 100%;
                }
                
                .result-card:hover {
                    transform: translateY(-5px);
                    background: linear-gradient(135deg, #FE171B05, #6366f105);
                }
                
                .result-card i {
                    font-size: 2rem;
                    color: #FE171B;
                    margin-bottom: 1rem;
                }
                
                .result-card p {
                    margin: 0;
                    font-size: 0.95rem;
                    color: #475569;
                }
                
                /* Project Info */
                .project-info-section {
                    margin-bottom: 3rem;
                }
                
                .info-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    background: #f8fafc;
                    padding: 1.2rem;
                    border-radius: 16px;
                }
                
                .info-item i {
                    font-size: 1.5rem;
                    color: #FE171B;
                }
                
                .info-item strong {
                    display: block;
                    font-size: 0.8rem;
                    color: #64748b;
                }
                
                .info-item p, .info-item a {
                    margin: 0;
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: #1e293b;
                    text-decoration: none;
                }
                
                .info-item a:hover {
                    color: #FE171B;
                }
                
                /* Related Section */
                .related-section {
                    padding: 80px 0;
                    background: #f8fafc;
                }
                
                .related-card {
                    display: block;
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: inherit;
                    height: 100%;
                }
                
                .related-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                }
                
                .related-image {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                }
                
                .related-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                
                .related-card:hover .related-image img {
                    transform: scale(1.05);
                }
                
                .related-category {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    background: #FE171B;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                }
                
                .related-body {
                    padding: 1.2rem;
                }
                
                .related-link {
                    color: #FE171B;
                    font-weight: 600;
                    font-size: 0.85rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: gap 0.3s ease;
                }
                
                .related-link:hover {
                    gap: 12px;
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
                
                /* Lightbox */
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                
                .lightbox-content img {
                    width: 100%;
                    height: auto;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 8px;
                }
                
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 40px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .lightbox-close:hover {
                    color: #FE171B;
                }
                
                @media (max-width: 992px) {
                    .gallery-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                
                @media (max-width: 768px) {
                    .portfolio-hero {
                        padding-top: 20px;
                    }
                    .portfolio-hero h1 {
                        font-size: 2rem;
                    }
                    .gallery-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .project-detail-section {
                        padding: 40px 0;
                    }
                    .related-section, .cta-section {
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