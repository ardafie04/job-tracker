// —————————————————————————————
// components/dashboard/DeleteModal.jsx
// —————————————————————————————

import { AlertTriangle, X } from "lucide-react";

export default function DeleteModal({ dark, onClose, onDelete }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-md rounded-2xl shadow-2xl ${dark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? "bg-red-500/20" : "bg-red-100"
                            }`}>
                            <AlertTriangle className={dark ? "text-red-400" : "text-red-600"} size={20} />
                        </div>
                        <h3 className={`text-xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                            Hapus Lamaran
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-lg transition-colors ${dark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className={`text-base ${dark ? "text-gray-300" : "text-gray-700"}`}>
                        Apakah Anda yakin ingin menghapus lamaran ini?
                        <span className="font-semibold"> Tindakan ini tidak dapat dibatalkan.</span>
                    </p>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-700/50">
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
                        onClick={onDelete}
                        className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all hover:scale-105 shadow-lg"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
