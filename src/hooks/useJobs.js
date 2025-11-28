// —————————————————————————————
// hooks/useJobs.js (FIXED - GUARANTEED NO LOADING)
// —————————————————————————————

import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getJobs, addJob, deleteJob } from '../utils/api';

export function useJobs(userId) {
    // ✅ Helper function di LUAR state
    const getCachedJobs = () => {
        try {
            const cached = localStorage.getItem('cachedJobs');
            return cached ? JSON.parse(cached) : [];
        } catch (e) {
            console.error("Cache parse error:", e);
            return [];
        }
    };

    // ✅ Initial state langsung dari cache
    const cachedJobs = getCachedJobs();
    const [jobs, setJobs] = useState(cachedJobs);
    const [loading, setLoading] = useState(false); // Default false!

    const fetchJobs = useCallback(async () => {
        if (!userId) return;

        try {
            // ✅ Set loading true HANYA jika tidak ada cache
            if (jobs.length === 0) {
                setLoading(true);
            }

            const userJobs = await getJobs(userId);
            setJobs(userJobs || []);
            localStorage.setItem('cachedJobs', JSON.stringify(userJobs || []));
        } catch (err) {
            console.error("Error fetching jobs:", err);
        } finally {
            setLoading(false);
        }
    }, [userId, jobs.length]);

    const createJob = useCallback(async (jobData) => {
        try {
            await addJob(jobData);
            await fetchJobs();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }, [fetchJobs]);

    const updateJob = useCallback(async (jobId, updates) => {
        try {
            if (updates.created_at && updates.expires_at) {
                const createdDate = new Date(updates.created_at);
                const expiryDate = new Date(updates.expires_at);

                if (expiryDate <= createdDate) {
                    throw new Error("Tanggal kadaluarsa harus lebih besar dari tanggal dibuat!");
                }
            }

            const { error } = await supabase
                .from("jobs")
                .update(updates)
                .eq("id", jobId);

            if (error) throw error;

            await fetchJobs();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }, [fetchJobs]);

    const removeJob = useCallback(async (jobId) => {
        try {
            await deleteJob(jobId);
            await fetchJobs();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }, [fetchJobs]);

    return {
        jobs,
        loading,
        fetchJobs,
        createJob,
        updateJob,
        removeJob
    };
}
