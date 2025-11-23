'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            if (!supabase) {
                router.push('/admin/login');
                return;
            }

            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push('/admin/login');
            }
        };

        checkAuth();
    }, [router]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
