import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
    const body = await request.json();
    const { amount, currency } = body;

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return NextResponse.json({ error: 'Razorpay keys missing' }, { status: 500 });
    }

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency: currency || 'INR',
        receipt: 'order_rcptid_' + Date.now(),
    };

    try {
        const order = await razorpay.orders.create(options);
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
