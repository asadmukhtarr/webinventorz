
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
    features: string[] | string;
    specifications: any[] | string;
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

interface RelatedProduct {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    image: string | null;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

interface Specification {
    key: string;
    value: string;
}

export default function ProductDetailClient({ slug }: { slug: string }) {
    const [mounted, setMounted] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showLightbox, setShowLightbox] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/products/${slug}`);
            const data = await response.json();

            if (data.success) {
                setProduct(data.data);
                // Set selected image as main image or first gallery image
                if (data.data.image) {
                    setSelectedImage(data.data.image);
                } else if (data.data.gallery && data.data.gallery.length > 0) {
                    setSelectedImage(data.data.gallery[0]);
                }
                // Fetch related products from same category
                if (data.data.category) {
                    fetchRelatedProducts(data.data.category.slug);
                }
            } else {
                setError(data.message || 'Product not found');
            }
        } catch (error: any) {
            console.error('Error fetching product:', error);
            setError(error.message || 'Failed to load product');
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (categorySlug: string) => {
        try {
            const response = await fetch(`${API_URL}/products/category/${categorySlug}/products?per_page=3`);
            const data = await response.json();
            if (data.success) {
                const filtered = data.data.filter((p: RelatedProduct) => p.slug !== slug);
                setRelatedProducts(filtered.slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    };

    // Get image URL
    const getImageUrl = (imagePath: string | null): string => {
        if (imagePath) {
            return imagePath;
        }
        return '/placeholder.jpg';
    };

    // Get gallery array
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

    // Get features array
    const getFeaturesArray = (features: string[] | string): string[] => {
        if (Array.isArray(features)) return features;
        if (typeof features === 'string' && features) {
            try {
                const parsed = JSON.parse(features);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        return [];
    };

    // Get specifications array
    const getSpecificationsArray = (specifications: any[] | string): Specification[] => {
        if (Array.isArray(specifications)) return specifications as Specification[];
        if (typeof specifications === 'string' && specifications) {
            try {
                const parsed = JSON.parse(specifications);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        return [];
    };

    // Open lightbox
    const openLightbox = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setShowLightbox(true);
    };

    // Close lightbox
    const closeLightbox = () => {
        setShowLightbox(false);
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
    if (error || !product) {
        return (
            <div className="text-center py-5" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <i className="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
                <h2>Product Not Found</h2>
                <p className="text-muted">{error || "The product you're looking for doesn't exist."}</p>
                <Link href="/products" className="btn btn-primary mt-3">Back to Products</Link>
            </div>
        );
    }

    const gallery = getGalleryArray(product.gallery);
    const features = getFeaturesArray(product.features);
    const specifications = getSpecificationsArray(product.specifications);
    const mainImage = product.image || (gallery.length > 0 ? gallery[0] : null);

    return (
        <>
            {/* Product Detail Hero Section */}
            <section className="product-detail-hero">
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
                            {product.category && (
                                <span className="product-badge" style={{ background: '#FE171B' }}>
                                    {product.category.name}
                                </span>
                            )}
                            <h1 className="display-4 fw-bold mb-3">
                                {product.name}
                            </h1>
                            <p className="lead text-secondary">{product.short_description || product.description?.substring(0, 150)}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Detail Content */}
            <section className="product-detail-section">
                <div className="container">
                    <div className="row g-5">
                        {/* Product Image Gallery */}
                        <div className="col-lg-6" data-aos="fade-right">
                            {/* Main Image */}
                            <div className="product-main-image" onClick={() => mainImage && openLightbox(mainImage)}>
                                <img src={getImageUrl(mainImage)} alt={product.name} />
                            </div>

                            {/* Gallery Thumbnails */}
                            {gallery.length > 0 && (
                                <div className="product-gallery">
                                    <h5 className="fw-bold mb-3">Product Gallery</h5>
                                    <div className="gallery-grid">
                                        {gallery.map((img, index) => (
                                            <div
                                                key={index}
                                                className="gallery-thumb"
                                                onClick={() => openLightbox(img)}
                                            >
                                                <img src={getImageUrl(img)} alt={`${product.name} - ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="col-lg-6" data-aos="fade-left">
                            <h2 className="fw-bold mb-3">About This Product</h2>
                            <p className="text-secondary mb-4">{product.description}</p>

