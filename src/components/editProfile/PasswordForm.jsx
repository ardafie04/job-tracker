// —————————————————————————————
// components/editProfile/PasswordForm.jsx
// —————————————————————————————

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordForm({ darkMode, saving, onSubmit }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await onSubmit(oldPassword, newPassword, confirmPassword);

        if (result?.success) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div className={`p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-sm ${darkMode
                ? "bg-gray-800/50 border border-gray-700"
                : "bg-white/80 border border-gray-200"
            }`}>
            <h2 className={`text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"
                }`}>
                <Lock size={24} />
                Ubah Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Old Password */}
                <PasswordInput
                    label="Password Lama *"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Masukkan password lama"
                    show={showOldPassword}
                    onToggle={() => setShowOldPassword(!showOldPassword)}
                    disabled={saving}
                    darkMode={darkMode}
                    hint="Untuk keamanan, verifikasi password lama Anda"
                />

                {/* New Password */}
                <PasswordInput
                    label="Password Baru *"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Masukkan password baru"
                    show={showNewPassword}
                    onToggle={() => setShowNewPassword(!showNewPassword)}
                    disabled={saving}
                    darkMode={darkMode}
                    hint="Minimal 6 karakter"
                />

                {/* Confirm Password */}
                <PasswordInput
                    label="Konfirmasi Password Baru *"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Konfirmasi password baru"
                    show={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={saving}
                    darkMode={darkMode}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={saving}
                    className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2 ${saving
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105"
                        } text-white`}
                >
                    {saving ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Memproses...
                        </>
                    ) : (
                        <>
                            <Lock size={20} />
                            Update Password
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

function PasswordInput({ label, value, onChange, placeholder, show, onToggle, disabled, darkMode, hint }) {
    return (
        <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                {label}
            </label>
            <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                    <Lock size={18} />
                </div>
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all ${darkMode
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                        } focus:outline-none`}
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {hint && (
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    {hint}
                </p>
            )}
        </div>
    );
}
