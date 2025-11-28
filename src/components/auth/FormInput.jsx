// —————————————————————————————
// components/auth/FormInput.jsx
// —————————————————————————————

export default function FormInput({
    icon,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    disabled = false,
    required = false
}) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {label} {required && <span className="text-red-400">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl bg-gray-700/50 border-2 border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                />
            </div>
        </div>
    );
}
