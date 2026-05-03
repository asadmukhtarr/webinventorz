'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.webinventorz.com/api';

// Types
interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    gallery: string[];
    tags: string[] | string;
    seo_title: string | null;
    seo_description: string | null;
    views: number;
    is_featured: boolean;
    is_published: boolean;
    published_at: string;
    created_at: string;
    category: {
        id: number;
        name: string;
        slug: string;
        color: string;
    } | null;
}

interface RelatedPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    category: {
        id: number;
        name: string;
        slug: string;
        color: string;
    } | null;
}

export default function SingleBlogPost() {
    const params = useParams();
    const slug = params?.slug as string;

    const [mounted, setMounted] = useState(false);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [siteUrl, setSiteUrl] = useState('');

    useEffect(() => {
        setMounted(true);
        // Get site URL for meta tags
        setSiteUrl(window.location.origin);
        if (slug) {
            fetchPost();
        }
    }, [slug]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/blog/posts/${slug}`);
            const data = await response.json();

            if (data.success) {
                setPost(data.data);
                // Fetch related posts after getting the post
                if (data.data.id) {
                    fetchRelatedPosts(data.data.id);
                }
            } else {
                setError(data.message || 'Post not found');
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            setError('Failed to load post. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedPosts = async (postId: number) => {
        try {
            const response = await fetch(`${API_URL}/blog/posts/${postId}/related?limit=3`);
            const data = await response.json();
            if (data.success) {
                setRelatedPosts(data.data);
            }
        } catch (error) {
            console.error('Error fetching related posts:', error);
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Get reading time
    const getReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content?.split(/\s+/).length || 0;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min read`;
    };

    // Get tags array
    const getTagsArray = (tags: string[] | string) => {
        if (Array.isArray(tags)) return tags;
        if (typeof tags === 'string' && tags) return tags.split(',').map(t => t.trim());
        return [];
    };

    // Generate meta tags data
    const getMetaData = () => {
        if (!post) {
            return {
                title: 'Blog Post | WebInventorz',
                description: 'Read our latest insights and articles',
                image: '/logo.png',
                url: `${siteUrl}/blog/${slug}`,
            };
        }

        return {
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt?.substring(0, 160) || 'Read this insightful article from WebInventorz',
            image: post.featured_image ? `${post.featured_image}` : '/logo.png',
            url: `${siteUrl}/blog/${post.slug}`,
            siteName: 'WebInventorz',
            twitterHandle: '@WebInventorz',
            category: post.category?.name || 'Technology',
            publishedTime: post.published_at || post.created_at,
        };
    };

    if (!mounted) {
        return null;
    }

    // Show loader while loading
    if (loading) {
        return (
            <>
                <Head>
                    <title>Loading... | WebInventorz</title>
                </Head>
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
                                0%, 100% {
                                    transform: scale(1);
                                    opacity: 1;
                                }
                                50% {
                                    transform: scale(1.1);
                                    opacity: 0.8;
                                }
                            }
                        `}</style>
                    </div>
                </div>
            </>
        );
    }

    if (error || !post) {
        return (
            <>
                <Head>
                    <title>Post Not Found | WebInventorz</title>
                    <meta name="description" content="The requested blog post could not be found." />
                </Head>
                <div className="text-center py-5" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <i className="fas fa-exclamation-circle fa-4x text-danger mb-3"></i>
                    <h2>Post Not Found</h2>
                    <p className="text-muted">{error || "The article you're looking for doesn't exist."}</p>
                    <Link href="/blog" className="btn btn-primary mt-3">Back to Blog</Link>
                </div>
            </>
        );
    }

    const tagsArray = getTagsArray(post.tags);
    const featuredImage = post.featured_image || '/placeholder.jpg';
    const meta = getMetaData();

    return (
        <>
            {/* Meta Tags for SEO and Social Sharing */}
            <Head>
                {/* Primary Meta Tags */}
                <title>{meta.title}</title>
                <meta name="title" content={meta.title} />
                <meta name="description" content={meta.description} />
                <meta name="keywords" content={tagsArray.join(', ')} />
                <meta name="author" content="WebInventorz" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Canonical URL */}
                <link rel="canonical" href={meta.url} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={meta.url} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:image" content={meta.image} />
                <meta property="og:image:alt" content={post.title} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content={meta.siteName} />
                <meta property="og:locale" content="en_US" />
                <meta property="article:published_time" content={meta.publishedTime} />
                <meta property="article:modified_time" content={post.created_at} />
                <meta property="article:section" content={meta.category} />
                {tagsArray.map((tag, index) => (
                    <meta key={index} property="article:tag" content={tag} />
                ))}

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={meta.url} />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                <meta name="twitter:image:alt" content={post.title} />
                <meta name="twitter:site" content={meta.twitterHandle} />
                <meta name="twitter:creator" content={meta.twitterHandle} />

                {/* Additional SEO Meta Tags */}
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow" />

                {/* JSON-LD Structured Data for BlogPosting */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": post.title,
                            "alternativeHeadline": post.seo_title,
                            "description": meta.description,
                            "image": meta.image,
                            "author": {
                                "@type": "Organization",
                                "name": "WebInventorz",
                                "url": siteUrl
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "WebInventorz",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": `${siteUrl}/logo.png`
                                }
                            },
                            "datePublished": meta.publishedTime,
                            "dateModified": post.created_at,
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": meta.url
                            },
                            "keywords": tagsArray.join(', '),
                            "articleSection": meta.category,
                            "url": meta.url,
                            "inLanguage": "en-US"
                        })
                    }}
                />
            </Head>

            {/* Blog Hero Section */}
            <section className="single-post-hero">
                <div className="hero-bg-animation">
                    {[...Array(10)].map((_, i) => (<div key={`bubble-${i}`} className="bubble"></div>))}
                    {[...Array(8)].map((_, i) => (<div key={`particle-${i}`} className="ai-particle"></div>))}
                    <div className="glow-orb"></div>
                    <div className="glow-orb"></div>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10" data-aos="fade-up">
                            {post.category && (
                                <span className="post-category" style={{ background: post.category.color || '#FE171B' }}>
                                    {post.category.name}
                                </span>
                            )}
                            <h1 className="display-4 fw-bold mb-4">{post.title}</h1>
                            <div className="post-meta-hero">
                                <div className="author-info">
                                    <div className="author-avatar-placeholder">
                                        <i className="fas fa-user-circle fa-3x text-secondary"></i>
                                    </div>
                                    <div>
                                        <strong>WebInventorz</strong>
                                        <span>Content Team</span>
                                    </div>
                                </div>
                                <div className="meta-stats">
                                    <span><i className="fa-regular fa-calendar"></i> {formatDate(post.published_at || post.created_at)}</span>
                                    <span><i className="fa-regular fa-clock"></i> {getReadTime(post.content)}</span>
                                    <span><i className="fa-regular fa-eye"></i> {post.views} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="featured-image-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10" data-aos="zoom-in">
                            <div className="featured-image-wrapper">
                                <img src={featuredImage} alt={post.title} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Content */}
            <section className="blog-content-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <article className="blog-article" data-aos="fade-up">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </article>

                            {/* Tags */}
                            {tagsArray.length > 0 && (
                                <div className="post-tags-wrapper" data-aos="fade-up">
                                    <h5>Tags:</h5>
                                    <div className="post-tags">
                                        {tagsArray.map((tag, index) => (
                                            <span key={index} className="tag-link">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Navigation Between Posts */}
                            <div className="post-navigation" data-aos="fade-up">
                                <Link href="/blog" className="nav-prev">
                                    <i className="fa-solid fa-arrow-left"></i> Back to Blog
                                </Link>
                                <Link href="/blog" className="nav-all">
                                    <i className="fa-solid fa-grid-2"></i> All Posts
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="related-posts-section">
                    <div className="container">
                        <div className="text-center mb-5" data-aos="fade-up">
                            <h2 className="fw-bold display-6">Related Posts</h2>
                            <p className="text-secondary">You might also enjoy these articles</p>
                        </div>
                        <div className="row g-4">
                            {relatedPosts.map((relatedPost, index) => (
                                <div key={relatedPost.id} className="col-md-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                                    <div className="related-post-card">
                                        <div className="related-post-image">
                                            <img src={relatedPost.featured_image || '/placeholder.jpg'} alt={relatedPost.title} />
                                            {relatedPost.category && (
                                                <span className="related-post-category" style={{ background: relatedPost.category.color || '#FE171B' }}>
                                                    {relatedPost.category.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="related-post-content">
                                            <h5 className="fw-bold mb-2">{relatedPost.title}</h5>
                                            <p className="small text-secondary">{relatedPost.excerpt?.substring(0, 100)}...</p>
                                            <Link href={`/blog/${relatedPost.slug}`} className="read-more-link">
                                                Read More <i className="fa-solid fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CSS Styles (same as before) */}
            <style jsx>{`
                .single-post-hero {
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

                .single-post-hero .container {
                    position: relative;
                    z-index: 2;
                }

                .post-category {
                    display: inline-block;
                    padding: 6px 16px;
                    border-radius: 30px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 1.5rem;
                }

                .post-meta-hero {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid #e2e8f0;
                }

                .author-info {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .author-avatar-placeholder i {
                    font-size: 3rem;
                    color: #64748b;
                }

                .author-info strong {
                    display: block;
                    font-size: 1rem;
                }

                .author-info span {
                    font-size: 0.8rem;
                    color: #64748b;
                }

                .meta-stats {
                    display: flex;
                    gap: 20px;
                    color: #64748b;
                    font-size: 0.9rem;
                }

                .meta-stats i {
                    margin-right: 5px;
                }

                /* Featured Image */
                .featured-image-section {
                    padding: 40px 0;
                    background: #ffffff;
                }

                .featured-image-wrapper {
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }

                .featured-image-wrapper img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                /* Blog Content */
                .blog-content-section {
                    padding: 60px 0;
                    background: #ffffff;
                }

                .blog-article {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #334155;
                }

                .blog-article h2 {
                    font-size: 1.8rem;
                    margin: 2rem 0 1rem;
                    color: #1e293b;
                }

                .blog-article h3 {
                    font-size: 1.4rem;
                    margin: 1.5rem 0 1rem;
                    color: #1e293b;
                }

                .blog-article p {
                    margin-bottom: 1.5rem;
                }

                .blog-article ul, .blog-article ol {
                    margin: 1rem 0 1.5rem;
                    padding-left: 1.5rem;
                }

                .blog-article li {
                    margin-bottom: 0.5rem;
                }

                /* Tags */
                .post-tags-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex-wrap: wrap;
                    padding: 2rem 0;
                    border-top: 1px solid #e2e8f0;
                    border-bottom: 1px solid #e2e8f0;
                    margin: 2rem 0;
                }

                .post-tags-wrapper h5 {
                    margin: 0;
                    font-size: 1rem;
                }

                .post-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .tag-link {
                    background: #f1f5f9;
                    padding: 5px 14px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    text-decoration: none;
                    color: #475569;
                    transition: all 0.3s ease;
                }

                .tag-link:hover {
                    background: #FE171B;
                    color: white;
                }

                /* Post Navigation */
                .post-navigation {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 2rem 0;
                }

                .nav-prev, .nav-next, .nav-all {
                    text-decoration: none;
                    color: #1e293b;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }

                .nav-prev:hover, .nav-next:hover {
                    color: #FE171B;
                    gap: 12px;
                }

                .nav-all {
                    background: #f1f5f9;
                    padding: 8px 20px;
                    border-radius: 30px;
                }

                .nav-all:hover {
                    background: #FE171B;
                    color: white;
                }

                /* Related Posts */
                .related-posts-section {
                    padding: 80px 0;
                    background: #f9fafc;
                }

                .related-post-card {
                    background: #ffffff;
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
                    height: 100%;
                }

                .related-post-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                }

                .related-post-image {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                }

                .related-post-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .related-post-card:hover .related-post-image img {
                    transform: scale(1.05);
                }

                .related-post-category {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    background: #FE171B;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }

                .related-post-content {
                    padding: 1.5rem;
                }

                .read-more-link {
                    color: #FE171B;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.85rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: gap 0.3s ease;
                }

                .read-more-link:hover {
                    gap: 12px;
                }

                @media (max-width: 992px) {
                    .single-post-hero {
                        margin-top: 60px;
                    }
                    .post-meta-hero {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }

                @media (max-width: 768px) {
                    .single-post-hero {
                        margin-top: 56px;
                    }
                    .single-post-hero h1 {
                        font-size: 1.8rem;
                    }
                    .post-navigation {
                        flex-direction: column;
                        gap: 15px;
                    }
                    .meta-stats {
                        flex-wrap: wrap;
                    }
                    .blog-article {
                        font-size: 1rem;
                    }
                    .blog-article h2 {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </>
    );
}