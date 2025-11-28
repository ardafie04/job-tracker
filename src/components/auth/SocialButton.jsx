// —————————————————————————————
// components/auth/SocialButton.jsx
// —————————————————————————————

export default function SocialButton({ icon, text, onClick, disabled }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
        >
            {icon}
            <span>{text}</span>
        </button>
    );
}
