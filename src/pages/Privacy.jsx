// —————————————————————————————
// Privacy.jsx (CLEAN & MODULAR)
// —————————————————————————————

import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";
import DocumentTitle from "../components/DocumentTitle";
import LegalLayout from "../components/legal/LegalLayout";
import LegalHeader from "../components/legal/LegalHeader";
import LegalSection from "../components/legal/LegalSection";

export default function Privacy() {
    return (
        <>
            <DocumentTitle title="Privacy Policy" />
            <LegalLayout currentPage="privacy">
                <LegalHeader
                    icon={<Shield className="w-10 h-10" />}
                    title="Kebijakan Privasi"
                    lastUpdated="28 November 2025"
                />

                <div className="space-y-8">
                    {/* Informasi yang Dikumpulkan */}
                    <LegalSection
                        icon={<Database className="w-6 h-6" />}
                        title="Informasi yang Kami Kumpulkan"
                    >
                        <p>Job Tracker mengumpulkan informasi berikut untuk memberikan layanan terbaik:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Informasi akun: Nama lengkap, email, dan username</li>
                            <li>Data lamaran: Perusahaan, posisi, lokasi, dan tanggal lamaran</li>
                            <li>Informasi perangkat: IP address, browser, dan sistem operasi</li>
                            <li>Cookie dan data penggunaan untuk meningkatkan pengalaman pengguna</li>
                        </ul>
                    </LegalSection>

                    {/* Penggunaan Informasi */}
                    <LegalSection
                        icon={<Lock className="w-6 h-6" />}
                        title="Bagaimana Kami Menggunakan Informasi"
                    >
                        <p>Data Anda digunakan untuk:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Menyediakan dan memelihara layanan Job Tracker</li>
                            <li>Mengamankan akun Anda dengan enkripsi tingkat enterprise</li>
                            <li>Mengirim notifikasi penting terkait akun dan layanan</li>
                            <li>Meningkatkan fitur dan performa aplikasi</li>
                            <li>Mencegah penyalahgunaan dan aktivitas mencurigakan</li>
                        </ul>
                    </LegalSection>

                    {/* Keamanan Data */}
                    <LegalSection
                        icon={<Eye className="w-6 h-6" />}
                        title="Keamanan Data"
                    >
                        <p>Kami sangat serius dalam melindungi data Anda:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Enkripsi end-to-end untuk semua data sensitif</li>
                            <li>Autentikasi dua faktor untuk keamanan ekstra</li>
                            <li>Server yang dilindungi dengan firewall dan SSL/TLS</li>
                            <li>Backup rutin untuk mencegah kehilangan data</li>
                            <li>Tim keamanan yang memantau aktivitas 24/7</li>
                        </ul>
                    </LegalSection>

                    {/* Hak Pengguna */}
                    <LegalSection
                        icon={<UserCheck className="w-6 h-6" />}
                        title="Hak Pengguna"
                    >
                        <p>Anda memiliki hak penuh atas data pribadi Anda:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Mengakses dan mengunduh data Anda kapan saja</li>
                            <li>Memperbarui atau menghapus informasi pribadi</li>
                            <li>Menonaktifkan atau menghapus akun secara permanen</li>
                            <li>Menolak penggunaan data untuk tujuan tertentu</li>
                            <li>Mengajukan keluhan terkait privasi data</li>
                        </ul>
                    </LegalSection>

                    {/* Perubahan Kebijakan */}
                    <LegalSection variant="highlight" title="Perubahan Kebijakan">
                        <p className="text-sm">
                            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diinformasikan melalui email atau notifikasi dalam aplikasi.
                        </p>
                    </LegalSection>

                    {/* Kontak */}
                    <LegalSection title="Hubungi Kami">
                        <p className="text-sm">
                            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi:
                        </p>
                        <a
                            href="mailto:ardafie04@gmail.com"
                            className="text-blue-400 hover:text-blue-300 font-semibold inline-block mt-2"
                        >
                            ardafie04@gmail.com
                        </a>
                    </LegalSection>
                </div>
            </LegalLayout>
        </>
    );
}
