// —————————————————————————————
// components/dashboard/JobCard.jsx
// MODERN + DETAIL + FIX EXPIRED
// —————————————————————————————

import { useState } from "react";
import {
    Calendar,
    MapPin,
    Briefcase,
    Edit,
    Trash2,
    Flag,
    Banknote,
    FileText,
    Clock,
    Eye,
} from "lucide-react";

export default function JobCard({
    job,
    expired,
    dark,
    onEdit,
    onDelete,
    onViewDetail,
}) {
    const [showDetails, setShowDetails] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getDaysRemaining = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const truncateText = (text, maxLength = 50) => {
        if (!text) return "";
        const trimmed = text.trim();
        if (trimmed.length <= maxLength) return trimmed;
        return trimmed.substring(0, maxLength) + "...";
    };

    const daysLeft = getDaysRemaining(job.expires_at);
    const priority = job.priority || "medium";

    const priorityConfigs = {
        high: {
            icon: "🔴",
            label: "Tinggi",
            bgClass: dark ? "bg-red-500/10" : "bg-red-50",
            textClass: dark ? "text-red-400" : "text-red-600",
            borderClass: "border-red-500/30",
        },
        medium: {
            icon: "🟡",
            label: "Sedang",
            bgClass: dark ? "bg-yellow-500/10" : "bg-yellow-50",
            textClass: dark ? "text-yellow-400" : "text-yellow-600",
            borderClass: "border-yellow-500/30",
        },
        low: {
            icon: "🟢",
            label: "Rendah",
            bgClass: dark ? "bg-green-500/10" : "bg-green-50",
            textClass: dark ? "text-green-400" : "text-green-600",
            borderClass: "border-green-500/30",
        },
    };

    const pConf = priorityConfigs[priority] || priorityConfigs.medium;
    const hasSalary = job.salary && job.salary !== "-";
    const hasDetails = job.job_details && job.job_details !== "-";

    return (
        <div
            className={`group relative rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${expired
                    ? dark
                        ? "bg-gray-900/50 border-red-500/20"
                        : "bg-gray-50 border-red-200"
                    : dark
                        ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                }`}
        >
            {/* Top Color Bar */}
            <div
                className={`h-2 ${expired
                        ? "bg-red-500"
                        : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    }`}
            />

            {/* Header */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                        <h3
                            className={`text-lg font-bold mb-1 line-clamp-1 ${dark ? "text-white" : "text-gray-900"
                                }`}
                            title={job.company}
                        >
                            {job.company}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${pConf.bgClass} ${pConf.textClass} border ${pConf.borderClass}`}
                            >
                                <span>{pConf.icon}</span>
                                {pConf.label}
                            </span>
                            <span
                                className={`px-2 py-1 rounded-full text-[10px] font-semibold ${expired
                                        ? dark
                                            ? "bg-red-500/20 text-red-300 border border-red-500/40"
                                            : "bg-red-100 text-red-700 border border-red-300"
                                        : dark
                                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                            : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                    }`}
                            >
                                {expired ? "❌ Expired" : "✅ Aktif"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Job Title */}
                <div
                    className={`mb-4 p-3 rounded-xl ${dark
                            ? "bg-blue-500/10 border border-blue-500/20"
                            : "bg-blue-50 border border-blue-200"
                        }`}
                >
                    <div className="flex items-start gap-2">
                        <Briefcase
                            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${dark ? "text-blue-400" : "text-blue-600"
                                }`}
                        />
                        <div className="flex-1 min-w-0">
                            <p
                                className={`font-semibold text-sm leading-snug ${dark ? "text-blue-300" : "text-blue-700"
                                    }`}
                                title={job.title}
                            >
                                {truncateText(job.title, 60)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info list */}
                <div className="space-y-2.5 mb-4">
                    <InfoRow
                        icon={<MapPin className="w-4 h-4" />}
                        label="Lokasi"
                        value={job.location}
                        dark={dark}
                    />

                    {hasSalary && (
                        <InfoRow
                            icon={<Banknote className="w-4 h-4" />}
                            label="Gaji"
                            value={job.salary}
                            dark={dark}
                            highlight
                        />
                    )}

                    <InfoRow
                        icon={<Calendar className="w-4 h-4" />}
                        label="Dibuat"
                        value={formatDate(job.created_at)}
                        dark={dark}
                    />

                    {/* Selalu ada, supaya tinggi kartu konsisten */}
                    <div
                        className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${expired
                                ? dark
                                    ? "bg-red-500/10 border border-red-500/30 text-red-300"
                                    : "bg-red-50 border border-red-200 text-red-700"
                                : daysLeft <= 7
                                    ? dark
                                        ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300"
                                        : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                                    : dark
                                        ? "bg-gray-800 border border-gray-700 text-gray-300"
                                        : "bg-gray-100 border border-gray-200 text-gray-600"
                            }`}
                    >
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">
                            {expired
                                ? "Sudah kadaluarsa"
                                : daysLeft <= 0
                                    ? "⚠️ Berakhir hari ini"
                                    : `${daysLeft} hari lagi`}
                        </span>
                    </div>
                </div>

                {/* Short detail preview */}
                {hasDetails && (
                    <div
                        className={`mb-4 px-3 py-2 rounded-lg text-[11px] leading-snug ${dark ? "bg-gray-800/60 text-gray-300" : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        <span className="font-semibold mr-1">Detail:</span>
                        <span>{truncateText(job.job_details, 80)}</span>
                    </div>
                )}

                {/* Keterangan */}
                <div
                    className={`p-3 rounded-xl border ${expired
                            ? dark
                                ? "bg-red-500/5 border-red-500/30 text-red-300"
                                : "bg-red-50 border-red-200 text-red-700"
                            : dark
                                ? "bg-purple-500/5 border-purple-500/30 text-purple-200"
                                : "bg-purple-50 border-purple-200 text-purple-700"
                        }`}
                >
                    <p className="text-[11px] font-bold mb-1 uppercase tracking-wide">
                        {expired ? "📛 Status" : "📝 Keterangan"}
                    </p>
                    <p className="text-xs leading-relaxed line-clamp-2">
                        {expired ? "Lamaran sudah tidak aktif" : job.keterangan || "Sedang Di Review"}
                    </p>
                </div>
            </div>

            {/* Footer: Detail / Edit / Hapus */}
            <div
                className={`grid grid-cols-3 gap-2 p-4 border-t ${dark ? "bg-gray-900/80 border-gray-700" : "bg-gray-50 border-gray-200"
                    }`}
            >
                <button
                    onClick={() => onViewDetail?.(job)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-sm transition-all ${dark
                            ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300"
                            : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                        } hover:scale-105 active:scale-95`}
                >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Detail</span>
                </button>

                <button
                    onClick={onEdit}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-sm transition-all ${dark
                            ? "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300"
                            : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                        } hover:scale-105 active:scale-95`}
                >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                </button>

                <button
                    onClick={onDelete}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-semibold text-sm transition-all ${dark
                            ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300"
                            : "bg-rose-100 hover:bg-rose-200 text-rose-700"
                        } hover:scale-105 active:scale-95`}
                >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Hapus</span>
                </button>
            </div>
        </div>
    );
}

function InfoRow({ icon, label, value, dark, highlight }) {
    return (
        <div
            className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${highlight
                    ? dark
                        ? "bg-green-500/10 border border-green-500/30"
                        : "bg-green-50 border border-green-200"
                    : dark
                        ? "bg-gray-800/50"
                        : "bg-gray-100"
                }`}
        >
            <span className={dark ? "text-gray-400" : "text-gray-500"}>{icon}</span>
            <span
                className={`font-medium ${dark ? "text-gray-400" : "text-gray-500"
                    }`}
            >
                {label}:
            </span>
            <span
                className={`flex-1 font-semibold truncate ${highlight
                        ? dark
                            ? "text-green-300"
                            : "text-green-700"
                        : dark
                            ? "text-gray-200"
                            : "text-gray-700"
                    }`}
                title={value}
            >
                {value}
            </span>
        </div>
    );
}
