// —————————————————————————————
// components/contact/ContactForm.jsx
// —————————————————————————————

import { User, Mail, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function ContactForm({
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    loading,
    success,
    error,
    onSubmit
}) {
    return (
        <div className="p-6 sm:p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-white">Kirim Pesan</h2>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm flex items-center gap-2">
                    <CheckCircle size={18} />
                    Email client Anda akan terbuka. Silakan kirim pesan!
                </div>
            )}

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-5">
                {/* Name */}
                <FormField
                    icon={<User size={18} />}
                    label="Nama Lengkap *"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Anda"
                    disabled={loading}
                />

                {/* Email */}
                <FormField
                    icon={<Mail size={18} />}
                    label="Email *"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    disabled={loading}
                />

                {/* Message */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Pesan *
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                            <MessageSquare size={18} />
                        </div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tulis pesan Anda di sini..."
                            rows="6"
                            disabled={loading}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/50 border-2 border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2 ${loading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105"
                        } text-white`}
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Mengirim...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            Kirim Pesan
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

function FormField({ icon, label, type, value, onChange, placeholder, disabled }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/50 border-2 border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                />
            </div>
        </div>
    );
}
