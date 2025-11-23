'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    stock_quantity?: number;
    is_active?: boolean;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [stockFilter, setStockFilter] = useState('all');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
        const matchesStock = stockFilter === 'all' ||
            (stockFilter === 'low' && (p.stock_quantity || 0) < 5) ||
            (stockFilter === 'out' && (p.stock_quantity || 0) === 0);
        return matchesSearch && matchesCategory && matchesStock;
    });

    const handleSelectAll = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map(p => p.id));
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Delete ${selectedProducts.length} products?`)) return;
        // Implement bulk delete
        alert('Bulk delete functionality would be implemented here');
    };

    const handleExport = () => {
        const csv = [
            ['ID', 'Name', 'Category', 'Price', 'Stock'],
            ...filteredProducts.map(p => [p.id, p.name, p.category, p.price, p.stock_quantity || 0])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.csv';
        a.click();
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Products</h1>
                    <p className="text-gray-500">Manage your product inventory</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <span>📥</span> Export CSV
                    </button>
                    <Link
                        href="/admin/products/new"
                        className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                        + Add Product
                    </Link>
                </div>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                        <option value="all">All Categories</option>
                        <option value="essentials">Essentials</option>
                        <option value="evening">Evening</option>
                        <option value="activewear">Activewear</option>
                    </select>
                    <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                        <option value="all">All Stock Levels</option>
                        <option value="low">Low Stock (&lt; 5)</option>
                        <option value="out">Out of Stock</option>
                    </select>
                    {selectedProducts.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            Delete ({selectedProducts.length})
                        </button>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Loading products...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300"
                                    />
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Product</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Price</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Stock</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedProducts([...selectedProducts, product.id]);
                                                } else {
                                                    setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                                                }
                                            }}
                                            className="rounded border-gray-300"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                                            </div>
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 capitalize">{product.category}</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">₹{product.price.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${(product.stock_quantity || 0) === 0 ? 'bg-red-100 text-red-800' :
                                                (product.stock_quantity || 0) < 5 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                            }`}>
                                            {product.stock_quantity ?? 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.is_active !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {product.is_active !== false ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12 text-gray-500">No products found</div>
                    )}
                </div>
            )}
        </div>
    );
}
