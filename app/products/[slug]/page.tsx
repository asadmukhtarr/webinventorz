'use client';

import ProductDetailClient from './ProductDetailClient';
import { useParams } from 'next/navigation';

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;

    return <ProductDetailClient slug={slug} />;
}