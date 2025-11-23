import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
    if (!supabase) {
        // Return mock orders
        return NextResponse.json([
            {
                id: 'mock-order-1',
                customer_email: 'customer@example.com',
                customer_name: 'Jane Doe',
                total_amount: 15999,
                status: 'pending',
                created_at: new Date().toISOString(),
                items: [{ name: 'Nove Signature Nursing Top', quantity: 1, priceString: '₹15,999' }],
            },
        ]);
    }

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json([]);
    }

    return NextResponse.json(data);
}
