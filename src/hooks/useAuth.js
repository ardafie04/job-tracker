// —————————————————————————————
// hooks/useAuth.js
// —————————————————————————————

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export function useAuth() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loginWithEmail = async (email, password) => {
        setError("");
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data?.user) {
                navigate("/dashboard");
            }

            return { success: true };
        } catch (err) {
            setError(err.message || "Login gagal");
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const registerWithEmail = async (email, password, fullName) => {
        setError("");
        setLoading(true);

        try {
            // Sign up user
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) throw error;

            // Insert to users table
            if (data?.user) {
                const { error: insertError } = await supabase.from("users").insert([
                    {
                        id: data.user.id,
                        email: data.user.email,
                        full_name: fullName,
                    },
                ]);

                if (insertError) throw insertError;

                navigate("/verify-email");
            }

            return { success: true };
        } catch (err) {
            setError(err.message || "Registrasi gagal");
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        setError("");
        setLoading(true);

        try {
            const redirectTo = window.location.origin; // ini yang penting

            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo },
            });

            if (error) throw error;

            return { success: true };
        } catch (err) {
            setError(err.message || "Google login gagal");
            setLoading(false);
            return { success: false, error: err.message };
        }
    };


    return {
        loading,
        error,
        setError,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
    };
}
