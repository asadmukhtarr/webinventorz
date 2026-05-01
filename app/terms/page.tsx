'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TermsPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            {/* Hero Section */}
            <section className="terms-hero">
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
                                <i className="fa-regular fa-file-lines me-1"></i> Legal Information
                            </span>
                            <h1 className="display-3 fw-bold mb-4">
                                Terms & <span className="gradient-text">Conditions</span>
                            </h1>
                            <p className="lead text-secondary mb-4 px-md-4">
                                Please read these terms carefully before using our services
                            </p>
                            <p className="text-muted small">
                                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="terms-content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="terms-card" data-aos="fade-up">
                                {/* Table of Contents */}
                                <div className="toc-section">
                                    <h3 className="fw-bold mb-3">Table of Contents</h3>
                                    <div className="toc-grid">
                                        <a href="#agreement" className="toc-link">1. Agreement to Terms</a>
                                        <a href="#intellectual-property" className="toc-link">2. Intellectual Property</a>
                                        <a href="#user-representations" className="toc-link">3. User Representations</a>
                                        <a href="#prohibited-activities" className="toc-link">4. Prohibited Activities</a>
                                        <a href="#user-generated" className="toc-link">5. User Generated Contributions</a>
                                        <a href="#third-party" className="toc-link">6. Third Party Websites</a>
                                        <a href="#termination" className="toc-link">7. Termination</a>
                                        <a href="#limitation-liability" className="toc-link">8. Limitation of Liability</a>
                                        <a href="#indemnification" className="toc-link">9. Indemnification</a>
                                        <a href="#governing-law" className="toc-link">10. Governing Law</a>
                                        <a href="#disclaimer" className="toc-link">11. Disclaimer</a>
                                        <a href="#contact" className="toc-link">12. Contact Information</a>
                                    </div>
                                </div>

                                {/* 1. Agreement to Terms */}
                                <div id="agreement" className="terms-section">
                                    <h2 className="section-title">1. Agreement to Terms</h2>
                                    <p>By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the website or use our services.</p>
                                    <p>These Terms and Conditions apply to all visitors, users, and others who access or use our services. By using our services, you represent that you are at least 18 years old or have parental consent.</p>
                                </div>

                                {/* 2. Intellectual Property */}
                                <div id="intellectual-property" className="terms-section">
                                    <h2 className="section-title">2. Intellectual Property Rights</h2>
                                    <p>The website and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                                    <p>You may not:</p>
                                    <ul>
                                        <li>Copy, modify, or reproduce our content without permission</li>
                                        <li>Use our trademarks or logos without prior written consent</li>
                                        <li>Reverse engineer any of our software or systems</li>
                                        <li>Sell, license, or distribute our content for commercial purposes</li>
                                    </ul>
                                </div>

                                {/* 3. User Representations */}
                                <div id="user-representations" className="terms-section">
                                    <h2 className="section-title">3. User Representations</h2>
                                    <p>By using our services, you represent and warrant that:</p>
                                    <ul>
                                        <li>You have the legal capacity to agree to these Terms</li>
                                        <li>You are not a minor in your jurisdiction</li>
                                        <li>You will not access our services through automated or non-human means</li>
                                        <li>You will not use our services for any illegal or unauthorized purpose</li>
                                        <li>Your use of our services will not violate any applicable law or regulation</li>
                                    </ul>
                                </div>

                                {/* 4. Prohibited Activities */}
                                <div id="prohibited-activities" className="terms-section">
                                    <h2 className="section-title">4. Prohibited Activities</h2>
                                    <p>You may not access or use our services for any purpose other than that for which we make them available. Prohibited activities include:</p>
                                    <div className="prohibited-grid">
                                        <div className="prohibited-item">
                                            <i className="fa-solid fa-bug"></i>
                                            <span>Unauthorized data mining or scraping</span>
                                        </div>
                                        <div className="prohibited-item">
                                            <i className="fa-solid fa-virus"></i>
                                            <span>Transmitting malware or viruses</span>
                                        </div>
                                        <div className="prohibited-item">
                                            <i className="fa-solid fa-user-secret"></i>
                                            <span>Attempting to bypass security measures</span>
                                        </div>
                                        <div className="prohibited-item">
                                            <i className="fa-solid fa-spam"></i>
                                            <span>Sending spam or unsolicited messages</span>
                                        </div>
                                        <div className="prohibited-item">
                                            <i className="fa-solid fa-copyright"></i>
                                            <span>Infringing intellectual property rights</span>
                                        </div>
                                        <div className="prohibited-item">
                                            <i className="fa-solid fa-ban"></i>
                                            <span>Interfering with service operations</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 5. User Generated Contributions */}
                                <div id="user-generated" className="terms-section">
                                    <h2 className="section-title">5. User Generated Contributions</h2>
                                    <p>Our services may allow you to post, submit, or share content. By submitting contributions, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content.</p>
                                    <p>You represent that:</p>
                                    <ul>
                                        <li>You own or have permission to use the content you submit</li>
                                        <li>Your content does not violate any third-party rights</li>
                                        <li>Your content is not defamatory, obscene, or illegal</li>
                                        <li>We may remove any content at our sole discretion</li>
                                    </ul>
                                </div>

                                {/* 6. Third Party Websites */}
                                <div id="third-party" className="terms-section">
                                    <h2 className="section-title">6. Third Party Websites</h2>
                                    <p>Our services may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.</p>
                                    <p>You acknowledge and agree that we shall not be responsible for any damage or loss caused by or in connection with the use of any such content or services available through any such websites.</p>
                                </div>

                                {/* 7. Termination */}
                                <div id="termination" className="terms-section">
                                    <h2 className="section-title">7. Termination</h2>
                                    <p>We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.</p>
                                    <p>Upon termination, your right to use our services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive termination.</p>
                                </div>

                                {/* 8. Limitation of Liability */}
                                <div id="limitation-liability" className="terms-section">
                                    <h2 className="section-title">8. Limitation of Liability</h2>
                                    <p>To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                                    <ul>
                                        <li>Your use or inability to use our services</li>
                                        <li>Any conduct or content of any third party on our services</li>
                                        <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                                    </ul>
                                </div>

                                {/* 9. Indemnification */}
                                <div id="indemnification" className="terms-section">
                                    <h2 className="section-title">9. Indemnification</h2>
                                    <p>You agree to defend, indemnify, and hold us harmless from and against any and all losses, damages, liabilities, claims, demands, and expenses (including reasonable attorney's fees) arising out of or related to:</p>
                                    <ul>
                                        <li>Your use of our services</li>
                                        <li>Your violation of these Terms</li>
                                        <li>Your violation of any third-party rights</li>
                                        <li>Any content you submit to our services</li>
                                    </ul>
                                </div>

                                {/* 10. Governing Law */}
                                <div id="governing-law" className="terms-section">
                                    <h2 className="section-title">10. Governing Law</h2>
                                    <p>These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Any legal suit, action, or proceeding arising out of or related to these Terms shall be instituted exclusively in the courts located in Lahore, Pakistan.</p>
                                </div>

                                {/* 11. Disclaimer */}
                                <div id="disclaimer" className="terms-section">
                                    <h2 className="section-title">11. Disclaimer</h2>
                                    <p>Our services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the operation or availability of our services, or the information, content, and materials included on our services.</p>
                                    <p>We do not warrant that our services will be uninterrupted, secure, or error-free, or that any defects will be corrected. Your use of our services is at your sole risk.</p>
                                </div>

                                {/* 12. Contact Information */}
                                <div id="contact" className="terms-section">
                                    <h2 className="section-title">12. Contact Information</h2>
                                    <p>If you have any questions about these Terms, please contact us at:</p>
                                    <div className="contact-box">
                                        <p><i className="fa-regular fa-envelope me-2"></i> Email: legal@webinventorz.com</p>
                                        <p><i className="fa-regular fa-phone me-2"></i> Phone: +92 300 1234567</p>
                                        <p><i className="fa-regular fa-location-dot me-2"></i> Address: Lahore, Pakistan</p>
                                    </div>
                                </div>

                                {/* Acceptance Section */}
                                <div className="acceptance-section">
                                    <i className="fa-regular fa-hand-peace fa-2x mb-3"></i>
                                    <h3 className="fw-bold mb-2">By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</h3>
                                    <Link href="/contact" className="btn-accept">
                                        I Agree to the Terms <i className="fa-solid fa-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-wrapper text-center mx-auto" data-aos="zoom-in">
                        <h2 className="fw-bold display-6">Have Questions About Our Terms?</h2>
                        <p className="text-secondary mb-4 col-lg-8 mx-auto">
                            Our legal team is here to help clarify any questions you may have about our terms and conditions.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <Link href="/contact" className="btn btn-custom px-5 py-3">
                                Contact Us <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                            <Link href="/privacy-policy" className="btn btn-outline-custom px-5 py-3">
                                Read Privacy Policy
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
                .terms-hero {
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
                
                .terms-hero .container {
                    position: relative;
                    z-index: 2;
                }
                
                .gradient-text {
                    background: linear-gradient(120deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                /* Content Section */
                .terms-content {
                    padding: 60px 0;
                    background: #ffffff;
                }
                
                .terms-card {
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 2rem;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
                    border: 1px solid #eef2f6;
                }
                
                /* Table of Contents */
                .toc-section {
                    background: #f8fafc;
                    border-radius: 20px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                }
                
                .toc-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 12px;
                    margin-top: 1rem;
                }
                
                .toc-link {
                    color: #475569;
                    text-decoration: none;
                    padding: 8px 12px;
                    border-radius: 8px;
                    transition: all 0.3s;
                    display: block;
                    font-size: 0.9rem;
                }
                
                .toc-link:hover {
                    background: linear-gradient(135deg, #FE171B10, #6366f110);
                    color: #FE171B;
                    transform: translateX(5px);
                }
                
                /* Terms Sections */
                .terms-section {
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #eef2f6;
                }
                
                .terms-section:last-of-type {
                    border-bottom: none;
                }
                
                .section-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: #1e293b;
                    position: relative;
                    padding-left: 1rem;
                }
                
                .section-title::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 4px;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    border-radius: 4px;
                }
                
                .terms-section p {
                    color: #475569;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }
                
                .terms-section ul {
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .terms-section ul li {
                    color: #475569;
                    line-height: 1.6;
                    margin-bottom: 0.5rem;
                }
                
                /* Prohibited Grid */
                .prohibited-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 12px;
                    margin-top: 1rem;
                }
                
                .prohibited-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px;
                    background: #f8fafc;
                    border-radius: 12px;
                    transition: all 0.3s;
                }
                
                .prohibited-item i {
                    color: #FE171B;
                    font-size: 1.2rem;
                }
                
                .prohibited-item span {
                    color: #475569;
                    font-size: 0.9rem;
                }
                
                .prohibited-item:hover {
                    background: #f1f5f9;
                    transform: translateX(5px);
                }
                
                /* Contact Box */
                .contact-box {
                    background: linear-gradient(135deg, #f8fafc, #ffffff);
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid #eef2f6;
                    margin-top: 1rem;
                }
                
                .contact-box p {
                    margin-bottom: 0.5rem;
                }
                
                .contact-box i {
                    color: #FE171B;
                }
                
                /* Acceptance Section */
                .acceptance-section {
                    background: linear-gradient(135deg, #FE171B05, #6366f105);
                    border-radius: 20px;
                    padding: 2rem;
                    text-align: center;
                    margin-top: 2rem;
                    border: 1px solid #eef2f6;
                }
                
                .acceptance-section i {
                    color: #FE171B;
                }
                
                .btn-accept {
                    display: inline-block;
                    background: linear-gradient(105deg, #FE171B 0%, #6366f1 100%);
                    color: white;
                    border: none;
                    border-radius: 40px;
                    padding: 12px 32px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s;
                    margin-top: 1rem;
                }
                
                .btn-accept:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(254, 23, 27, 0.3);
                    color: white;
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
                    text-decoration: none;
                    display: inline-block;
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
                    text-decoration: none;
                    display: inline-block;
                }
                
                .btn-outline-custom:hover {
                    background: #FE171B;
                    color: white;
                    transform: translateY(-2px);
                }
                
                @media (max-width: 768px) {
                    .terms-hero {
                        min-height: 35vh;
                    }
                    .terms-hero h1 {
                        font-size: 2rem;
                    }
                    .terms-content {
                        padding: 40px 0;
                    }
                    .terms-card {
                        padding: 1.5rem;
                    }
                    .toc-grid {
                        grid-template-columns: 1fr;
                    }
                    .section-title {
                        font-size: 1.2rem;
                    }
                    .prohibited-grid {
                        grid-template-columns: 1fr;
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