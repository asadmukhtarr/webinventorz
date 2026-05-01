'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types
interface Settings {
    site_name?: string;
    contact_email?: string;
    contact_phone?: string;
    contact_phone_2?: string;
    contact_address?: string;
    contact_map_url?: string;
    business_hours?: string;
    business_saturday?: string;
    business_sunday?: string;
}

interface SocialSettings {
    social_facebook?: string;
    social_twitter?: string;
    social_instagram?: string;
    social_linkedin?: string;
    social_youtube?: string;
    social_github?: string;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export default function ContactPage() {
    const [mounted, setMounted] = useState(false);
    const [settings, setSettings] = useState<Settings>({});
    const [socialSettings, setSocialSettings] = useState<SocialSettings>({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setMounted(true);
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const [contactRes, socialRes] = await Promise.all([
                fetch(`${API_URL}/settings/contact/all`),
                fetch(`${API_URL}/settings/social/all`)
            ]);

            const contactData = await contactRes.json();
            if (contactData.success) {
                setSettings(contactData.data);
            }

            const socialData = await socialRes.json();
            if (socialData.success) {
                setSocialSettings(socialData.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage('Thank you for contacting us! We will get back to you within 24 hours.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                if (data.errors) {
                    const errorList = Object.values(data.errors).flat().join(', ');
                    setErrorMessage(errorList);
                } else {
                    setErrorMessage(data.message || 'Something went wrong. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Network error. Please try again later.');
        } finally {
            setSubmitting(false);
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

    // Check if any social media exists
    const hasSocial = socialSettings.social_facebook || socialSettings.social_twitter ||
        socialSettings.social_instagram || socialSettings.social_linkedin ||
        socialSettings.social_youtube || socialSettings.social_github;

    return (
        <>
            {/* Contact Hero Section with Bubbles */}
            <section className="contact-hero">
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
                                <i className="fa fa-rocket me-1"></i> Get in Touch
                            </span>
                            <h1 className="display-3 fw-bold mb-4">
                                <span className="gradient-text">Contact Us</span>
                            </h1>
                            <p className="lead text-secondary mb-4 px-md-4">
                                Have a project in mind? We'd love to hear from you. Let's discuss how we can help bring your ideas to life.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="row g-5">
                        {/* Contact Info Column */}
                        <div className="col-lg-4" data-aos="fade-right">
                            <div className="contact-info-card">
                                <h3 className="fw-bold mb-4">Let's Talk</h3>
                                <p className="text-secondary mb-4">
                                    We're here to answer your questions and discuss your project needs.
                                </p>

                                <div className="info-list">
                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <div>
                                            <strong>Email Us</strong>
                                            <a href={`mailto:${settings.contact_email || 'info@webinventorz.com'}`}>
                                                {settings.contact_email || 'info@webinventorz.com'}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="fa-solid fa-phone"></i>
                                        </div>
                                        <div>
                                            <strong>Call Us</strong>
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

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div>
                                            <strong>Visit Us</strong>
                                            <p>{settings.contact_address || 'Lahore, Pakistan'}</p>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <i className="fa-solid fa-clock"></i>
                                        </div>
                                        <div>
                                            <strong>Business Hours</strong>
                                            <p>{settings.business_hours || 'Mon - Fri: 9:00 AM - 6:00 PM'}</p>
                                            {settings.business_saturday && <p>{settings.business_saturday}</p>}
                                            {settings.business_sunday && <p className="text-muted">{settings.business_sunday}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links - Fixed */}
                                {hasSocial && (
                                    <div className="social-section">
                                        <h5 className="fw-bold mb-3">Follow Us</h5>
                                        <div className="social-links">
                                            {socialSettings.social_facebook && (
                                                <a href={socialSettings.social_facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                                                    <i className="fab fa-facebook-f"></i>
                                                </a>
                                            )}
                                            {socialSettings.social_twitter && (
                                                <a href={socialSettings.social_twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                            )}
                                            {socialSettings.social_instagram && (
                                                <a href={socialSettings.social_instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                                                    <i className="fab fa-instagram"></i>
                                                </a>
                                            )}
                                            {socialSettings.social_linkedin && (
                                                <a href={socialSettings.social_linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                                    <i className="fab fa-linkedin-in"></i>
                                                </a>
                                            )}
                                            {socialSettings.social_youtube && (
                                                <a href={socialSettings.social_youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                                                    <i className="fab fa-youtube"></i>
                                                </a>
                                            )}
                                            {socialSettings.social_github && (
                                                <a href={socialSettings.social_github} target="_blank" rel="noopener noreferrer" className="social-link">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact Form Column */}
                        <div className="col-lg-8" data-aos="fade-left">
                            <div className="contact-form-card">
                                <h3 className="fw-bold mb-4">Send Us a Message</h3>

                                {successMessage && (
                                    <div className="alert alert-success mb-4">
                                        <i className="fa-solid fa-check-circle me-2"></i>
                                        {successMessage}
                                    </div>
                                )}

                                {errorMessage && (
                                    <div className="alert alert-danger mb-4">
                                        <i className="fa-solid fa-exclamation-circle me-2"></i>
                                        {errorMessage}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label">Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="hello@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control"
                                                placeholder="+92 300 1234567"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Subject *</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                className="form-control"
                                                placeholder="Project Inquiry"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Message *</label>
                                            <textarea
                                                name="message"
                                                rows={6}
                                                className="form-control"
                                                placeholder="Tell us about your project or inquiry..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className="btn-submit"
                                                disabled={submitting}
                                            >
                                                {submitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message <i className="fa-solid fa-paper-plane ms-2"></i>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section (Optional) */}
            {settings.contact_map_url && (
                <section className="map-section">
                    <div className="container">
                        <div className="map-wrapper" data-aos="fade-up">
                            <iframe
                                src={settings.contact_map_url}
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: '24px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="container">
                    <div className="text-center mb-5" data-aos="fade-up">
                        <h2 className="fw-bold display-6">Frequently Asked Questions</h2>
                        <p className="text-secondary col-lg-6 mx-auto">
                            Find answers to common questions about our services
                        </p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="faq-card">
                                <h5 className="fw-bold mb-2">How quickly do you respond to inquiries?</h5>
                                <p className="text-secondary mb-0">We typically respond within 24 hours during business days. For urgent matters, please call us directly.</p>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="faq-card">
                                <h5 className="fw-bold mb-2">Do you offer free consultations?</h5>
                                <p className="text-secondary mb-0">Yes, we offer a free initial consultation to discuss your project requirements and provide a tailored solution.</p>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                            <div className="faq-card">
                                <h5 className="fw-bold mb-2">What areas do you serve?</h5>
                                <p className="text-secondary mb-0">We serve clients worldwide. Our team works remotely and can accommodate different time zones.</p>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                            <div className="faq-card">
                                <h5 className="fw-bold mb-2">What information should I provide for a quote?</h5>
                                <p className="text-secondary mb-0">Please provide project details, timeline expectations, budget range, and any specific requirements you have.</p>
                            </div>
                        </div>
                    </div>
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
                .contact-hero {
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
                
                .contact-hero .container {
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
                
                /* Contact Section */
                .contact-section {
                    padding: 80px 0;
                    background: #ffffff;
                }
                
                .contact-info-card {
                    background: #f8fafc;
                    border-radius: 24px;
                    padding: 2rem;
                    height: 100%;
                }
                
                .info-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    padding: 15px 0;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .info-item:last-child {
                    border-bottom: none;
                }
                
                .info-icon {
                    width: 45px;
                    height: 45px;
                    background: linear-gradient(135deg, #FE171B10, #6366f110);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                
                .info-icon i {
                    font-size: 1.2rem;
                    color: #FE171B;
                }
                
                .info-item strong {
                    display: block;
                    font-size: 0.8rem;
                    color: #64748b;
                    margin-bottom: 4px;
                }
                
                .info-item a, .info-item p {
                    margin: 0;
                    color: #1e293b;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 0.95rem;
                }
                
                .info-item a:hover {
                    color: #FE171B;
                }
                
                .social-section {
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                }
                
                .social-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                
                .social-link {
                    width: 38px;
                    height: 38px;
                    background: #ffffff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #475569;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                
                .social-link:hover {
                    background: #FE171B;
                    color: white;
                    transform: translateY(-3px);
                }
                
                /* Contact Form */
                .contact-form-card {
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 2rem;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
                    border: 1px solid #eef2f6;
                }
                
                .form-label {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #1e293b;
                }
                
                .form-control {
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 0.75rem 1rem;
                    transition: all 0.2s;
                }
                
                .form-control:focus {
                    border-color: #FE171B;
                    box-shadow: 0 0 0 3px rgba(254, 23, 27, 0.1);
                    outline: none;
                }
                
                .btn-submit {
                    background: linear-gradient(105deg, #FE171B 0%, #6366f1 100%);
                    color: white;
                    border: none;
                    border-radius: 40px;
                    padding: 12px 32px;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s;
                    width: 100%;
                }
                
                .btn-submit:hover:not(:disabled) {
                    transform: translateY(-3px);
                    background: linear-gradient(105deg, #4338ca, #FE171B);
                    box-shadow: 0 15px 25px -8px rgba(79, 70, 229, 0.5);
                }
                
                .btn-submit:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                
                /* Alert */
                .alert {
                    padding: 1rem;
                    border-radius: 12px;
                    border: none;
                }
                
                .alert-success {
                    background: #dcfce7;
                    color: #15803d;
                }
                
                .alert-danger {
                    background: #fee2e2;
                    color: #dc2626;
                }
                
                /* Map Section */
                .map-section {
                    padding: 0 0 80px 0;
                }
                
                .map-wrapper {
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                }
                
                /* FAQ Section */
                .faq-section {
                    padding: 80px 0;
                    background: #f8fafc;
                }
                
                .faq-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                    height: 100%;
                }
                
                .faq-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
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
                
                @media (max-width: 768px) {
                    .contact-hero {
                        padding-top: 20px;
                    }
                    .contact-hero h1 {
                        font-size: 2rem;
                    }
                    .contact-section {
                        padding: 50px 0;
                    }
                    .contact-info-card, .contact-form-card {
                        padding: 1.5rem;
                    }
                    .faq-section, .cta-section {
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