// —————————————————————————————
// utils/jobHelpers.js
// —————————————————————————————

import { supabase } from '../lib/supabaseClient';

export async function autoUpdateExpiredJobs(userId) {
    try {
        const now = new Date().toISOString();

        // Update semua job yang expired tapi keterangan bukan "Lamaran Ditolak"
        const { data, error } = await supabase
            .from('jobs')
            .update({ keterangan: 'Lamaran Ditolak' })
            .eq('user_id', userId)
            .lt('expires_at', now)
            .neq('keterangan', 'Lamaran Ditolak');

        if (error) throw error;

        return { success: true, updated: data?.length || 0 };
    } catch (err) {
        console.error('Error auto-updating expired jobs:', err);
        return { success: false, error: err.message };
    }
}
