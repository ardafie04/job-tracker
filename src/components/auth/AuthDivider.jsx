// —————————————————————————————
// components/auth/AuthDivider.jsx
// —————————————————————————————

export default function AuthDivider() {
    return (
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800/50 text-gray-400">atau</span>
            </div>
        </div>
    );
}
