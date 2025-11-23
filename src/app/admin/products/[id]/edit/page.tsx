'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';

export default function EditProductPage() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetch(`/api/products`)
                .then(res => res.json())
                .then(data => {
                    const found = data.find((p: any) => p.id === Number(params.id));
                    setProduct(found);
                    setIsLoading(false);
                });
        }
    }, [params.id]);

    if (isLoading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!product) {
        return <div className="p-8 text-center">Product not found</div>;
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Edit Product</h1>
                <p className="text-gray-500">Update product details and inventory</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <ProductForm initialData={product} isEdit />
            </div>
        </div>
    );
}
