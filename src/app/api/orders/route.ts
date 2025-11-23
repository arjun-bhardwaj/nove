import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
    const body = await request.json();
    const { items, total, customer } = body;

    // If no Supabase keys are set, just mock success
    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        console.log('Mock Order Received:', { items, total, customer });
        return NextResponse.json({ success: true, id: 'mock-id-' + Date.now() });
    }

    const { data, error } = await supabase
        .from('orders')
        .insert([
            {
                items,
                total_amount: total,
                customer_email: customer.email,
                customer_name: `${customer.firstName} ${customer.lastName}`,
                status: 'pending'
            }
        ])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data[0] });
}
