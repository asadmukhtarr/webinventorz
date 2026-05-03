'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.webinventorz.com/api';

// Types
interface Product {
    id: number;
    name: string;
    slug: string;
    icon: string;
    short_description: string;
    description: string;
    image: string | null;
    gallery: string[];
    features: string[];
    specifications: any[];
    tags: string[];
    is_active: boolean;
    order: number;
    category: {
        id: number;
        name: string;
        slug: string;
        icon: string;
    } | null;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

export default function Products() {
    const [mounted, setMounted] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState("all");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        setMounted(true);
        fetchData();
    }, []);

    useEffect(() => {
        if (activeFilter === "all") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category?.slug === activeFilter));
        }
    }, [activeFilter, products]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch products and categories in parallel
            const [productsRes, categoriesRes] = await Promise.all([
                fetch(`${API_URL}/products`),
                fetch(`${API_URL}/products/categories/all`)
            ]);

            if (!productsRes.ok) {
                throw new Error(`Products API returned ${productsRes.status}`);
            }

            const productsData = await productsRes.json();

            if (productsData.success) {
                setProducts(productsData.data);
                setFilteredProducts(productsData.data);
            } else {
                throw new Error(productsData.message || 'Failed to load products');
            }

            // Try to fetch categories (optional)
            if (categoriesRes.ok) {
                const categoriesData = await categoriesRes.json();
                if (categoriesData.success) {
                    setCategories(categoriesData.data);
                }
            }

        } catch (error: any) {
            console.error('Error fetching products:', error);
            setError(error.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    // Get image URL
    const getImageUrl = (product: Product) => {
        if (product.image) {
            return product.image;
        }
        return `https://placehold.co/400x300/1e293b/ffffff?text=${encodeURIComponent(product.name)}`;
    };

    // Get tags array
    const getTagsArray = (tags: string[] | string) => {
        if (Array.isArray(tags)) return tags;
        if (typeof tags === 'string' && tags) return tags.split(',').map(t => t.trim());
        return [];
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

    // Show error message
    if (error) {
        return (
            <div className="text-center py-5" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <i className="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
                <h2>Unable to Load Products</h2>
                <p className="text-muted">{error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
                    Try Again
                </button>
            </div>
        );
    }

    // Build filters from API categories
    const filters = [
        { id: "all", label: "All Products" },
        ...categories.map(cat => ({ id: cat.slug, label: cat.name }))
    ];

    return (
        <>
            {/* Products Hero Section */}
            <section className="products-hero">
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
                        <div className="col-lg-8" data-aos="fade-up">
                            <h1 className="display-4 fw-bold mb-3">
                                Our <span className="gradient-text">Products</span>
                            </h1>
                            <p className="lead text-secondary">
                                Innovative digital solutions designed to transform your business and drive growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="products-grid">
                <div className="container">
                    {/* Filter Buttons */}
                    {categories.length > 0 && (
                        <div className="filter-buttons" data-aos="fade-up">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(filter.id)}
                                    data-filter={filter.id}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="row g-4" id="productsGrid">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="col-md-6 col-lg-4"
                                    data-aos="fade-up"
                                    data-aos-delay={(index % 3) * 100}
                                >
                                    <Link href={`/products/${product.slug || product.id}`} className="product-card">
                                        <div className="product-image">
                                            <img
                                                src={getImageUrl(product)}
                                                alt={product.name}
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://placehold.co/400x300/1e293b/ffffff?text=${encodeURIComponent(product.name)}`;
                                                }}
                                            />
                                        </div>
                                        <div className="product-icon">
                                            <i className={product.icon || "fa-solid fa-box"}></i>
                                        </div>
                                        <h3>{product.name}</h3>
                                        <p>{product.short_description || product.description?.substring(0, 100)}</p>
                                        <div className="product-tags">
                                            {getTagsArray(product.tags).slice(0, 3).map((tag, idx) => (
                                                <span key={idx} className="product-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <span className="card-link">
                                            View Details <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <p className="text-muted">No products found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-white">
                <div className="container">
                    <div className="cta-wrapper text-center mx-auto"
                        style={{
                            maxWidth: '900px',
                            background: '#ffffff',
                            borderRadius: '48px',
                            padding: '3rem 2rem',
                            boxShadow: '0 20px 35px -12px rgba(0,0,0,0.05)',
                            border: '1px solid #f0f2f5'
                        }}
                        data-aos="zoom-in"
                    >
                        <h2 className="fw-bold display-6">Need a Custom Solution?</h2>
                        <p className="text-secondary mb-4 col-lg-8 mx-auto">
                            Let's discuss your specific requirements and build a tailored product for your business.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <Link href="/contact" className="btn btn-custom px-5 py-3">
                                Contact Sales <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                            <Link href="/quote" className="btn btn-outline-custom px-5 py-3">
                                Request Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .products-hero {
                    min-height: 40vh;
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

                .products-hero .container {
                    position: relative;
                    z-index: 2;
                }

                .gradient-text {
                    background: linear-gradient(120deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .filter-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 3rem;
                }

                .filter-btn {
                    background: #f1f5f9;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 50px;
                    font-weight: 600;
                    color: #475569;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .filter-btn:hover {
                    background: #e2e8f0;
                    transform: translateY(-2px);
                }

                .filter-btn.active {
                    background: linear-gradient(135deg, #FE171B, #cc1215);
                    color: white;
                    box-shadow: 0 4px 12px rgba(254, 23, 27, 0.3);
                }

                .product-card {
                    background: #ffffff;
                    border: none;
                    border-radius: 28px;
                    transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.03), 0 4px 8px rgba(0, 0, 0, 0.02);
                    padding: 0;
                    text-align: center;
                    height: 100%;
                    cursor: pointer;
                    text-decoration: none;
                    display: block;
                    color: inherit;
                    overflow: hidden;
                }

                .product-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }

                .product-image {
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                    border-radius: 28px 28px 0 0;
                }

                .product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .product-card:hover .product-image img {
                    transform: scale(1.05);
                }

                .product-icon {
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, #FE171B10, #6366f110);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: -35px auto 1rem auto;
                    transition: all 0.3s ease;
                    border: 3px solid white;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
                }

                .product-card:hover .product-icon {
                    background: linear-gradient(135deg, #FE171B20, #6366f120);
                    transform: scale(1.05);
                }

                .product-icon i {
                    font-size: 2rem;
                    background: linear-gradient(135deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .product-card h3 {
                    font-size: 1.4rem;
                    margin-bottom: 0.75rem;
                    padding: 0 1.5rem;
                }

                .product-card p {
                    color: #64748b;
                    margin-bottom: 1rem;
                    padding: 0 1.5rem;
                    font-size: 0.9rem;
                    line-height: 1.5;
                }

                .product-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    justify-content: center;
                    margin: 1rem 1.5rem;
                }

                .product-tag {
                    background: #f1f5f9;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 500;
                    color: #475569;
                    transition: all 0.2s ease;
                }

                .product-card:hover .product-tag {
                    background: #e2e8f0;
                }

                .card-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #FE171B;
                    font-weight: 600;
                    text-decoration: none;
                    margin: 0 1.5rem 1.5rem 1.5rem;
                    transition: gap 0.2s;
                    padding-bottom: 0.5rem;
                }

                .card-link:hover {
                    gap: 12px;
                    color: #FE171B;
                }

                .products-grid {
                    padding: 80px 0;
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
                    .products-hero {
                        margin-top: 60px;
                        min-height: 30vh;
                    }
                    
                    .product-image {
                        height: 180px;
                    }

                    .product-icon {
                        width: 60px;
                        height: 60px;
                        margin-top: -30px;
                    }

                    .product-icon i {
                        font-size: 1.6rem;
                    }

                    .product-card h3 {
                        font-size: 1.2rem;
                        padding: 0 1rem;
                    }

                    .product-card p {
                        padding: 0 1rem;
                        font-size: 0.85rem;
                    }

                    .product-tags {
                        margin: 0.75rem 1rem;
                    }

                    .card-link {
                        margin: 0 1rem 1rem 1rem;
                    }
                    
                    .filter-btn {
                        padding: 8px 18px;
                        font-size: 0.85rem;
                    }
                    
                    .products-grid {
                        padding: 50px 0;
                    }
                }
            `}</style>
        </>
    );
}