'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types
interface Settings {
    site_name?: string;
    site_title?: string;
    site_description?: string;
    site_keywords?: string;
    site_logo?: string;
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
    seo_title?: string;
    seo_description?: string;
    about_hero_title?: string;
    about_hero_subtitle?: string;
    about_story_title?: string;
    about_story_content?: string;
    about_mission_title?: string;
    about_mission_content?: string;
    about_vision_title?: string;
    about_vision_content?: string;
    about_stats_projects?: string;
    about_stats_clients?: string;
    about_stats_experience?: string;
    about_stats_support?: string;
    about_image?: string;
}

interface TeamMember {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
    bio: string;
    designation: {
        id: number;
        name: string;
        color: string;
        icon: string;
    } | null;
    social_links: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        github?: string;
    };
}

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
}

interface PortfolioItem {
    id: number;
    title: string;
    slug: string;
    category: string;
    description: string;
    featured_image: string | null;
    technologies: string[];
}

export default function AboutPage() {
    const [mounted, setMounted] = useState(false);
    const [settings, setSettings] = useState<Settings>({});
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const [settingsRes, teamRes, testimonialsRes, portfolioRes] = await Promise.all([
                fetch(`${API_URL}/settings/general/all`),
                fetch(`${API_URL}/team/members`),
                fetch(`${API_URL}/testimonials?featured=true&limit=6`),
                fetch(`${API_URL}/portfolio?limit=6`)
            ]);

            const settingsData = await settingsRes.json();
            if (settingsData.success) {
                setSettings(settingsData.data);
            }

            const teamData = await teamRes.json();
            if (teamData.success) {
                setTeamMembers(teamData.data.slice(0, 4));
            }

            const testimonialsData = await testimonialsRes.json();
            if (testimonialsData.success) {
                setTestimonials(testimonialsData.data);
            }

            const portfolioData = await portfolioRes.json();
            if (portfolioData.success) {
                setPortfolioItems(portfolioData.data.slice(0, 6));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
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

    const heroTitle = settings.about_hero_title || 'We\'re WebInventorz';
    const heroSubtitle = settings.about_hero_subtitle || 'Crafting digital excellence with a human touch. We\'re a team of passionate creators, developers, and strategists dedicated to helping businesses thrive in the digital age.';
    const storyTitle = settings.about_story_title || 'Innovation Meets Excellence';
    const storyContent = settings.about_story_content || 'Founded with a vision to transform digital experiences, WebInventorz has grown from a small team of enthusiasts to a full-service digital agency serving clients worldwide. Our journey began when we realized that businesses needed more than just websites—they needed comprehensive digital solutions that drive real results. Today, we\'re proud to have helped over 200+ businesses achieve their digital goals. We believe in the power of technology to transform businesses, and we\'re committed to delivering solutions that not only meet but exceed expectations.';
    const missionTitle = settings.about_mission_title || 'Our Mission';
    const missionContent = settings.about_mission_content || 'To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting value. We\'re committed to delivering excellence in every project we undertake.';
    const visionTitle = settings.about_vision_title || 'Our Vision';
    const visionContent = settings.about_vision_content || 'To become a global leader in digital innovation, recognized for our commitment to quality, creativity, and client success. We envision a world where every business has access to world-class digital solutions.';

    const statsProjects = settings.about_stats_projects || '200+';
    const statsClients = settings.about_stats_clients || '100+';
    const statsExperience = settings.about_stats_experience || '8+';
    const statsSupport = settings.about_stats_support || '24/7';
    const aboutImage = settings.about_image || 'https://placehold.co/600x500/1e293b/ffffff?text=About+Us';

    return (
        <>
            {/* About Hero Section with Bubbles */}
            <section className="about-hero">
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
                                <i className="fa fa-rocket me-1"></i> About Us
                            </span>
                            <h1 className="display-3 fw-bold mb-4">
                                {heroTitle}
                            </h1>
                            <p className="lead text-secondary mb-4 px-md-4">
                                {heroSubtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="story-section">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6" data-aos="fade-right">
                            <span className="section-badge">Our Story</span>
                            <h2 className="fw-bold mb-4">{storyTitle}</h2>
                            <p className="text-secondary mb-0">
                                {storyContent}
                            </p>
                            <div className="row g-4 mt-4">
                                <div className="col-6">
                                    <div className="stat-box">
                                        <h3 className="fw-bold text-primary mb-1">{statsProjects}</h3>
                                        <p className="text-muted mb-0">Projects Completed</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="stat-box">
                                        <h3 className="fw-bold text-primary mb-1">{statsClients}</h3>
                                        <p className="text-muted mb-0">Happy Clients</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="stat-box">
                                        <h3 className="fw-bold text-primary mb-1">{statsExperience}</h3>
                                        <p className="text-muted mb-0">Years Experience</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="stat-box">
                                        <h3 className="fw-bold text-primary mb-1">{statsSupport}</h3>
                                        <p className="text-muted mb-0">Support Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-left">
                            <div className="story-image">
                                <img
                                    src={aboutImage}
                                    alt="Our Story"
                                    className="img-fluid rounded-4 shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mission-section bg-mild-gray">
                <div className="container">
                    <div className="text-center mb-5" data-aos="fade-up">
                        <span className="section-badge">Our Purpose</span>
                        <h2 className="fw-bold display-6">Mission & Vision</h2>
                        <p className="text-secondary col-lg-6 mx-auto">
                            Guiding principles that drive everything we do
                        </p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="mission-card">
                                <div className="mission-icon">
                                    <i className="fa-solid fa-bullseye"></i>
                                </div>
                                <h3 className="fw-bold mb-3">{missionTitle}</h3>
                                <p className="text-secondary mb-0">
                                    {missionContent}
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="mission-card">
                                <div className="mission-icon">
                                    <i className="fa-solid fa-eye"></i>
                                </div>
                                <h3 className="fw-bold mb-3">{visionTitle}</h3>
                                <p className="text-secondary mb-0">
                                    {visionContent}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {teamMembers.length > 0 && (
                <section className="team-section">
                    <div className="container">
                        <div className="text-center mb-5" data-aos="fade-up">
                            <span className="section-badge">Our Team</span>
                            <h2 className="fw-bold display-6">Meet Our Experts</h2>
                            <p className="text-secondary col-lg-6 mx-auto">
                                Passionate professionals dedicated to your success
                            </p>
                        </div>
                        <div className="row g-4">
                            {teamMembers.map((member, index) => (
                                <div key={member.id} className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={index * 100}>
                                    <div className="team-card">
                                        <div className="team-avatar">
                                            {member.avatar ? (
                                                <img src={member.avatar} alt={member.name} />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    {member.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="fw-bold mb-1">{member.name}</h4>
                                        <p className="team-designation">{member.designation?.name || 'Team Member'}</p>
                                        <p className="team-bio small text-secondary">{member.bio?.substring(0, 80)}</p>
                                        <div className="team-social">
                                            {member.social_links?.facebook && (
                                                <a href={member.social_links.facebook} target="_blank" rel="noopener noreferrer">
                                                    <i className="fab fa-facebook-f"></i>
                                                </a>
                                            )}
                                            {member.social_links?.twitter && (
                                                <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer">
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                            )}
                                            {member.social_links?.linkedin && (
                                                <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <i className="fab fa-linkedin-in"></i>
                                                </a>
                                            )}
                                            {member.social_links?.instagram && (
                                                <a href={member.social_links.instagram} target="_blank" rel="noopener noreferrer">
                                                    <i className="fab fa-instagram"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <Link href="/team" className="btn btn-outline-custom">
                                View All Team Members <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Portfolio Section */}
            {portfolioItems.length > 0 && (
                <section className="portfolio-section bg-mild-gray">
                    <div className="container">
                        <div className="text-center mb-5" data-aos="fade-up">
                            <span className="section-badge">Our Work</span>
                            <h2 className="fw-bold display-6">Recent Projects</h2>
                            <p className="text-secondary col-lg-6 mx-auto">
                                Some of our best work that we're proud of
                            </p>
                        </div>
                        <div className="row g-4">
                            {portfolioItems.slice(0, 6).map((item, index) => (
                                <div key={item.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                                    <Link href={`/portfolio/${item.slug}`} className="portfolio-card">
                                        <div className="portfolio-image">
                                            <img src={item.featured_image || '/placeholder.jpg'} alt={item.title} />
                                            <span className="portfolio-category">{item.category}</span>
                                        </div>
                                        <div className="portfolio-body">
                                            <h5 className="fw-bold mb-1">{item.title}</h5>
                                            <p className="small text-muted mb-0">{item.description?.substring(0, 60)}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <Link href="/portfolio" className="btn btn-outline-custom">
                                View All Projects <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="testimonials-section">
                    <div className="container">
                        <div className="text-center mb-5" data-aos="fade-up">
                            <span className="section-badge">Testimonials</span>
                            <h2 className="fw-bold display-6">What Our Clients Say</h2>
                            <p className="text-secondary col-lg-6 mx-auto">
                                Don't just take our word for it
                            </p>
                        </div>
                        <div className="row g-4">
                            {testimonials.slice(0, 3).map((testimonial, index) => (
                                <div key={testimonial.id} className="col-md-4" data-aos="fade-up" data-aos-delay={index * 100}>
                                    <div className="testimonial-card">
                                        <div className="testimonial-quote">
                                            <i className="fa-solid fa-quote-left"></i>
                                        </div>
                                        <p className="testimonial-text">{testimonial.content}</p>
                                        <div className="testimonial-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fa-star ${i < testimonial.rating ? 'fa-solid' : 'fa-regular'} text-warning`}></i>
                                            ))}
                                        </div>
                                        <div className="testimonial-author">
                                            <div className="author-avatar">
                                                {testimonial.client_avatar ? (
                                                    <img src={testimonial.client_avatar} alt={testimonial.client_name} />
                                                ) : (
                                                    <div className="avatar-placeholder-small">
                                                        {testimonial.client_name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="author-info">
                                                <h6 className="fw-bold mb-0">{testimonial.client_name}</h6>
                                                <small className="text-muted">{testimonial.client_position}, {testimonial.client_company}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <Link href="/testimonials" className="btn btn-outline-custom">
                                Read More Testimonials <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Core Values Section */}
            <section className="values-section">
                <div className="container">
                    <div className="text-center mb-5" data-aos="fade-up">
                        <span className="section-badge">What We Believe</span>
                        <h2 className="fw-bold display-6">Our Core Values</h2>
                        <p className="text-secondary col-lg-6 mx-auto">
                            Principles that guide our work and relationships
                        </p>
                    </div>
                    <div className="row g-4">
                        {[
                            { icon: "fa-solid fa-heart", title: "Passion", desc: "We love what we do and it shows in our work" },
                            { icon: "fa-solid fa-lightbulb", title: "Innovation", desc: "We constantly explore new technologies and approaches" },
                            { icon: "fa-solid fa-handshake", title: "Integrity", desc: "We believe in honest, transparent relationships" },
                            { icon: "fa-solid fa-users", title: "Collaboration", desc: "We work together to achieve extraordinary results" },
                            { icon: "fa-solid fa-chart-line", title: "Excellence", desc: "We strive for the highest quality in everything" },
                            { icon: "fa-solid fa-clock", title: "Commitment", desc: "We're dedicated to our clients' success" }
                        ].map((value, index) => (
                            <div key={index} className="col-md-4" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="value-card">
                                    <div className="value-icon">
                                        <i className={value.icon}></i>
                                    </div>
                                    <h4 className="fw-bold mb-2">{value.title}</h4>
                                    <p className="text-secondary mb-0 small">{value.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-wrapper text-center mx-auto" style={{ maxWidth: '900px' }} data-aos="zoom-in">
                        <h2 className="fw-bold display-6">Ready to Work Together?</h2>
                        <p className="text-secondary mb-4 col-lg-8 mx-auto">
                            Let's discuss your project and create something amazing together.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <Link href="/quote" className="btn btn-custom px-5 py-3">
                                Get Started <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                            <Link href="/contact" className="btn btn-outline-custom px-5 py-3">
                                Contact Us
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
                
                .bg-mild-gray {
                    background: #f8fafc;
                }
                
                /* Hero Section */
                .about-hero {
                    min-height: 50vh;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    position: relative;
                    overflow: hidden;
                    margin-top: 0px;
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
                
                .about-hero .container {
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
                
                .section-badge {
                    display: inline-block;
                    padding: 6px 16px;
                    border-radius: 30px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    background: #f0f4fe;
                    color: #FE171B;
                    margin-bottom: 1rem;
                }
                
                /* Story Section */
                .story-section {
                    padding: 80px 0;
                    background: #ffffff;
                }
                
                .stat-box {
                    background: #f8fafc;
                    padding: 1rem;
                    border-radius: 16px;
                    text-align: center;
                    transition: all 0.3s ease;
                }
                
                .stat-box:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                }
                
                .story-image {
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                
                /* Mission Section */
                .mission-section {
                    padding: 80px 0;
                }
                
                .mission-card {
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 2rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
                    height: 100%;
                }
                
                .mission-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                }
                
                .mission-icon {
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, #FE171B10, #6366f110);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                }
                
                .mission-icon i {
                    font-size: 2rem;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                /* Team Section */
                .team-section {
                    padding: 80px 0;
                    background: #ffffff;
                }
                
                .team-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
                    height: 100%;
                }
                
                .team-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                }
                
                .team-avatar {
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 1rem;
                    border-radius: 50%;
                    overflow: hidden;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                }
                
                .team-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .avatar-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    color: white;
                    font-size: 3rem;
                    font-weight: bold;
                }
                
                .team-designation {
                    font-size: 0.85rem;
                    color: #FE171B;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }
                
                .team-bio {
                    color: #64748b;
                    margin-bottom: 1rem;
                }
                
                .team-social {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                }
                
                .team-social a {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f1f5f9;
                    border-radius: 50%;
                    color: #475569;
                    transition: all 0.3s ease;
                }
                
                .team-social a:hover {
                    background: #FE171B;
                    color: white;
                    transform: translateY(-2px);
                }
                
                /* Portfolio Section */
                .portfolio-section {
                    padding: 80px 0;
                }
                
                .portfolio-card {
                    display: block;
                    background: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
                    text-decoration: none;
                    color: inherit;
                    height: 100%;
                }
                
                .portfolio-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                }
                
                .portfolio-image {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                }
                
                .portfolio-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                
                .portfolio-card:hover .portfolio-image img {
                    transform: scale(1.05);
                }
                
                .portfolio-category {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: #FE171B;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }
                
                .portfolio-body {
                    padding: 1rem;
                }
                
                /* Testimonials Section */
                .testimonials-section {
                    padding: 80px 0;
                    background: #f8fafc;
                }
                
                .testimonial-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
                    height: 100%;
                }
                
                .testimonial-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                }
                
                .testimonial-quote {
                    font-size: 2rem;
                    color: #FE171B;
                    opacity: 0.3;
                    margin-bottom: 1rem;
                }
                
                .testimonial-text {
                    color: #475569;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }
                
                .testimonial-rating {
                    margin-bottom: 1rem;
                }
                
                .testimonial-author {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 1rem;
                }
                
                .author-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                }
                
                .author-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .avatar-placeholder-small {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    color: white;
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                
                /* Values Section */
                .values-section {
                    padding: 80px 0;
                    background: #ffffff;
                }
                
                .value-card {
                    background: #f8fafc;
                    border-radius: 20px;
                    padding: 1.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    height: 100%;
                }
                
                .value-card:hover {
                    transform: translateY(-5px);
                    background: #ffffff;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                }
                
                .value-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #FE171B10, #6366f110);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                }
                
                .value-icon i {
                    font-size: 1.5rem;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
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
                
                @media (max-width: 768px) {
                    .story-section, .mission-section, .team-section, .portfolio-section, .testimonials-section, .values-section, .cta-section {
                        padding: 50px 0;
                    }
                    
                    .mission-card, .value-card, .team-card, .testimonial-card {
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