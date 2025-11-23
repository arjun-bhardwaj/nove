'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface VirtualTryOnProps {
    productImage: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function VirtualTryOn({ productImage, isOpen, onClose }: VirtualTryOnProps) {
    const [userImage, setUserImage] = useState<string | null>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const containerRef = useRef<HTMLDivElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setUserImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-serif font-medium text-gray-900">Virtual Fitting Room</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Controls */}
                    <div className="w-full md:w-64 bg-gray-50 p-6 flex flex-col gap-6 z-10 shadow-lg">
                        {!userImage ? (
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-4">Upload a full-body photo to start.</p>
                                <label className="block w-full px-4 py-3 bg-gray-900 text-white text-center rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                                    Upload Photo
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-2">Size</label>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="2"
                                        step="0.1"
                                        value={scale}
                                        onChange={(e) => setScale(parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                                <div className="mt-auto">
                                    <button
                                        onClick={() => setUserImage(null)}
                                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                                    >
                                        Change Photo
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Canvas Area */}
                    <div
                        className="flex-1 bg-gray-200 relative overflow-hidden flex items-center justify-center cursor-move"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {userImage ? (
                            <div className="relative w-full h-full">
                                <img
                                    src={userImage}
                                    alt="User"
                                    className="w-full h-full object-contain pointer-events-none select-none"
                                />
                                <div
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                                    style={{
                                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                                    }}
                                    onMouseDown={handleMouseDown}
                                >
                                    <img
                                        src={productImage}
                                        alt="Product"
                                        className="max-w-[300px] pointer-events-none select-none drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p>Preview Area</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
