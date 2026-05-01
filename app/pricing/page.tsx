'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface PricingPlan {
  id: number;
  name: string;
  slug: string;
  icon: string;
  price: number;
  price_formatted: string;
  period: string;
  period_display: string;
  features: string[];
  is_popular: boolean;
  button_text: string;
  button_link: string;
  country: {
    id: number;
    name: string;
    code: string;
    currency_symbol: string;
    currency_code: string;
  };
  service_type: {
    id: number;
    name: string;
    slug: string;
    icon: string;
  };
}

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function PricingPage() {
  const searchParams = useSearchParams();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countries, setCountries] = useState<any[]>([]);
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [selectedServiceType, setSelectedServiceType] = useState<number | null>(null);

  // Modal States
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showQuickContactModal, setShowQuickContactModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [quickContactData, setQuickContactData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Get country from URL or localStorage
  useEffect(() => {
    const countryCode = searchParams.get('country');
    const savedCountry = localStorage.getItem('selectedCountry');

    if (countryCode) {
      setSelectedCountry(countryCode);
    } else if (savedCountry) {
      setSelectedCountry(savedCountry);
    } else {
      setSelectedCountry('PK');
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedCountry) {
      fetchCountries();
      fetchServiceTypes();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedServiceType) {
      fetchPricingPlans();
    }
  }, [selectedCountry, selectedServiceType]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(`${API_URL}/countries`);
      const data = await response.json();
      if (data.success) {
        setCountries(data.data);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchServiceTypes = async () => {
    try {
      const response = await fetch(`${API_URL}/services/types/list`);
      const data = await response.json();
      if (data.success) {
        setServiceTypes(data.data);
        if (data.data.length > 0 && !selectedServiceType) {
          setSelectedServiceType(data.data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching service types:', error);
    }
  };

  const fetchPricingPlans = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/pricing/country/${selectedCountry}/plans?service_type_id=${selectedServiceType}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setPlans(data.data);
      }
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCountryName = () => {
    const country = countries.find(c => c.code === selectedCountry);
    return country?.name || selectedCountry;
  };

  const openQuoteModal = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: `I'm interested in the ${plan.name} plan. Please contact me with more details.`
    });
    setShowQuoteModal(true);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const closeQuoteModal = () => {
    setShowQuoteModal(false);
    setSelectedPlan(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const openQuickContactModal = () => {
    setQuickContactData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setShowQuickContactModal(true);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const closeQuickContactModal = () => {
    setShowQuickContactModal(false);
    setQuickContactData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // REAL API CALL - Yeh add karo
      const response = await fetch(`${API_URL}/quote-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pricing_plan_id: selectedPlan?.id,
          plan_name: selectedPlan?.name,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Thank you! We will contact you within 24 hours.');
        setTimeout(() => {
          closeQuoteModal();
          setSuccessMessage('');
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('API Error:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // API call will be added later
      console.log('Quick Contact:', quickContactData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccessMessage('Thank you! We will contact you soon.');
      setTimeout(() => {
        closeQuickContactModal();
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuickContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuickContactData({ ...quickContactData, [e.target.name]: e.target.value });
  };

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
            src="/logo.gif"
            alt="Loading..."
            className="loader-gif"
            style={{
              width: '120px',
              height: 'auto',
              animation: 'pulse 1.5s ease-in-out infinite',
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
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="hero-bg-animation">
          {[...Array(10)].map((_, i) => (<div key={`bubble-${i}`} className="bubble"></div>))}
          {[...Array(8)].map((_, i) => (<div key={`particle-${i}`} className="ai-particle"></div>))}
          <div className="glow-orb"></div>
          <div className="glow-orb"></div>
        </div>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill mb-4 badge-animate">
                <i className="fa fa-tag me-1"></i> Pricing for {getCountryName()}
              </span>
              <h1 className="display-3 fw-bold mb-4">
                Simple, <span className="gradient-text">Transparent</span> Pricing
              </h1>
              <p className="lead text-secondary mb-4 px-md-4">
                Choose the plan that's right for you. All plans include a 14-day free trial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Type Tabs - Below Header */}
      {serviceTypes.length > 0 && (
        <div className="service-tabs-wrapper">
          <div className="container">
            <div className="service-tabs">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  className={`service-tab-btn ${selectedServiceType === type.id ? 'active' : ''}`}
                  onClick={() => setSelectedServiceType(type.id)}
                >
                  {type.icon && <i className={`${type.icon} me-2`}></i>}
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <section className="pricing-cards-section">
        <div className="container">
          {plans.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No pricing plans available for this service.</p>
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
              {plans.map((plan, idx) => {
                const currencySymbol = plan.country?.currency_symbol || '$';

                return (
                  <div key={plan.id} className="col-md-6 col-lg-4">
                    <div className={`pricing-card ${plan.is_popular ? "popular" : ""}`}>
                      {plan.is_popular && <div className="popular-badge">Most Popular</div>}
                      {plan.icon && <div className="plan-icon"><i className={plan.icon}></i></div>}
                      <h3>{plan.name}</h3>
                      <div className="price">
                        <span className="currency">{currencySymbol}</span>
                        <span className="amount">{plan.price}</span>
                        <span className="period">/ {plan.period_display}</span>
                      </div>
                      <p className="description">Perfect for your business needs</p>
                      <ul className="features-list">
                        {plan.features && plan.features.map((feature, i) => (
                          <li key={i}>
                            <i className="fa-regular fa-circle-check"></i> {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => openQuoteModal(plan)}
                        className="btn-pricing"
                      >
                        {plan.button_text || "Get Started"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="quick-contact-section">
        <div className="container">
          <div className="quick-contact-wrapper" data-aos="fade-up">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <h3 className="fw-bold mb-2">Need a Custom Solution?</h3>
                <p className="text-secondary mb-0">Contact us for a personalized quote tailored to your specific requirements.</p>
              </div>
              <div className="col-lg-5 text-lg-end mt-3 mt-lg-0">
                <button onClick={openQuickContactModal} className="btn-quick-contact">
                  <i className="fa-solid fa-headset me-2"></i> Quick Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-5">
              <h2 className="fw-bold">Frequently Asked Questions</h2>
              <p className="text-secondary">Everything you need to know about our plans.</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="faq-item">
                <h4>Can I switch plans later?</h4>
                <p>Yes, you can upgrade or downgrade your plan at any time. Changes are prorated.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-item">
                <h4>Is there a setup fee?</h4>
                <p>No setup fees for any plan. You only pay the monthly subscription.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-item">
                <h4>Do you offer custom solutions?</h4>
                <p>Yes, we offer custom solutions tailored to your specific needs. Contact us for a quote.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-item">
                <h4>What support is included?</h4>
                <p>All plans include email support. Premium plans include priority support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal - Compact Version */}
      {showQuoteModal && selectedPlan && (
        <div className="modal-overlay" onClick={closeQuoteModal}>
          <div className="modal-container compact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Get {selectedPlan.name} Plan</h3>
              <button className="modal-close" onClick={closeQuoteModal}>×</button>
            </div>
            <div className="modal-body">
              {successMessage && (
                <div className="alert-success-modal">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert-error-modal">{errorMessage}</div>
              )}
              <form onSubmit={handleQuoteSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address *"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (Optional)"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit-modal" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Request →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Quick Contact Modal - Compact Version */}
      {showQuickContactModal && (
        <div className="modal-overlay" onClick={closeQuickContactModal}>
          <div className="modal-container compact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Quick Contact</h3>
              <button className="modal-close" onClick={closeQuickContactModal}>×</button>
            </div>
            <div className="modal-body">
              {successMessage && (
                <div className="alert-success-modal">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert-error-modal">{errorMessage}</div>
              )}
              <form onSubmit={handleQuickContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={quickContactData.name}
                      onChange={handleQuickContactChange}
                      required
                      placeholder="Full Name *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={quickContactData.email}
                      onChange={handleQuickContactChange}
                      required
                      placeholder="Email Address *"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={quickContactData.phone}
                    onChange={handleQuickContactChange}
                    placeholder="Phone Number (Optional)"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    rows={2}
                    value={quickContactData.message}
                    onChange={handleQuickContactChange}
                    required
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit-modal" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
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
        
        /* Hero Section */
        .pricing-hero {
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
        
        .pricing-hero .container {
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
        }
        
        /* Service Tabs */
        .service-tabs-wrapper {
          padding: 20px 0;
          background: #ffffff;
          border-bottom: 1px solid #eef2f6;
        }
        
        .service-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }
        
        .service-tab-btn {
          background: #f1f5f9;
          border: none;
          padding: 10px 24px;
          border-radius: 40px;
          font-weight: 500;
          font-size: 0.95rem;
          color: #475569;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .service-tab-btn.active {
          background: linear-gradient(135deg, #FE171B, #cc1215);
          color: white;
          box-shadow: 0 4px 12px rgba(254, 23, 27, 0.3);
        }
        
        .service-tab-btn:hover:not(.active) {
          background: #e2e8f0;
          transform: translateY(-2px);
        }
        
        /* Pricing Cards */
        .pricing-cards-section {
          padding: 60px 0;
          background: #ffffff;
        }
        
        .pricing-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 2rem;
          height: 100%;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid #eef2f6;
          position: relative;
        }
        
        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
        }
        
        .pricing-card.popular {
          border: 2px solid #FE171B;
          box-shadow: 0 15px 30px -10px rgba(254, 23, 27, 0.15);
        }
        
        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #FE171B;
          color: white;
          padding: 5px 16px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .plan-icon {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .plan-icon i {
          background: linear-gradient(135deg, #FE171B, #6366f1);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .pricing-card h3 {
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .price {
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .currency {
          font-size: 1.2rem;
          vertical-align: top;
        }
        
        .amount {
          font-size: 2.8rem;
          font-weight: 800;
        }
        
        .period {
          font-size: 0.9rem;
          color: #64748b;
        }
        
        .description {
          text-align: center;
          color: #64748b;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
        }
        
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
        }
        
        .features-list li {
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
        }
        
        .features-list i {
          color: #FE171B;
          width: 18px;
        }
        
        .btn-pricing {
          width: 100%;
          background: linear-gradient(105deg, #FE171B 0%, #6366f1 100%);
          color: white;
          border: none;
          border-radius: 40px;
          padding: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .btn-pricing:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(254, 23, 27, 0.3);
        }
        
        /* Quick Contact Section */
        .quick-contact-section {
          padding: 40px 0;
          background: #f8fafc;
        }
        
        .quick-contact-wrapper {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          padding: 2rem;
          border-radius: 20px;
          color: white;
        }
        
        .quick-contact-wrapper h3 {
          color: white;
        }
        
        .quick-contact-wrapper .text-secondary {
          color: #94a3b8 !important;
        }
        
        .btn-quick-contact {
          background: linear-gradient(105deg, #FE171B 0%, #6366f1 100%);
          color: white;
          border: none;
          border-radius: 40px;
          padding: 12px 28px;
          font-weight: 600;
          transition: all 0.3s;
          cursor: pointer;
        }
        
        .btn-quick-contact:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(254, 23, 27, 0.3);
        }
        
        /* FAQ Section */
        .faq-section {
          padding: 60px 0;
          background: #f8fafc;
        }
        
        .faq-item {
          background: white;
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid #eef2f6;
          transition: all 0.2s;
          height: 100%;
        }
        
        .faq-item:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }
        
        .faq-item h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        
        .faq-item p {
          color: #64748b;
          margin: 0;
          font-size: 0.9rem;
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Compact Modal Styles */
        .compact-modal {
          max-width: 500px;
          width: 90%;
          max-height: none;
          border-radius: 20px;
          background: white;
          animation: modalFadeIn 0.3s ease;
        }
        
        .compact-modal .modal-header {
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          border-bottom: 1px solid #eef2f6;
        }
        
        .compact-modal .modal-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
        }
        
        .compact-modal .modal-body {
          padding: 1.25rem 1.5rem 1.5rem;
        }
        
        .form-row {
          display: flex;
          gap: 12px;
          margin-bottom: 0;
        }
        
        .form-row .form-group {
          flex: 1;
          margin-bottom: 12px;
        }
        
        .compact-modal .form-group {
          margin-bottom: 12px;
        }
        
        .compact-modal input,
        .compact-modal textarea {
          width: 100%;
          padding: 0.6rem 0.75rem;
          font-size: 0.9rem;
          border-radius: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          transition: all 0.2s;
          font-family: inherit;
        }
        
        .compact-modal input:focus,
        .compact-modal textarea:focus {
          outline: none;
          background: white;
          border-color: #FE171B;
          box-shadow: 0 0 0 3px rgba(254, 23, 27, 0.1);
        }
        
        .compact-modal textarea {
          resize: vertical;
          min-height: 60px;
          font-family: inherit;
        }
        
        .compact-modal .btn-submit-modal {
          width: 100%;
          background: linear-gradient(105deg, #FE171B 0%, #6366f1 100%);
          color: white;
          border: none;
          border-radius: 30px;
          padding: 10px;
          margin-top: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .compact-modal .btn-submit-modal:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(254, 23, 27, 0.3);
        }
        
        .compact-modal .btn-submit-modal:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .compact-modal .alert-success-modal,
        .compact-modal .alert-error-modal {
          padding: 0.6rem;
          font-size: 0.85rem;
          border-radius: 10px;
          margin-bottom: 1rem;
        }
        
        .alert-success-modal {
          background: #dcfce7;
          color: #15803d;
        }
        
        .alert-error-modal {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .modal-close {
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #64748b;
          transition: color 0.3s;
          line-height: 1;
        }
        
        .modal-close:hover {
          color: #FE171B;
        }
        
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Mobile Responsive */
        @media (max-width: 480px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          
          .compact-modal {
            width: 95%;
            margin: 1rem;
          }
          
          .compact-modal .modal-body {
            padding: 1rem;
          }
          
          .compact-modal .modal-header {
            padding: 0.75rem 1rem;
          }
          
          .service-tabs {
            gap: 8px;
          }
          
          .service-tab-btn {
            padding: 6px 14px;
            font-size: 0.8rem;
          }
          
          .amount {
            font-size: 2rem;
          }
          
          .pricing-cards-section {
            padding: 40px 0;
          }
          
          .faq-section {
            padding: 40px 0;
          }
        }
      `}</style>
    </>
  );
}