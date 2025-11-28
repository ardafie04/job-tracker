// —————————————————————————————
// components/legal/LegalLayout.jsx
// —————————————————————————————

import PublicNavbar from "../PublicNavbar";
import PublicFooter from "../PublicFooter";

export default function LegalLayout({ children, currentPage }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar */}
            <PublicNavbar currentPage={currentPage} />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {children}
            </div>

            {/* Footer */}
            <PublicFooter />
        </div>
    );
}
