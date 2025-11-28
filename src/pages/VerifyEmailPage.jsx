// —————————————————————————————
// VerifyEmailPage.jsx (AUTO DETECT VERIFIED!)
// —————————————————————————————

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { MailCheck, RefreshCw, ArrowLeft, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import logo from "../logo/logo.png";
import DocumentTitle from "../components/DocumentTitle";

export default function VerifyEmailPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isVerified, setIsVerified] = useState(false); // ✅ State untuk cek verifikasi
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Ambil email dari query param & cek status verifikasi
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailParam = params.get("email") || "";
        setEmail(emailParam);

        // ✅ CEK APAKAH USER SUDAH VERIFIED
        const checkVerification = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (user) {
                    setUserEmail(user.email);

                    // Cek apakah email sudah terverifikasi
                    if (user.email_confirmed_at) {
                        console.log("✅ Email verified at:", user.email_confirmed_at);
                        setIsVerified(true); // User sudah verified
                    }
                }
            } catch (err) {
                console.error("Error checking verification:", err);
            }
        };

        checkVerification();
    }, [location.search]);

    const handleResend = async () => {
        setMessage("");
        setError("");

        if (!email) {
            setError("Email tidak valid. Silakan kembali dan daftar ulang.");
            return;
        }

        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/verify-email?email=${encodeURIComponent(email)}`
                },
            });
            setLoading(false);

            if (error) {
                setError(error.message || "Gagal mengirim ulang email verifikasi.");
            } else {
                setMessage("Email verifikasi telah dikirim ulang. Silakan cek inbox atau folder spam Anda.");
            }
        } catch (err) {
            setLoading(false);
            setError("Terjadi kesalahan. Silakan coba lagi.");
            console.error("Resend verify email error:", err);
        }
    };

    const handleGoToLogin = () => {
        // Logout dulu (clear session) biar user harus login manual
        supabase.auth.signOut();
        navigate("/login");
    };

    // ✅ JIKA SUDAH VERIFIED, TAMPILKAN SUCCESS PAGE
    if (isVerified) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8">
                <DocumentTitle title="Email Verification" />
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative w-full max-w-lg">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 shadow-xl mb-4 overflow-hidden">
                            <img
                                src={logo}
                                alt="Job Tracker Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                            Job Tracker
                        </h1>
                    </div>

                    {/* Success Card */}
                    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-center">

                        {/* Success Icon */}
                        <div className="flex justify-center mb-6 animate-scaleIn">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-green-400" />
                                </div>
                                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                            </div>
                        </div>

                        {/* Main Message */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            Email Berhasil Diverifikasi! 🎉
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base mb-6">
                            Akun kamu sudah aktif dan siap digunakan.
                        </p>

                        {/* Email Display */}
                        {userEmail && (
                            <div className="mb-6 px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600">
                                <p className="text-xs text-gray-400 mb-1">Email Terverifikasi</p>
                                <p className="text-white font-medium">{userEmail}</p>
                            </div>
                        )}

                        {/* Info Box */}
                        <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <p className="text-blue-300 text-sm">
                                Sekarang kamu bisa login dan mulai melacak semua lamaran kerja dengan mudah! 🚀
                            </p>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleGoToLogin}
                            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Login Sekarang
                            <ArrowRight size={20} />
                        </button>

                        {/* Additional Info */}
                        <p className="mt-6 text-gray-500 text-xs sm:text-sm">
                            Tips: Bookmark halaman ini untuk akses cepat ke Job Tracker 📌
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Job Tracker v1.0 • Lacak lamaran, raih pekerjaanmu 💼
                        </p>
                    </div>
                </div>

                {/* Animations */}
                <style>{`
                    @keyframes scaleIn {
                        0% {
                            opacity: 0;
                            transform: scale(0.5);
                        }
                        50% {
                            transform: scale(1.1);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    .animate-scaleIn {
                        animation: scaleIn 0.5s ease-out;
                    }
                `}</style>
            </div>
        );
    }

    // ✅ JIKA BELUM VERIFIED, TAMPILKAN HALAMAN NORMAL (CEK EMAIL)
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-lg">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl mb-4 overflow-hidden">
                        <img
                            src={logo}
                            alt="Job Tracker Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Verifikasi Email
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Satu langkah lagi sebelum mulai melacak lamaran kerja kamu. 🚀
                    </p>
                </div>

                {/* Card */}
                <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                            <MailCheck className="w-7 h-7 text-green-400" />
                        </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Cek Email Kamu
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base mb-6">
                        Kami telah mengirimkan link verifikasi ke email yang kamu daftarkan.
                        Klik link tersebut untuk mengaktifkan akun sebelum login.
                    </p>

                    {/* Email Display */}
                    <div className={`px-4 py-3 rounded-xl border-2 mb-4 text-sm sm:text-base ${email
                        ? "border-gray-600 bg-gray-800/60 text-gray-200"
                        : "border-red-500/60 bg-red-500/10 text-red-300"
                        }`}>
                        {email || "Email tidak ditemukan. Silakan kembali ke halaman register."}
                    </div>

                    {/* Status Messages */}
                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                            {message}
                        </div>
                    )}

                    {/* Resend Button */}
                    <button
                        onClick={handleResend}
                        disabled={loading || !email}
                        className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base transition-all ${loading || !email
                            ? "bg-gray-600 cursor-not-allowed text-gray-300"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105"
                            }`}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Mengirim...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={18} />
                                Kirim Ulang Email Verifikasi
                            </>
                        )}
                    </button>

                    {/* Back to Login */}
                    <button
                        onClick={() => navigate("/login")}
                        className="mt-6 inline-flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm sm:text-base transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Kembali ke Login
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Tidak menerima email? Cek folder spam atau coba kirim ulang.
                    </p>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
