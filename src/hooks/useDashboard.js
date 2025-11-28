// —————————————————————————————
// hooks/useDashboard.js (FIXED - GUARANTEED NO LOADING)
// —————————————————————————————

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useDashboard() {
    // ✅ Helper function di LUAR state
    const getCachedUser = () => {
        try {
            const cached = localStorage.getItem('cachedUser');
            return cached ? JSON.parse(cached) : null;
        } catch (e) {
            console.error("Cache parse error:", e);
            return null;
        }
    };

    // ✅ Initial state langsung dari cache
    const cachedUser = getCachedUser();
    const [user, setUser] = useState(cachedUser);
    const [loading, setLoading] = useState(!cachedUser); // False jika ada cache

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

            if (authError || !authUser) {
                localStorage.removeItem('cachedUser');
                window.location.href = "/";
                return;
            }

            const { data: userData } = await supabase
                .from("users")
                .select("*")
                .eq("id", authUser.id)
                .single();

            const freshUser = {
                id: authUser.id,
                email: authUser.email,
                full_name: userData?.full_name || authUser.user_metadata?.full_name || null,
                username: userData?.username || authUser.user_metadata?.username || authUser.email?.split('@')[0] || null,
            };

            setUser(freshUser);
            localStorage.setItem('cachedUser', JSON.stringify(freshUser));
        } catch (err) {
            console.error("Error loading user:", err);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading };
}
