// —————————————————————————————
// components/legal/LegalHeader.jsx
// —————————————————————————————

export default function LegalHeader({ icon, title, lastUpdated }) {
    return (
        <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl">
                {icon}
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">{title}</h1>
            <p className="text-gray-400">Terakhir diperbarui: {lastUpdated}</p>
        </div>
    );
}
