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
  is_featured: boolean;
}

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
  service_used: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  featured_image: string;
  description: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

// Static Products Data (Not changed)
const productsData = [
  {
    id: 1,
    icon: "fa-shopping-cart",
    title: "Ecommerce Solutions",
    description: "End-to-end ecommerce platforms with secure payments, inventory management, and AI-powered recommendations.",
    link: "/products/ecommerce",
    aosDelay: "100"
  },
  {
    id: 2,
    icon: "fa-graduation-cap",
    title: "Education Solutions",
    description: "Complete learning management systems with interactive courses, assessments, and student progress tracking.",
    link: "/products/education",
    aosDelay: "200"
  },
  {
    id: 3,
    icon: "fa-industry",
    title: "Industrial Solutions",
    description: "Smart industrial automation, IoT integration, and real-time monitoring systems for manufacturing excellence.",
    link: "/products/industrial",
    aosDelay: "300"
  }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch all data in parallel
      const [servicesRes, pricingRes, testimonialsRes, portfolioRes, blogRes] = await Promise.all([
        fetch(`${API_URL}/services?per_page=6`),
        fetch(`${API_URL}/pricing?per_page=3&is_popular=1`),
        fetch(`${API_URL}/testimonials/featured/list?limit=3`),
        fetch(`${API_URL}/portfolio?per_page=6`),
        fetch(`${API_URL}/blog/posts?per_page=3`)
      ]);

      const servicesData = await servicesRes.json();
      if (servicesData.success) {
        setServices(servicesData.data);
      }

      const pricingData = await pricingRes.json();
      if (pricingData.success) {
        setPricingPlans(pricingData.data);
      }

      const testimonialsData = await testimonialsRes.json();
      if (testimonialsData.success) {
        setTestimonials(testimonialsData.data);
      }

      const portfolioData = await portfolioRes.json();
      if (portfolioData.success) {
        setPortfolioItems(portfolioData.data);
      }

      const blogData = await blogRes.json();
      if (blogData.success) {
        setBlogPosts(blogData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-star ${i <= rating ? 'fa-solid text-warning' : 'fa-regular text-muted'}`}
          style={{ fontSize: '12px' }}
        ></i>
      );
    }
    return stars;
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Hero Section - Unchanged */}
      <section className="hero" id="home">
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
                <i className="fa fa-rocket me-1"></i> Digital Innovation Partner
              </span>
              <h1 className="display-3 fw-bold mb-4">
                We Build <span className="gradient-text">Powerful Digital Solutions</span>
              </h1>
              <p className="lead text-secondary mb-4 px-md-4" style={{ fontSize: '1.2rem' }}>
                Transforming bold ideas into high-converting websites, intelligent apps, and future-ready
                platforms.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <Link href="/quote" className="btn btn-custom btn-lg px-4">
                  Start Your Project <i className="fa fa-arrow-right ms-2"></i>
                </Link>
                <Link href="/portfolio" className="btn btn-outline-custom btn-lg px-4">
                  Explore Work <i className="fa fa-eye ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Unchanged */}
      <section className="section bg-mild-gray" id="products">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold display-6">Our Solutions</h2>
            <p className="text-secondary col-lg-6 mx-auto">
              Comprehensive digital solutions tailored for every industry need.
            </p>
          </div>
          <div className="row g-5">
            {productsData.map((product) => (
              <div key={product.id} className="col-md-4" data-aos="fade-up" data-aos-delay={product.aosDelay}>
                <div className="card product-card h-100">
                  <i className={`fa ${product.icon}`}></i>
                  <h5 className="fw-bold mb-3">{product.title}</h5>
                  <p className="text-secondary">{product.description}</p>
                  <Link href={product.link}>
                    Learn more <i className="fa fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Dynamic from API */}
      <section className="section bg-soft-light" id="services">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold display-6">Expert Services</h2>
            <p className="text-secondary col-lg-6 mx-auto">Tailored digital craftsmanship that drives growth and engagement.</p>
          </div>
          {loading && services.length === 0 ? (
            <div className="text-center py-5">
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-5">
              {services.map((service, index) => (
                <div key={service.id} className="col-md-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                  <div className="card service-card h-100">
                    <i className={`fa ${service.icon || 'fa-code'}`}></i>
                    <h5 className="fw-bold mb-3">{service.title}</h5>
                    <p className="text-secondary">{service.short_description || service.description?.substring(0, 120)}</p>
                    <Link href={`/services/${service.slug}`} className="text-decoration-none mt-2 fw-semibold" style={{ color: '#FE171B' }}>
                      Learn more <i className="fa fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section - Top 3 Plans from API */}
      <section className="section bg-mild-gray" id="pricing">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold display-6">Simple, Transparent Pricing</h2>
            <p className="text-secondary col-lg-6 mx-auto">Choose the perfect plan for your business needs.</p>
          </div>
          {loading && pricingPlans.length === 0 ? (
            <div className="text-center py-5">
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {pricingPlans.map((plan, index) => {
                const currencySymbol = plan.country?.currency_symbol || '$';
                return (
                  <div key={plan.id} className="col-md-4" data-aos="flip-up" data-aos-delay={(index + 1) * 100}>
                    <div className={`card pricing-card h-100 ${plan.is_popular ? 'popular-plan' : ''}`}
                      style={plan.is_popular ? { border: '2px solid #FE171B20' } : {}}>
                      <i className={`fa ${plan.icon || 'fa-rocket'}`}></i>
                      <h5 className="fw-bold">
                        {plan.name}
                        {plan.is_popular && <span className="badge bg-danger ms-2">Popular</span>}
                      </h5>
                      <div className="price">
                        {plan.price === 0 ? 'Custom' : `${currencySymbol}${plan.price}`}
                        {plan.period_display && plan.price > 0 && <small>/{plan.period_display}</small>}
                      </div>
                      <ul>
                        {plan.features && plan.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx}>
                            <i className="fa fa-check-circle"></i> {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href={plan.price === 0 ? '/contact' : '/quote'}
                        className={`btn ${plan.is_popular ? 'btn-custom' : 'btn-outline-custom'} w-100`}>
                        {plan.button_text || (plan.price === 0 ? 'Contact Sales' : 'Get Started')}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section - Dynamic from API */}
      {testimonials.length > 0 && (
        <section className="section bg-soft-light" id="testimonials">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold display-6">What Our Clients Say</h2>
              <p className="text-secondary col-lg-6 mx-auto">Don't just take our word for it. Hear from our happy clients.</p>
            </div>
            <div className="row g-4">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="col-md-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                  <div className="testimonial-card">
                    <div className="stars mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="testimonial-text">"{testimonial.content.substring(0, 150)}..."</p>
                    <div className="client-info">
                      {testimonial.client_avatar ? (
                        <img src={testimonial.client_avatar} alt={testimonial.client_name} className="client-avatar" />
                      ) : (
                        <div className="client-avatar-placeholder">
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
          </div>
        </section>
      )}

      {/* Portfolio Section - Dynamic from API */}
      {portfolioItems.length > 0 && (
        <section className="section bg-mild-gray" id="portfolio">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold display-6">Our Recent Work</h2>
              <p className="text-secondary col-lg-6 mx-auto">Check out some of our amazing projects.</p>
            </div>
            <div className="row g-4">
              {portfolioItems.slice(0, 6).map((item, index) => (
                <div key={item.id} className="col-md-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                  <div className="portfolio-card">
                    {item.featured_image && (
                      <div className="portfolio-image">
                        <img src={item.featured_image} alt={item.title} />
                        <div className="portfolio-overlay">
                          <Link href={`/portfolio/${item.slug}`} className="portfolio-link">
                            <i className="fa fa-eye"></i>
                          </Link>
                        </div>
                      </div>
                    )}
                    <div className="portfolio-content">
                      <span className="portfolio-category">{item.category}</span>
                      <h5 className="fw-bold mb-2">{item.title}</h5>
                      <p className="text-secondary small">{item.description?.substring(0, 80)}...</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link href="/portfolio" className="btn btn-outline-custom px-4">
                View All Projects <i className="fa fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blog Section - Dynamic from API */}
      {blogPosts.length > 0 && (
        <section className="section bg-soft-light" id="blog">
          <div className="container">
            <div className="text-center mb-5" data-aos="fade-up">
              <h2 className="fw-bold display-6">Latest Insights</h2>
              <p className="text-secondary col-lg-6 mx-auto">Expert tips, industry trends, and digital strategies.</p>
            </div>
            <div className="row g-4">
              {blogPosts.map((post, index) => (
                <div key={post.id} className="col-md-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                  <div className="card blog-card h-100">
                    {post.featured_image && (
                      <img src={post.featured_image} alt={post.title} className="blog-image" />
                    )}
                    <div className="blog-meta">
                      <span><i className="fa fa-calendar"></i> {new Date(post.published_at).toLocaleDateString()}</span>
                      <span><i className="fa fa-tag"></i> {post.category?.name || 'General'}</span>
                    </div>
                    <h5 className="fw-bold">{post.title}</h5>
                    <p className="text-secondary small">{post.excerpt?.substring(0, 100)}...</p>
                    <Link href={`/blog/${post.slug}`} className="text-decoration-none fw-semibold mt-2" style={{ color: '#FE171B' }}>
                      Read More <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link href="/blog" className="btn btn-outline-custom px-4">
                View All Articles <i className="fa fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Global Styles */}
      <style jsx global>{`
                /* Import Fonts */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');
                
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
                .hero {
                    min-height: 85vh;
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
                
                .glow-orb:nth-child(19) { width: 300px; height: 300px; top: -100px; right: -100px; animation-duration: 8s; }
                .glow-orb:nth-child(20) { width: 250px; height: 250px; bottom: -80px; left: -80px; animation-duration: 10s; animation-delay: 2s; }
                
                @keyframes pulseGlow {
                    0% { opacity: 0.3; transform: scale(1); }
                    100% { opacity: 0.7; transform: scale(1.2); }
                }
                
                .hero .container {
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
                
                .badge-animate:hover {
                    transform: translateY(-2px);
                }
                
                /* Buttons */
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
                
                /* Sections */
                .section {
                    padding: 80px 0;
                }
                
                .bg-mild-gray {
                    background: #f8fafc;
                }
                
                .bg-soft-light {
                    background: #ffffff;
                }
                
                /* Product Cards */
                .product-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem;
                    text-align: center;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                    border: 1px solid #eef2f6;
                }
                
                .product-card i {
                    font-size: 2.5rem;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1rem;
                }
                
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }
                
                .product-card a {
                    color: #FE171B;
                    text-decoration: none;
                    font-weight: 500;
                }
                
                /* Service Cards */
                .service-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.8rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    border: 1px solid #eef2f6;
                }
                
                .service-card i {
                    font-size: 2.2rem;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1rem;
                }
                
                .service-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }
                
                /* Pricing Cards */
                .pricing-card {
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 2rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    border: 1px solid #eef2f6;
                }
                
                .pricing-card i {
                    font-size: 2rem;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1rem;
                }
                
                .pricing-card .price {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 1rem 0;
                }
                
                .pricing-card .price small {
                    font-size: 0.9rem;
                    font-weight: 400;
                    color: #64748b;
                }
                
                .pricing-card ul {
                    list-style: none;
                    padding: 0;
                    margin: 1.5rem 0;
                    text-align: left;
                }
                
                .pricing-card ul li {
                    padding: 0.5rem 0;
                    color: #475569;
                }
                
                .pricing-card ul li i {
                    font-size: 0.9rem;
                    color: #FE171B;
                    margin-right: 10px;
                }
                
                .popular-plan {
                    transform: scale(1.02);
                    border: 2px solid #FE171B !important;
                    box-shadow: 0 10px 30px rgba(254, 23, 27, 0.15);
                }
                
                /* Testimonial Cards */
                .testimonial-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.8rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    border: 1px solid #eef2f6;
                    height: 100%;
                    transition: all 0.3s ease;
                }
                
                .testimonial-card:hover {
                    transform: translateY(-5px);
                }
                
                .testimonial-text {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #475569;
                    font-style: italic;
                    margin-bottom: 1.5rem;
                }
                
                .client-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .client-avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                
                .client-avatar-placeholder {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                
                /* Portfolio Cards */
                .portfolio-card {
                    background: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }
                
                .portfolio-card:hover {
                    transform: translateY(-5px);
                }
                
                .portfolio-image {
                    position: relative;
                    overflow: hidden;
                    height: 200px;
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
                
                .portfolio-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(254, 23, 27, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .portfolio-card:hover .portfolio-overlay {
                    opacity: 1;
                }
                
                .portfolio-link {
                    width: 45px;
                    height: 45px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FE171B;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                }
                
                .portfolio-link:hover {
                    transform: scale(1.1);
                }
                
                .portfolio-content {
                    padding: 1.2rem;
                }
                
                .portfolio-category {
                    font-size: 0.7rem;
                    color: #FE171B;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    display: inline-block;
                }
                
                /* Blog Cards */
                .blog-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    border: 1px solid #eef2f6;
                }
                
                .blog-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }
                
                .blog-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 12px;
                    margin-bottom: 1rem;
                }
                
                .blog-meta {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 0.8rem;
                    font-size: 0.75rem;
                    color: #64748b;
                }
                
                .blog-meta i {
                    margin-right: 5px;
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .section {
                        padding: 50px 0;
                    }
                    .hero {
                        min-height: 70vh;
                    }
                    .hero h1 {
                        font-size: 2rem;
                    }
                    .popular-plan {
                        transform: scale(1);
                    }
                }
            `}</style>
    </>
  );
}