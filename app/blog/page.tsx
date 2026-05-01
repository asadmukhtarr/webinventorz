'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
  icon?: string;
}

export default function Blog() {
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category?.slug === activeCategory));
    }
  }, [activeCategory, posts]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch categories and posts in parallel
      const [categoriesRes, postsRes] = await Promise.all([
        fetch(`${API_URL}/blog/categories`),
        fetch(`${API_URL}/blog/posts?per_page=20`)
      ]);

      // Check if responses are ok
      if (!categoriesRes.ok) {
        throw new Error(`Categories API returned ${categoriesRes.status}`);
      }
      if (!postsRes.ok) {
        throw new Error(`Posts API returned ${postsRes.status}`);
      }

      // Parse JSON
      const categoriesData = await categoriesRes.json();
      const postsData = await postsRes.json();

      if (categoriesData.success) {
        setCategories(categoriesData.data);
      } else {
        console.warn('Categories API error:', categoriesData.message);
      }

      if (postsData.success) {
        setPosts(postsData.data);
        setFilteredPosts(postsData.data);
      } else {
        console.warn('Posts API error:', postsData.message);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Failed to load blog data. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
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
        <h2>Unable to Load Blog</h2>
        <p className="text-muted">{error}</p>
        <p className="text-muted small">Make sure Laravel backend is running on port 8000</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">
          Try Again
        </button>
      </div>
    );
  }

  const featuredPost = posts.find(post => post.is_featured) || posts[0];
  const regularPosts = filteredPosts.filter(post => !post.is_featured);

  // Categories for filter (including "All Posts")
  const filterCategories = [
    { name: "All Posts", slug: "all", icon: "fa-solid fa-newspaper", count: posts.length },
    ...categories.map(cat => ({
      name: cat.name,
      slug: cat.slug,
      icon: "fa-solid fa-tag",
      count: posts.filter(p => p.category?.slug === cat.slug).length
    }))
  ];

  return (
    <>
      {/* Blog Hero Section */}
      <section className="blog-hero">
        <div className="hero-bg-animation">
          {[...Array(10)].map((_, i) => (<div key={`bubble-${i}`} className="bubble"></div>))}
          {[...Array(8)].map((_, i) => (<div key={`particle-${i}`} className="ai-particle"></div>))}
          <div className="glow-orb"></div>
          <div className="glow-orb"></div>
        </div>

        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-aos="fade-up">
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill mb-4" style={{ background: '#f0f4fe !important', color: '#FE171B' }}>
                <i className="fa fa-book-open me-1"></i> Latest Insights
              </span>
              <h1 className="display-3 fw-bold mb-4">
                Our <span className="gradient-text">Blog</span>
              </h1>
              <p className="lead text-secondary mb-4">
                Expert tips, industry trends, and digital strategies to help your business grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post - Full Width Hero Style */}
      {featuredPost && (
        <section className="featured-post-full">
          <div className="featured-post-full-image" style={{ backgroundImage: `url(${featuredPost.featured_image || '/placeholder.jpg'})` }}>
            <div className="featured-overlay"></div>
            <div className="container">
              <div className="featured-post-full-content p-2 mt-5 mb-4" data-aos="fade-up">
                <h3 className="display-4 fw-bold mb-3">{featuredPost.title}</h3>
                <p className="lead mb-4">{featuredPost.excerpt}</p>
                <div className="post-meta-full mb-4">
                  <span><i className="fa-regular fa-calendar"></i> {formatDate(featuredPost.published_at || featuredPost.created_at)}</span>
                  <span><i className="fa-regular fa-clock"></i> {getReadTime(featuredPost.content)}</span>
                  <span><i className="fa-regular fa-eye"></i> {featuredPost.views} views</span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`} className="btn btn-custom btn-lg mb-5">
                  Read Full Article <i className="fa-solid fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
            <br /> <br />
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="filter-bar-section">
        <div className="container">
          <div className="filter-bar" data-aos="fade-up">
            <div className="filter-title">
              <i className="fa-solid fa-filter"></i> Filter by Category:
            </div>
            <div className="filter-buttons">
              {filterCategories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`filter-chip ${activeCategory === category.slug ? 'active' : ''}`}
                >
                  <i className={category.icon}></i>
                  {category.name}
                  <span className="count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid - Full Width Images */}
      <section className="blog-grid-full">
        <div className="container">
          <div className="row g-5">
            {regularPosts.length > 0 ? (
              regularPosts.map((post, index) => (
                <div key={post.id} className="col-12" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
                  <div className="blog-card-horizontal">
                    <div className="row g-0">
                      <div className="col-lg-5">
                        <div className="blog-card-image-full">
                          <img src={post.featured_image || '/placeholder.jpg'} alt={post.title} />
                          {post.category && (
                            <span className="post-category-badge" style={{ background: post.category.color || '#FE171B' }}>
                              {post.category.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="blog-card-content-full">
                          <div className="post-meta-list">
                            <span><i className="fa-regular fa-calendar"></i> {formatDate(post.published_at || post.created_at)}</span>
                            <span><i className="fa-regular fa-clock"></i> {getReadTime(post.content)}</span>
                            <span><i className="fa-regular fa-eye"></i> {post.views} views</span>
                          </div>
                          <h2 className="fw-bold mb-3">{post.title}</h2>
                          <p className="text-secondary mb-4">{post.excerpt}</p>
                          <div className="post-tags-list">
                            {getTagsArray(post.tags).slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="tag-pill">{tag}</span>
                            ))}
                          </div>
                          <Link href={`/blog/${post.slug}`} className="btn-read-more">
                            Continue Reading <i className="fa-solid fa-arrow-right ms-2"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No posts found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
                .blog-hero {
                    min-height: 40vh;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    position: relative;
                    overflow: hidden;
                    margin-top: 0px;
                    margin-bottom: 0;
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

                .blog-hero .container {
                    position: relative;
                    z-index: 2;
                }

                .gradient-text {
                    background: linear-gradient(120deg, #FE171B, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .featured-post-full {
                    position: relative;
                    margin: 0;
                    overflow: hidden;
                }

                .featured-post-full-image {
                    position: relative;
                    height: 500px;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: flex;
                    align-items: center;
                }

                .featured-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
                }

                .featured-post-full-content {
                    position: relative;
                    z-index: 2;
                    color: white;
                    max-width: 700px;
                }

                .post-meta-full {
                    display: flex;
                    gap: 20px;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.8);
                }

                .filter-bar-section {
                    padding: 30px 0;
                    background: #ffffff;
                    border-bottom: 1px solid #f0f2f5;
                    position: sticky;
                    top: 76px;
                    z-index: 99;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                }

                .filter-bar {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .filter-title {
                    font-weight: 600;
                    color: #1e293b;
                }

                .filter-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .filter-chip {
                    background: #f1f5f9;
                    border: none;
                    padding: 8px 18px;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }

                .filter-chip .count {
                    background: #e2e8f0;
                    padding: 2px 6px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                }

                .filter-chip.active {
                    background: linear-gradient(135deg, #FE171B, #cc1215);
                    color: white;
                }

                .filter-chip.active .count {
                    background: rgba(255, 255, 255, 0.3);
                    color: white;
                }

                .blog-grid-full {
                    padding: 60px 0;
                    background: #f9fafc;
                }

                .blog-card-horizontal {
                    background: #ffffff;
                    border-radius: 24px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
                }

                .blog-card-horizontal:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                }

                .blog-card-image-full {
                    position: relative;
                    height: 100%;
                    min-height: 300px;
                    overflow: hidden;
                }

                .blog-card-image-full img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .post-category-badge {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    padding: 5px 14px;
                    border-radius: 25px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: white;
                    z-index: 1;
                }

                .blog-card-content-full {
                    padding: 30px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .post-meta-list {
                    display: flex;
                    gap: 15px;
                    font-size: 0.8rem;
                    color: #64748b;
                    margin-bottom: 1rem;
                }

                .post-tags-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin: 1rem 0;
                }

                .tag-pill {
                    background: #f1f5f9;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    color: #475569;
                }

                .btn-read-more {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #FE171B;
                    text-decoration: none;
                    font-weight: 600;
                    margin-top: auto;
                    transition: gap 0.3s ease;
                }

                .btn-read-more:hover {
                    gap: 12px;
                    color: #cc1215;
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

                @media (max-width: 992px) {
                    .filter-bar-section { top: 60px; }
                    .featured-post-full-image { height: 400px; }
                }

                @media (max-width: 768px) {
                    .filter-bar-section { top: 56px; }
                    .featured-post-full-image { height: 350px; }
                    .filter-bar { flex-direction: column; align-items: flex-start; }
                    .filter-buttons { width: 100%; overflow-x: auto; padding-bottom: 10px; }
                    .filter-chip { white-space: nowrap; }
                    .blog-card-image-full { min-height: 220px; }
                    .blog-card-content-full { padding: 20px; }
                }
            `}</style>
    </>
  );
}