import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { products as staticProducts } from '@/data/products';

export async function GET() {
    if (!supabase) {
        return NextResponse.json(staticProducts);
    }

    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        return NextResponse.json(staticProducts);
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!supabase) {
        return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { data, error } = await supabase
        .from('products')
        .insert([body])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
}
