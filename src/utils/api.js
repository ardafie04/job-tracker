import { supabase } from "../lib/supabaseClient";

// Ambil semua jobs berdasarkan user_id (uuid)
export async function getJobs(userId) {
    const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", userId) // PENTING: Gunakan user_id (uuid)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

// Tambah job baru
export async function addJob(jobData) {
    const { data, error } = await supabase
        .from("jobs")
        .insert([jobData])
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Hapus job
export async function deleteJob(id) {
    const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", id);

    if (error) throw error;
}