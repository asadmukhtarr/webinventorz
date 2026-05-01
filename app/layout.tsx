import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import Loader from './components/Loader';

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({ subsets: ['latin'] });

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Fetch settings for metadata (Server Component)
async function getSettings() {
  try {
    const [general, seo] = await Promise.all([
      fetch(`${API_URL}/settings/general/all`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).catch(() => ({ success: false })),
      fetch(`${API_URL}/settings/seo/all`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).catch(() => ({ success: false })),
    ]);

    return {
      site_name: general.success ? general.data.site_name : 'WebInventorz',
      site_title: general.success ? general.data.site_title : 'WebInventorz | Digital Innovation Studio',
      site_description: general.success ? general.data.site_description : 'Crafting digital excellence with a human touch.',
      site_keywords: general.success ? general.data.site_keywords : 'web development, mobile apps, digital marketing, seo, ecommerce',
      site_logo: general.success ? general.data.site_logo : null,
      site_favicon: general.success ? general.data.site_favicon : null,
      seo_title: seo.success ? seo.data.seo_title : null,
      seo_description: seo.success ? seo.data.seo_description : null,
      seo_keywords: seo.success ? seo.data.seo_keywords : null,
      seo_author: seo.success ? seo.data.seo_author : 'WebInventorz',
      google_analytics_id: seo.success ? seo.data.google_analytics_id : null,
      google_verification: seo.success ? seo.data.google_verification : null,
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      site_name: 'WebInventorz',
      site_title: 'WebInventorz | Digital Innovation Studio',
      site_description: 'Crafting digital excellence with a human touch.',
      site_keywords: 'web development, mobile apps, digital marketing',
      seo_author: 'WebInventorz',
    };
  }
}

// Generate metadata dynamically from API
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const title = settings.seo_title || settings.site_title || 'WebInventorz | Digital Innovation Studio';
  const description = settings.seo_description || settings.site_description || 'Crafting digital excellence with a human touch.';
  const keywords = settings.seo_keywords || settings.site_keywords;

  return {
    title: title,
    description: description,
    keywords: keywords,
    authors: [{ name: settings.seo_author || 'WebInventorz' }],
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: settings.site_name || 'WebInventorz',
      images: settings.site_logo ? [settings.site_logo] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
    },
    icons: {
      icon: settings.site_favicon || '/favicon.ico',
      apple: settings.site_favicon || '/apple-touch-icon.png',
    },
    verification: {
      google: settings.google_verification || undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: '/',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,600;14..32,700&family=Poppins:wght@300;400;500;600;700;800&display=zoom"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Loader>
          <ProgressBar />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Loader>

        {/* Google Analytics Script using Next.js Script component */}
        <GoogleAnalytics />

        {/* Bootstrap JS using Next.js Script component */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

// Google Analytics Component using Next.js Script
function GoogleAnalytics() {
  const analyticsId = process.env.NEXT_PUBLIC_GA_ID || '';

  if (!analyticsId) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${analyticsId}');
                    `,
        }}
      />
    </>
  );
}