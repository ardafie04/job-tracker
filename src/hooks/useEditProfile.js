// —————————————————————————————
// hooks/useEditProfile.js
// —————————————————————————————

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export function useEditProfile(userProp) {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        if (userProp) return userProp;

        const cached = localStorage.getItem('cachedUser');
        if (cached) {
            try {
                return JSON.parse(cached);
            } catch (e) {
                console.error("Cache parse error:", e);
                return null;
            }
        }
        return null;
    });

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (userProp) {
            setUser(userProp);
            return;
        }

        if (!user) {
            fetchUser();
        }
    }, [userProp, user]);

    const fetchUser = async () => {
        try {
            setLoading(true);

            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                navigate("/");
                return;
            }

            const { data: userData } = await supabase
                .from("users")
                .select("*")
                .eq("id", user.id)
                .single();

            const freshUser = {
                id: user.id,
                email: user.email,
                full_name: userData?.full_name || user.user_metadata?.full_name || "",
                username: userData?.username || user.user_metadata?.username || "",
            };

            setUser(freshUser);
            localStorage.setItem('cachedUser', JSON.stringify(freshUser));
        } catch (err) {
            console.error("Error:", err);
            setError("Gagal memuat data user");
            localStorage.removeItem('cachedUser');
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (fullName, username) => {
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            if (!fullName.trim()) {
                throw new Error("Nama lengkap wajib diisi!");
            }

            const { error: updateError } = await supabase
                .from("users")
                .update({
                    full_name: fullName.trim(),
                    username: username.trim() || null,
                })
                .eq("id", user.id);

            if (updateError) throw updateError;

            const { error: metaError } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName.trim(),
                    username: username.trim() || null
                }
            });

            if (metaError) throw metaError;

            const updatedUser = {
                ...user,
                full_name: fullName.trim(),
                username: username.trim() || null
            };
            setUser(updatedUser);
            localStorage.setItem('cachedUser', JSON.stringify(updatedUser));

            setSuccess("Profile berhasil diupdate!");

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (err) {
            setError(err.message);
            setSaving(false);
        }
    };

    const updatePassword = async (oldPassword, newPassword, confirmPassword) => {
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            if (!oldPassword || !newPassword || !confirmPassword) {
                throw new Error("Semua field password wajib diisi!");
            }

            if (newPassword.length < 6) {
                throw new Error("Password baru minimal 6 karakter!");
            }

            if (newPassword !== confirmPassword) {
                throw new Error("Password baru tidak cocok!");
            }

            if (oldPassword === newPassword) {
                throw new Error("Password baru tidak boleh sama dengan password lama!");
            }

            // Verify old password
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: oldPassword
            });

            if (signInError) {
                throw new Error("Password lama salah!");
            }

            // Update to new password
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (updateError) throw updateError;

            setSuccess("Password berhasil diupdate!");

            setTimeout(() => setSuccess(""), 3000);
            setSaving(false);

            return { success: true };

        } catch (err) {
            setError(err.message);
            setSaving(false);
            return { success: false };
        }
    };

    return {
        user,
        loading,
        saving,
        error,
        success,
        setError,
        setSuccess,
        updateProfile,
        updatePassword
    };
}
