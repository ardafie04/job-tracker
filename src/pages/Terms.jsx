// —————————————————————————————
// Terms.jsx (CLEAN & MODULAR)
// —————————————————————————————

import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import DocumentTitle from "../components/DocumentTitle";
import LegalLayout from "../components/legal/LegalLayout";
import LegalHeader from "../components/legal/LegalHeader";
import LegalSection from "../components/legal/LegalSection";

export default function Terms() {
    return (
        <>
            <DocumentTitle title="Terms & Conditions" />
            <LegalLayout currentPage="terms">
                <LegalHeader
                    icon={<FileText className="w-10 h-10" />}
                    title="Syarat & Ketentuan"
                    lastUpdated="28 November 2025"
                />

                <div className="space-y-8">
                    {/* Penerimaan Ketentuan */}
                    <LegalSection
                        icon={<CheckCircle className="w-6 h-6" />}
                        title="Penerimaan Ketentuan"
                    >
                        <p>
                            Dengan mengakses dan menggunakan Job Tracker, Anda setuju untuk terikat oleh syarat dan ketentuan ini.
                            Jika Anda tidak setuju, harap tidak menggunakan layanan kami.
                        </p>
                    </LegalSection>

                    {/* Penggunaan Layanan */}
                    <LegalSection
                        icon={<FileText className="w-6 h-6" />}
                        title="Penggunaan Layanan"
                    >
                        <p>Dengan menggunakan Job Tracker, Anda setuju untuk:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Memberikan informasi yang akurat dan terkini</li>
                            <li>Menjaga kerahasiaan akun dan password Anda</li>
                            <li>Menggunakan layanan hanya untuk tujuan yang sah dan legal</li>
                            <li>Tidak menyalahgunakan atau mengganggu layanan</li>
                            <li>Bertanggung jawab atas semua aktivitas dalam akun Anda</li>
                        </ul>
                    </LegalSection>

                    {/* Larangan */}
                    <LegalSection
                        icon={<XCircle className="w-6 h-6" />}
                        title="Larangan Penggunaan"
                    >
                        <p>Anda dilarang untuk:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Menggunakan layanan untuk aktivitas ilegal atau penipuan</li>
                            <li>Mengunggah konten yang melanggar hak cipta atau hak kekayaan intelektual</li>
                            <li>Menyebarkan malware, virus, atau kode berbahaya lainnya</li>
                            <li>Mencoba mengakses akun pengguna lain tanpa izin</li>
                            <li>Menggunakan bot atau scraping untuk mengumpulkan data</li>
                            <li>Menyalahgunakan sistem untuk spam atau promosi tidak sah</li>
                        </ul>
                    </LegalSection>

                    {/* Batasan Tanggung Jawab */}
                    <LegalSection
                        icon={<AlertCircle className="w-6 h-6" />}
                        title="Batasan Tanggung Jawab"
                    >
                        <p>Job Tracker menyediakan layanan "sebagaimana adanya":</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan layanan</li>
                            <li>Layanan dapat mengalami gangguan atau downtime tanpa pemberitahuan</li>
                            <li>Kami tidak menjamin keakuratan informasi yang diberikan pengguna</li>
                            <li>Pengguna bertanggung jawab penuh atas keputusan berdasarkan data di aplikasi</li>
                        </ul>
                    </LegalSection>

                    {/* Hak Kekayaan Intelektual */}
                    <LegalSection title="Hak Kekayaan Intelektual">
                        <p>
                            Semua konten, desain, logo, dan fitur Job Tracker dilindungi oleh hak cipta dan merek dagang.
                            Anda tidak diizinkan untuk menyalin, memodifikasi, atau mendistribusikan materi kami tanpa izin tertulis.
                        </p>
                    </LegalSection>

                    {/* Penghentian Akun */}
                    <LegalSection title="Penghentian Akun">
                        <p>Kami berhak untuk menangguhkan atau menghapus akun Anda jika:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Anda melanggar syarat dan ketentuan ini</li>
                            <li>Aktivitas akun dianggap mencurigakan atau berbahaya</li>
                            <li>Anda meminta penghapusan akun secara permanen</li>
                        </ul>
                    </LegalSection>

                    {/* Perubahan Ketentuan */}
                    <LegalSection variant="warning" title="Perubahan Ketentuan">
                        <p className="text-sm">
                            Job Tracker dapat mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan.
                            Penggunaan berkelanjutan Anda menandakan penerimaan terhadap perubahan tersebut.
                        </p>
                    </LegalSection>

                    {/* Hukum yang Berlaku */}
                    <LegalSection title="Hukum yang Berlaku">
                        <p className="text-sm">
                            Syarat dan ketentuan ini diatur oleh hukum Indonesia. Setiap sengketa akan diselesaikan melalui pengadilan yang berwenang.
                        </p>
                    </LegalSection>

                    {/* Kontak */}
                    <LegalSection title="Hubungi Kami">
                        <p className="text-sm">
                            Untuk pertanyaan tentang syarat dan ketentuan, hubungi:
                        </p>
                        <a
                            href="mailto:ardafie04@gmail.com"
                            className="text-purple-400 hover:text-purple-300 font-semibold inline-block mt-2"
                        >
                            ardafie04@gmail.com
                        </a>
                    </LegalSection>
                </div>
            </LegalLayout>
        </>
    );
}
