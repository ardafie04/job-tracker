// —————————————————————————————
// src/components/dashboard/EditModal.jsx
// —————————————————————————————

import {
    X,
    Save,
    Building2,
    MapPin,
    Briefcase,
    Calendar,
    FileText,
    Flag,
    Banknote,
} from "lucide-react";

export default function EditModal({ job, dark, onClose, onSave, onChange }) {
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const handleCreatedDateChange = (e) => {
        const newDate = e.target.value;
        const iso = new Date(newDate).toISOString();
        onChange("created_at", iso);

        const expiry = new Date(newDate);
        expiry.setDate(expiry.getDate() + 30);
        onChange("expires_at", expiry.toISOString());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div
                className={`w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50 sticky top-0 bg-inherit z-10">
                    <h3 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                        Edit Lamaran
                    </h3>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-lg transition-colors ${dark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    {/* Perusahaan + Lokasi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            icon={<Building2 size={18} />}
                            label="Perusahaan"
                            type="text"
                            value={job.company || ""}
                            onChange={(e) => onChange("company", e.target.value)}
                            dark={dark}
                        />

                        <FormField
                            icon={<MapPin size={18} />}
                            label="Lokasi"
                            type="text"
                            value={job.location || ""}
                            onChange={(e) => onChange("location", e.target.value)}
                            dark={dark}
                        />
                    </div>

                    {/* Posisi */}
                    <FormField
                        icon={<Briefcase size={18} />}
                        label="Posisi"
                        type="text"
                        value={job.title || ""}
                        onChange={(e) => onChange("title", e.target.value)}
                        dark={dark}
                    />

                    {/* Gaji + Prioritas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* ✅ Gaji */}
                        <FormField
                            icon={<Banknote size={18} />}
                            label="Gaji (Opsional)"
                            type="text"
                            value={job.salary || ""}              // PASTIKAN pakai salary dari job
                            onChange={(e) => onChange("salary", e.target.value)}
                            dark={dark}
                            placeholder="Misal: Rp 5-7 juta"
                        />

                        {/* ✅ Prioritas */}
                        <div>
                            <label
                                className={`block text-sm font-semibold mb-2 ${dark ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                Prioritas
                            </label>
                            <div className="relative">
                                <div
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${dark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    <Flag size={18} />
                                </div>
                                <select
                                    value={job.priority || "medium"}
                                    onChange={(e) => onChange("priority", e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm transition-all ${dark
                                            ? "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-400"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                >
                                    <option value="high">Tinggi</option>
                                    <option value="medium">Sedang</option>
                                    <option value="low">Rendah</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tanggal-tanggal */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                            icon={<Calendar size={18} />}
                            label="Tanggal Dibuat"
                            type="date"
                            value={formatDateForInput(job.created_at)}
                            onChange={handleCreatedDateChange}
                            dark={dark}
                        />

                        <FormField
                            icon={<Calendar size={18} />}
                            label="Tanggal Kadaluarsa"
                            type="date"
                            value={formatDateForInput(job.expires_at)}
                            onChange={(e) =>
                                onChange("expires_at", new Date(e.target.value).toISOString())
                            }
                            dark={dark}
                        />

                        <FormField
                            icon={<Calendar size={18} />}
                            label="Tanggal Follow-up"
                            type="date"
                            value={formatDateForInput(job.follow_up_at)}
                            onChange={(e) =>
                                onChange("follow_up_at", new Date(e.target.value).toISOString())
                            }
                            dark={dark}
                        />
                    </div>

                    {/* ✅ Detail Pekerjaan */}
                    <LabeledTextarea
                        icon={<FileText size={18} />}
                        label="Detail Pekerjaan (Opsional)"
                        value={job.job_details || ""}
                        onChange={(e) => onChange("job_details", e.target.value)}
                        placeholder="Deskripsi pekerjaan, requirement, benefits..."
                        rows={3}
                        dark={dark}
                    />

                    {/* ✅ Keterangan Status */}
                    <LabeledTextarea
                        icon={<FileText size={18} />}
                        label="Keterangan Status (Opsional)"
                        value={job.keterangan || ""}
                        onChange={(e) => onChange("keterangan", e.target.value)}
                        placeholder="Misal: Interview tanggal 10 Des, sudah kirim follow-up email..."
                        rows={2}
                        dark={dark}
                    />
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-700/50 sticky bottom-0 bg-inherit">
                    <button
                        onClick={onClose}
                        className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${dark
                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                            }`}
                    >
                        Batal
                    </button>
                    <button
                        onClick={onSave}
                        className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                        <Save size={18} />
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}

function FormField({ icon, label, type, value, onChange, dark, placeholder }) {
    return (
        <div>
            <label
                className={`block text-sm font-semibold mb-2 ${dark ? "text-gray-300" : "text-gray-700"
                    }`}
            >
                {label}
            </label>
            <div className="relative">
                <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${dark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    {icon}
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all ${dark
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
            </div>
        </div>
    );
}

function LabeledTextarea({ icon, label, value, onChange, placeholder, rows, dark }) {
    return (
        <div>
            <label
                className={`block text-sm font-semibold mb-2 ${dark ? "text-gray-300" : "text-gray-700"
                    }`}
            >
                {label}
            </label>
            <div className="relative">
                <div
                    className={`absolute left-3 top-3 ${dark ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    {icon}
                </div>
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all resize-none ${dark
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
            </div>
        </div>
    );
}
