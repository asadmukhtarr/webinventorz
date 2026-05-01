"use client";
import { useState, useEffect } from "react";

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/quotations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service_type: formData.service,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        if (data.errors) {
          const errorList = Object.values(data.errors).flat().join(", ");
          setErrorMessage(errorList);
        } else {
          setErrorMessage(data.message || "Something went wrong. Please try again.");
        }
      }
    } catch (error: any) {
      console.error("Fetch Error:", error);
      setErrorMessage(`Network error: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section with Bubbles Animation */}
      <section className="quote-hero">
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
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill mb-4 badge-animate">
                <i className="fa fa-rocket me-1"></i> Let's Build Something Great
              </span>
              <h1 className="display-3 fw-bold mb-4">
                Get a <span className="gradient-text">Free Quote</span>
              </h1>
              <p className="lead text-secondary mb-4 px-md-4">
                Tell us about your project, and we'll respond with a tailored solution and pricing within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="quote-form-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="quote-form-box" data-aos="fade-up">
                {successMessage && (
                  <div className="alert alert-success mb-4">
                    <i className="fa-regular fa-circle-check me-2"></i>
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="alert alert-danger mb-4">
                    <i className="fa-regular fa-circle-exclamation me-2"></i>
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
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
                        className="form-control form-control-lg"
                        placeholder="hello@company.com"
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
                        className="form-control form-control-lg"
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        className="form-control form-control-lg"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Service Needed *</label>
                      <select
                        name="service"
                        className="form-select form-select-lg"
                        value={formData.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-app">Mobile App Development</option>
                        <option value="ui-ux-design">UI/UX Design</option>
                        <option value="ecommerce">E-commerce Solution</option>
                        <option value="cloud-services">Cloud Services</option>
                        <option value="ai-ml">AI & Machine Learning</option>
                        <option value="digital-marketing">Digital Marketing</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Budget Range</label>
                      <select
                        name="budget"
                        className="form-select form-select-lg"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select budget (optional)</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-plus">$50,000+</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Project Details *</label>
                      <textarea
                        name="message"
                        rows={5}
                        className="form-control"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-custom-submit w-100" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Sending...
                          </>
                        ) : (
                          <>Send Quote Request <i className="fa-solid fa-paper-plane ms-2"></i></>
                        )}
                      </button>
                      <p className="small text-muted mt-3 text-center">
                        <i className="fa-regular fa-clock"></i> We'll respond within 24 hours.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="trust-section">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="trust-badges">
                <span><i className="fa-regular fa-clock"></i> 24h Response</span>
                <span><i className="fa-regular fa-handshake"></i> No Obligation</span>
                <span><i className="fa-regular fa-file-lines"></i> Detailed Proposal</span>
                <span><i className="fa-regular fa-message"></i> Free Consultation</span>
              </div>
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
                    line-height: 1.5;
                    overflow-x: hidden;
                }
                
                h1, h2, h3 {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }
                
                /* Hero & Bubbles */
                .quote-hero {
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
                    box-shadow: 0 0 20px rgba(254, 23, 27, 0.1);
                }
                
                .bubble:nth-child(1) { width: 80px; height: 80px; left: 5%; animation-duration: 8s; }
                .bubble:nth-child(2) { width: 120px; height: 120px; left: 15%; animation-duration: 12s; animation-delay: 2s; }
                .bubble:nth-child(3) { width: 60px; height: 60px; left: 25%; animation-duration: 7s; animation-delay: 1s; }
                .bubble:nth-child(4) { width: 100px; height: 100px; left: 35%; animation-duration: 10s; animation-delay: 3s; }
                .bubble:nth-child(5) { width: 45px; height: 45px; left: 45%; animation-duration: 6s; animation-delay: 0.5s; }
                .bubble:nth-child(6) { width: 150px; height: 150px; left: 55%; animation-duration: 14s; animation-delay: 4s; }
                .bubble:nth-child(7) { width: 70px; height: 70px; left: 70%; animation-duration: 9s; animation-delay: 1.5s; }
                .bubble:nth-child(8) { width: 90px; height: 90px; left: 80%; animation-duration: 11s; animation-delay: 2.5s; }
                .bubble:nth-child(9) { width: 55px; height: 55px; left: 88%; animation-duration: 7.5s; animation-delay: 3.5s; }
                .bubble:nth-child(10) { width: 110px; height: 110px; left: 92%; animation-duration: 13s; animation-delay: 1s; }
                
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
                    box-shadow: 0 0 8px rgba(254, 23, 27, 0.5);
                }
                
                .ai-particle:nth-child(11) { top: 20%; left: 10%; animation-duration: 6s; }
                .ai-particle:nth-child(12) { top: 50%; left: 85%; width: 6px; height: 6px; animation-duration: 7s; animation-delay: 1s; }
                .ai-particle:nth-child(13) { top: 70%; left: 20%; width: 3px; height: 3px; animation-duration: 5s; animation-delay: 2s; }
                .ai-particle:nth-child(14) { top: 30%; left: 75%; width: 5px; height: 5px; animation-duration: 8s; animation-delay: 0.5s; }
                .ai-particle:nth-child(15) { top: 85%; left: 45%; width: 4px; height: 4px; animation-duration: 6.5s; animation-delay: 3s; }
                .ai-particle:nth-child(16) { top: 15%; left: 60%; width: 7px; height: 7px; animation-duration: 9s; animation-delay: 1.8s; }
                .ai-particle:nth-child(17) { top: 65%; left: 90%; width: 4px; height: 4px; animation-duration: 7.2s; animation-delay: 2.3s; }
                .ai-particle:nth-child(18) { top: 40%; left: 5%; width: 5px; height: 5px; animation-duration: 5.8s; animation-delay: 3.8s; }
                
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
                
                .glow-orb:nth-child(19) { width: 300px; height: 300px; top: -100px; right: -100px; animation-duration: 8s; }
                .glow-orb:nth-child(20) { width: 250px; height: 250px; bottom: -80px; left: -80px; animation-duration: 10s; animation-delay: 2s; }
                
                @keyframes pulseGlow {
                    0% { opacity: 0.3; transform: scale(1); }
                    100% { opacity: 0.7; transform: scale(1.2); }
                }
                
                .quote-hero .container {
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
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .badge-animate:hover {
                    transform: translateY(-2px);
                    letter-spacing: 0.3px;
                }
                
                /* Quote Form */
                .quote-form-section {
                    padding: 80px 0;
                    background: #ffffff;
                }
                
                .quote-form-box {
                    background: #fefefe;
                    border-radius: 32px;
                    padding: 2.5rem;
                    box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.05);
                    border: 1px solid #f0f2f5;
                }
                
                .form-label {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #1e293b;
                }
                
                .form-control, .form-select {
                    border: 1.5px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 0.75rem 1rem;
                    transition: all 0.2s;
                }
                
                .form-control:focus, .form-select:focus {
                    border-color: #FE171B;
                    box-shadow: 0 0 0 3px rgba(254, 23, 27, 0.1);
                    outline: none;
                }
                
                .btn-custom-submit {
                    background: linear-gradient(105deg, #FE171B 0%, #6366f1 100%);
                    color: white;
                    border: none;
                    border-radius: 40px;
                    padding: 12px 32px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
                    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
                }
                
                .btn-custom-submit:hover:not(:disabled) {
                    transform: translateY(-3px);
                    background: linear-gradient(105deg, #4338ca, #FE171B);
                    box-shadow: 0 15px 25px -8px rgba(79, 70, 229, 0.5);
                    color: white;
                }
                
                .btn-custom-submit:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                
                /* Alert styles */
                .alert {
                    padding: 1rem;
                    border-radius: 16px;
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
                
                .trust-section {
                    padding: 40px 0 80px;
                    background: #ffffff;
                }
                
                .trust-badges {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1rem;
                }
                
                .trust-badges span {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                    color: #475569;
                    background: #f8fafc;
                    padding: 8px 20px;
                    border-radius: 40px;
                    font-weight: 500;
                }
                
                .trust-badges i {
                    color: #FE171B;
                    font-size: 1rem;
                }
                
                @media (max-width: 768px) {
                    .quote-hero {
                        min-height: 40vh;
                        text-align: center;
                    }
                    
                    .quote-form-section {
                        padding: 60px 0;
                    }
                    
                    .quote-form-box {
                        padding: 1.5rem;
                    }
                    
                    .trust-badges {
                        gap: 1rem;
                    }
                    
                    .trust-badges span {
                        font-size: 0.8rem;
                        padding: 6px 14px;
                    }
                }
            `}</style>
    </>
  );
}