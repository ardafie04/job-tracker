// —————————————————————————————
// components/contact/ContactInfo.jsx
// —————————————————————————————

import { useNavigate } from "react-router-dom";
import { Mail, Clock } from "lucide-react";

export default function ContactInfo() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Email Card */}
            <InfoCard
                icon={<Mail size={24} />}
                title="Email"
                content={
                    <>
                        <a
                            href="mailto:ardafie04@gmail.com"
                            className="text-green-400 hover:text-green-300 font-semibold text-lg"
                        >
                            ardafie04@gmail.com
                        </a>
                        <p className="text-gray-400 text-sm mt-2">
                            Kami akan merespons dalam 1-2 hari kerja
                        </p>
                    </>
                }
            />

            {/* Operating Hours Card */}
            <InfoCard
                icon={<Clock size={24} />}
                title="Jam Operasional"
                content={
                    <div className="space-y-2 text-gray-300 text-sm">
                        <p>Senin - Jumat: 09:00 - 17:00 WIB</p>
                        <p>Sabtu: 09:00 - 12:00 WIB</p>
                        <p>Minggu & Libur Nasional: Tutup</p>
                    </div>
                }
            />

            {/* FAQ Card */}
            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                <h3 className="text-lg font-bold mb-2 text-green-400">FAQ</h3>
                <p className="text-gray-300 text-sm">
                    Sebelum menghubungi kami, cek halaman{" "}
                    <button
                        onClick={() => navigate("/privacy")}
                        className="text-green-400 hover:text-green-300 font-semibold"
                    >
                        Privacy Policy
                    </button>
                    {" "}dan{" "}
                    <button
                        onClick={() => navigate("/terms")}
                        className="text-green-400 hover:text-green-300 font-semibold"
                    >
                        Terms & Conditions
                    </button>
                    {" "}untuk jawaban cepat.
                </p>
            </div>
        </div>
    );
}

function InfoCard({ icon, title, content }) {
    return (
        <div className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center text-white">
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
                    {content}
                </div>
            </div>
        </div>
    );
}
