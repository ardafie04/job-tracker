// —————————————————————————————
// components/contact/ContactHeader.jsx
// —————————————————————————————

import { Mail } from "lucide-react";

export default function ContactHeader() {
    return (
        <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center shadow-xl">
                <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">Hubungi Kami</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Ada pertanyaan, saran, atau masukan? Kami siap membantu Anda. Kirim pesan dan kami akan merespons secepat mungkin.
            </p>
        </div>
    );
}
