import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { products as staticProducts } from '@/data/products';

export async function GET() {
    // If no Supabase keys are set, return static data
    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return NextResponse.json(staticProducts);
    }

    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
