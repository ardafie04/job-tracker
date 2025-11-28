// —————————————————————————————
// EditProfile.jsx (CLEAN & MODULAR)
// —————————————————————————————

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DocumentTitle from "../components/DocumentTitle";
import PageHeader from "../components/editProfile/PageHeader";
import ProfileForm from "../components/editProfile/ProfileForm";
import PasswordForm from "../components/editProfile/PasswordForm";
import { useEditProfile } from "../hooks/useEditProfile";

export default function EditProfile({ user: userProp }) {
    const {
        user,
        loading,
        saving,
        error,
        success,
        setError,
        setSuccess,
        updateProfile,
        updatePassword
    } = useEditProfile(userProp);

    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved !== null ? JSON.parse(saved) : true;
    });

    // Save darkMode
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode
                ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
                : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
            }`}>
            <DocumentTitle title="Edit Profile" />

            {/* Navbar */}
            {user && (
                <Navbar
                    user={user}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    currentPage="profile"
                />
            )}

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <PageHeader darkMode={darkMode} />

                {/* Error/Success Messages */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm animate-slideDown">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm animate-slideDown">
                        {success}
                    </div>
                )}

                {/* Profile Form */}
                {user && (
                    <ProfileForm
                        user={user}
                        darkMode={darkMode}
                        saving={saving}
                        onSubmit={updateProfile}
                    />
                )}

                {/* Password Form */}
                {user && (
                    <PasswordForm
                        darkMode={darkMode}
                        saving={saving}
                        onSubmit={updatePassword}
                    />
                )}
            </div>

            {/* Animations */}
            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
