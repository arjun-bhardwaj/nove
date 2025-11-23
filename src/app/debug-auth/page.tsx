'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function DebugAuthPage() {
    const [status, setStatus] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkConnection = async () => {
            const checks: any = {};

            // Check 1: Env Vars (Client Side)
            checks.hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
            checks.hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
            checks.urlPrefix = process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 8) + '...';

            // Check 2: Supabase Client
            checks.clientInitialized = !!supabase;

            // Check 3: Connection Test
            if (supabase) {
                try {
                    const { data, error } = await supabase.from('products').select('count').single();
                    if (error) {
                        checks.connectionError = error.message;
                        checks.connectionSuccess = false;
                    } else {
                        checks.connectionSuccess = true;
                        checks.data = data;
                    }
                } catch (err: any) {
                    checks.connectionException = err.message;
                }

                // Check 4: Auth Session
                const { data: { session } } = await supabase.auth.getSession();
                checks.hasSession = !!session;
                checks.userEmail = session?.user?.email;
            }

            setStatus(checks);
            setLoading(false);
        };

        checkConnection();
    }, []);

    return (
        <div className="min-h-screen pt-[120px] p-8 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
                <h1 className="text-2xl font-bold mb-6">Auth Debugger</h1>

                {loading ? (
                    <div>Running checks...</div>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-gray-100">
                            <h3 className="font-semibold mb-2">Environment Variables</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>NEXT_PUBLIC_SUPABASE_URL:</div>
                                <div className={status.hasUrl ? 'text-green-600' : 'text-red-600'}>
                                    {status.hasUrl ? 'Present' : 'Missing'} ({status.urlPrefix})
                                </div>
                                <div>NEXT_PUBLIC_SUPABASE_ANON_KEY:</div>
                                <div className={status.hasKey ? 'text-green-600' : 'text-red-600'}>
                                    {status.hasKey ? 'Present' : 'Missing'}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-100">
                            <h3 className="font-semibold mb-2">Supabase Client</h3>
                            <div className="text-sm">
                                Client Initialized:
                                <span className={`ml-2 font-medium ${status.clientInitialized ? 'text-green-600' : 'text-red-600'}`}>
                                    {status.clientInitialized ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-100">
                            <h3 className="font-semibold mb-2">Database Connection</h3>
                            <div className="text-sm space-y-1">
                                <div>
                                    Status:
                                    <span className={`ml-2 font-medium ${status.connectionSuccess ? 'text-green-600' : 'text-red-600'}`}>
                                        {status.connectionSuccess ? 'Connected' : 'Failed'}
                                    </span>
                                </div>
                                {status.connectionError && (
                                    <div className="text-red-600 mt-1">Error: {status.connectionError}</div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-100">
                            <h3 className="font-semibold mb-2">Auth Session</h3>
                            <div className="text-sm">
                                <div>Has Session: {status.hasSession ? 'Yes' : 'No'}</div>
                                {status.userEmail && <div>User: {status.userEmail}</div>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
