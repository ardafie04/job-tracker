// —————————————————————————————
// src/components/dashboard/DetailModal.jsx
// —————————————————————————————

import {
    X,
    Building2,
    MapPin,
    Briefcase,
    Calendar,
    Banknote,
    FileText,
    Flag,
    Edit,
    Trash2,
} from "lucide-react";

export default function DetailModal({ job, dark, onClose, onEdit, onDelete }) {
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const d = new Date(dateString);
        return d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const priorityLabel = {
        high: "Tinggi",
        medium: "Sedang",
        low: "Rendah",
    }[job.priority || "medium"];

    const isExpired = new Date(job.expires_at) < new Date();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
            <div
                className={`w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${dark ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"
                    }`}
            >
                {/* Header */}
                <div className="relative flex items-center justify-between p-5 border-b border-gray-200/60 dark:border-gray-700/60">
                    <div>
                        <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                            Detail Lamaran
                        </h3>
                        <p
                            className={`text-xs mt-1 ${dark ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Data hanya untuk dibaca. Edit lewat tombol Edit.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full transition-colors animate-float-x ${dark
                                ? "hover:bg-gray-800 text-gray-300"
                                : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-5 text-sm">
                    {/* Perusahaan + status */}
                    <div
                        className={`p-3 rounded-xl flex items-start justify-between gap-3 ${dark ? "bg-gray-800/70" : "bg-gray-50"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${dark ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"
                                    }`}
                            >
                                <Building2 size={22} />
                            </div>
                            <div>
                                <p
                                    className={`font-semibold ${dark ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    {job.company}
                                </p>
                                <p
                                    className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-600"
                                        }`}
                                >
                                    {job.title}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${dark
                                    ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                    }`}
                            >
                                Prioritas: {priorityLabel}
                            </span>
                            <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${isExpired
                                    ? dark
                                        ? "bg-red-500/15 text-red-300 border border-red-500/30"
                                        : "bg-red-50 text-red-700 border border-red-200"
                                    : dark
                                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    }`}
                            >
                                {isExpired ? "Expired" : "Aktif"}
                            </span>
                        </div>
                    </div>

                    {/* Info grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoItem
                            icon={<MapPin size={16} />}
                            label="Lokasi"
                            value={job.location || "-"}
                            dark={dark}
                        />
                        <InfoItem
                            icon={<Banknote size={16} />}
                            label="Gaji"
                            value={job.salary && job.salary !== "-" ? job.salary : "-"}
                            dark={dark}
                        />
                        <InfoItem
                            icon={<Calendar size={16} />}
                            label="Tanggal Dibuat"
                            value={formatDate(job.created_at)}
                            dark={dark}
                        />
                        <InfoItem
                            icon={<Calendar size={16} />}
                            label="Tanggal Kadaluarsa"
                            value={formatDate(job.expires_at)}
                            dark={dark}
                        />
                        <InfoItem
                            icon={<Calendar size={16} />}
                            label="Tanggal Follow-up"
                            value={job.follow_up_at ? formatDate(job.follow_up_at) : "-"}
                            dark={dark}
                        />
                        <InfoItem
                            icon={<Briefcase size={16} />}
                            label="Posisi"
                            value={job.title || "-"}
                            dark={dark}
                        />
                    </div>

                    {/* Detail pekerjaan */}
                    <SectionBox
                        icon={<FileText size={16} />}
                        title="Detail Pekerjaan"
                        subtitle="Deskripsi Pekerjaan:"
                        text={
                            job.job_details && job.job_details !== "-"
                                ? job.job_details
                                : "Belum ada detail pekerjaan."
                        }
                        dark={dark}
                    />

                    {/* Keterangan */}
                    <SectionBox
                        icon={<Flag size={16} />}
                        title="Keterangan / Status"
                        text={job.keterangan || "Sedang Di Review"}
                        dark={dark}
                    />
                </div>

                {/* Footer: Edit / Hapus / Tutup */}
                <div
                    className={`flex flex-col sm:flex-row gap-3 sm:gap-2 p-4 border-t ${dark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"
                        }`}
                >
                    <div className="flex-1 flex gap-2">
                        <button
                            onClick={onEdit}
                            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${dark
                                ? "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200"
                                : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                                }`}
                        >
                            <Edit size={16} />
                            Edit
                        </button>
                        <button
                            onClick={onDelete}
                            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${dark
                                ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-200"
                                : "bg-rose-100 hover:bg-rose-200 text-rose-700"
                                }`}
                        >
                            <Trash2 size={16} />
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon, label, value, dark }) {
    return (
        <div
            className={`flex items-start gap-2.5 p-3 rounded-xl ${dark ? "bg-gray-800/80" : "bg-gray-50"
                }`}
        >
            <div className={dark ? "text-gray-400 mt-0.5" : "text-gray-500 mt-0.5"}>
                {icon}
            </div>
            <div>
                <p
                    className={`text-[11px] font-semibold uppercase tracking-wide ${dark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    {label}
                </p>
                <p
                    className={`text-sm font-medium ${dark ? "text-gray-100" : "text-gray-900"
                        }`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

function SectionBox({ icon, title, subtitle, text, dark }) {
    return (
        <div
            className={`p-3 rounded-xl border ${dark
                ? "bg-gray-800/80 border-gray-700 text-gray-100"
                : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
        >
            <div className="flex items-center gap-2 mb-1.5">
                <div className={dark ? "text-gray-300" : "text-gray-600"}>{icon}</div>
                <p className="text-sm font-semibold">{title}</p>
            </div>
            {subtitle && (
                <p
                    className={`text-xs mb-1 ${dark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    {subtitle}
                </p>
            )}
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
        </div>
    );
}
