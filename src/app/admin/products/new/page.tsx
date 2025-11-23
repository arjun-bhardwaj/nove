import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Add New Product</h1>
                <p className="text-gray-500">Create a new product in your inventory</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <ProductForm />
            </div>
        </div>
    );
}
