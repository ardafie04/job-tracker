// —————————————————————————————
// Login.jsx (CLEAN & MODULAR)
// —————————————————————————————

import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import SocialButton from "../components/auth/SocialButton";
import AuthDivider from "../components/auth/AuthDivider";
import DocumentTitle from "../components/DocumentTitle";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, error, loginWithEmail, loginWithGoogle } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginWithEmail(email, password);
    };

    return (
        <>
            <DocumentTitle title="Login" />
            <AuthLayout
                title="Login"
                subtitle="Selamat datang kembali! Masuk untuk melanjutkan"
            >
                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        icon={<Mail size={18} />}
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        disabled={loading}
                        required
                    />

                    <PasswordInput
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password"
                        disabled={loading}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Loading...</span>
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <AuthDivider />

                {/* Google Login */}
                <SocialButton
                    icon={
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    }
                    text="Login dengan Google"
                    onClick={loginWithGoogle}
                    disabled={loading}
                />

                {/* Register Link */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    Belum punya akun?{" "}
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
                        Daftar sekarang
                    </Link>
                </p>
            </AuthLayout>
        </>
    );
}
