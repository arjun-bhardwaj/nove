import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
    // Mock stats if no Supabase connection
    if (!supabase) {
        return NextResponse.json({
            totalOrders: 42,
            totalRevenue: 125000,
            lowStockItems: 3,
            pendingOrders: 8,
        });
    }

    try {
        // Fetch real stats from Supabase
        const { data: orders, error } = await supabase
            .from('orders')
            .select('total_amount, status');

        if (error) throw error;

        const totalOrders = orders?.length || 0;
        const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
        const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;

        return NextResponse.json({
            totalOrders,
            totalRevenue,
            lowStockItems: 0, // Will implement with products table
            pendingOrders,
        });
    } catch (error) {
        return NextResponse.json({
            totalOrders: 0,
            totalRevenue: 0,
            lowStockItems: 0,
            pendingOrders: 0,
        });
    }
}
