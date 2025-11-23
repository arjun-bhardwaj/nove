import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { sendEmail } from '@/lib/email';

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

    const order = data[0];

    // Send confirmation email
    await sendEmail({
        to: customer.email,
        subject: `Order Confirmation #${order.id.slice(0, 8)}`,
        html: `
            <h1>Thank you for your order, ${customer.firstName}!</h1>
            <p>We have received your order and are getting it ready.</p>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Total:</strong> ₹${total.toLocaleString()}</p>
            <br/>
            <p>We will notify you when your items ship.</p>
        `
    });

    return NextResponse.json({ success: true, order });
}