                            {features.length > 0 && (
                                <>
                                    <h5 className="fw-bold mb-3">
                                        <i className="fa-solid fa-star" style={{ color: '#FE171B' }}></i> Key Features
                                    </h5>
                                    <ul className="feature-list">
                                        {features.slice(0, 6).map((feature: string, index: number) => (
                                            <li key={index}>
                                                <i className="fa-solid fa-check-circle"></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {specifications.length > 0 && (
                                <>
                                    <h5 className="fw-bold mt-4 mb-3">
                                        <i className="fa-solid fa-gear"></i> Specifications
                                    </h5>
                                    <div className="specifications">
                                        {specifications.map((spec: Specification, index: number) => (
                                            <div key={index} className="spec-item">
                                                <strong>{spec.key}:</strong> {spec.value}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="row mt-5">
                        <div className="col-lg-8 mx-auto" data-aos="zoom-in">
                            <div className="price-box">
                                <h3 className="fw-bold mb-3">Ready to Get Started?</h3>
                                <div className="price">
                                    Contact Sales for Pricing
                                    <small>Custom solutions tailored to your needs</small>
                                </div>
                                <p className="text-secondary mt-3 mb-4">
                                    Get a free consultation and detailed quote for your project.
                                </p>
                                <div className="d-flex gap-3 justify-content-center">
                                    <Link href="/quote" className="btn btn-custom px-4 py-2">
                                        Get Started <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                    <Link href="/contact" className="btn btn-outline-custom px-4 py-2">
                                        Contact Sales <i className="fa-solid fa-headset"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="section bg-mild-gray" style={{ padding: '60px 0', background: '#f9fafc' }}>
                    <div className="container">
                        <div className="text-center mb-5" data-aos="fade-up">
                            <h2 className="fw-bold display-6">You Might Also Like</h2>
                            <p className="text-secondary col-lg-6 mx-auto">
                                Explore our other innovative solutions designed for your business needs.
                            </p>
                        </div>
                        <div className="row g-4">
                            {relatedProducts.map((related: RelatedProduct, index: number) => (
                                <div key={related.id} className="col-md-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                                    <Link href={`/products/${related.slug}`} className="related-card">
                                        <img src={getImageUrl(related.image)} alt={related.name} />
                                        <div className="related-card-body">
                                            <h5 className="fw-bold">{related.name}</h5>
                                            <p className="small text-secondary mb-0">{related.short_description?.substring(0, 80)}</p>
                                            <span className="card-link small mt-2 d-inline-block">Learn More →</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Lightbox Modal */}
            {showLightbox && selectedImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>×</button>
                        <img src={getImageUrl(selectedImage)} alt="Product" />
                    </div>
                </div>
            )}

            <style jsx>{`
                .product-detail-hero {
                    min-height: 45vh;
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

                .product-detail-hero .container {
                    position: relative;
                    z-index: 2;
                }

                .product-badge {
                    display: inline-block;
                    padding: 6px 16px;
                    border-radius: 30px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 1.5rem;
                }

                .product-detail-section {
                    padding: 80px 0;
                    background: #ffffff;
                }

                .product-main-image {
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                }

                .product-main-image img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .product-gallery {
                    margin-top: 2rem;
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                }

                .gallery-thumb {
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    aspect-ratio: 1 / 1;
                    border: 2px solid #eef2f6;
                    transition: all 0.3s ease;
                }

                .gallery-thumb:hover {
                    border-color: #FE171B;
                    transform: scale(1.05);
                }

                .gallery-thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .feature-list {
                    list-style: none;
                    padding: 0;
                }

                .feature-list li {
                    padding: 10px 0;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 0.95rem;
                    color: #475569;
                    border-bottom: 1px solid #eef2f6;
                }

                .feature-list i {
                    color: #FE171B;
                    font-size: 1.1rem;
                    flex-shrink: 0;
                }

                .specifications {
                    background: #f8fafc;
                    border-radius: 16px;
                    padding: 1rem;
                }

                .spec-item {
                    padding: 8px 0;
                    border-bottom: 1px solid #e2e8f0;
                }

                .spec-item:last-child {
                    border-bottom: none;
                }

                .price-box {
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    border-radius: 32px;
                    padding: 2.5rem;
                    text-align: center;
                    color: white;
                }

                .price {
                    font-size: 2rem;
                    font-weight: 800;
                    margin: 1rem 0;
                }

                .price small {
                    font-size: 0.9rem;
                    font-weight: normal;
                    display: block;
                    color: #94a3b8;
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

                .related-card {
                    display: block;
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
                    text-decoration: none;
                    color: inherit;
                    height: 100%;
                }

                .related-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                }

                .related-card img {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                }

                .related-card-body {
                    padding: 1.25rem;
                }

                .card-link {
                    color: #FE171B;
                    font-weight: 600;
                    transition: gap 0.2s;
                }

                .card-link:hover {
                    gap: 12px;
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

                @media (max-width: 768px) {
                    .product-detail-hero {
                        margin-top: 60px;
                    }
                    
                    .product-detail-section {
                        padding: 50px 0;
                    }
                    
                    .price-box {
                        padding: 1.5rem;
                    }
                    
                    .price {
                        font-size: 1.5rem;
                    }

                    .gallery-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 10px;
                    }
                }
            `}</style>
        </>
    );
}