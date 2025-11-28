// —————————————————————————————
// components/auth/PasswordInput.jsx
// —————————————————————————————

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
    label,
    value,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    showStrength = false
}) {
    const [show, setShow] = useState(false);

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, text: "", color: "" };

        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        if (strength <= 2) return { strength, text: "Lemah", color: "text-red-400" };
        if (strength <= 3) return { strength, text: "Sedang", color: "text-yellow-400" };
        return { strength, text: "Kuat", color: "text-green-400" };
    };

    const strength = showStrength ? getPasswordStrength(value) : null;

    return (
        <div>
            {label && (
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {label} {required && <span className="text-red-400">*</span>}
                </label>
            )}
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                </div>
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-700/50 border-2 border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {showStrength && value && (
                <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all ${strength.strength <= 2 ? 'bg-red-500' :
                                    strength.strength <= 3 ? 'bg-yellow-500' :
                                        'bg-green-500'
                                }`}
                            style={{ width: `${(strength.strength / 5) * 100}%` }}
                        />
                    </div>
                    <span className={`text-xs font-semibold ${strength.color}`}>
                        {strength.text}
                    </span>
                </div>
            )}
        </div>
    );
}
