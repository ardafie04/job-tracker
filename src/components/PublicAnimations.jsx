// —————————————————————————————
// PublicAnimations.jsx (REUSABLE ANIMATIONS)
// —————————————————————————————

export default function PublicAnimations() {
    return (
        <style>{`
            /* ========== FADE ANIMATIONS ========== */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            /* ========== SCALE ANIMATIONS ========== */
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes scaleInBounce {
                0% {
                    opacity: 0;
                    transform: scale(0.5);
                }
                50% {
                    transform: scale(1.05);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            /* ========== GRADIENT ANIMATION ========== */
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            /* ========== FLOATING ANIMATION ========== */
            @keyframes float {
                0%, 100% { 
                    transform: translateY(0px);
                }
                50% { 
                    transform: translateY(-10px);
                }
            }

            @keyframes floatSlow {
                0%, 100% { 
                    transform: translateY(0px);
                }
                50% { 
                    transform: translateY(-15px);
                }
            }

            /* ========== PULSE & GLOW ========== */
            @keyframes pulseGlow {
                0%, 100% { 
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
                }
                50% { 
                    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
                }
            }

            @keyframes pulseScale {
                0%, 100% { 
                    transform: scale(1);
                }
                50% { 
                    transform: scale(1.05);
                }
            }

            /* ========== ROTATE ANIMATION ========== */
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes rotateSlow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* ========== SLIDE ANIMATIONS ========== */
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            /* ========== BOUNCE ANIMATION ========== */
            @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-20px);
                }
            }

            /* ========== SHAKE ANIMATION ========== */
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }

            /* ========== UTILITY CLASSES ========== */
            .fade-in {
                animation: fadeIn 0.5s ease-out;
            }

            .fade-in-up {
                animation: fadeInUp 0.6s ease-out;
            }

            .fade-in-down {
                animation: fadeInDown 0.6s ease-out;
            }

            .fade-in-left {
                animation: fadeInLeft 0.6s ease-out;
            }

            .fade-in-right {
                animation: fadeInRight 0.6s ease-out;
            }

            .scale-in {
                animation: scaleIn 0.5s ease-out;
            }

            .scale-in-bounce {
                animation: scaleInBounce 0.6s ease-out;
            }

            .animate-gradient {
                background-size: 200% 200%;
                animation: gradient 3s ease infinite;
            }

            .animate-float {
                animation: float 3s ease-in-out infinite;
            }

            .animate-float-slow {
                animation: floatSlow 4s ease-in-out infinite;
            }

            .animate-pulse-glow {
                animation: pulseGlow 2s ease-in-out infinite;
            }

            .animate-pulse-scale {
                animation: pulseScale 2s ease-in-out infinite;
            }

            .animate-rotate {
                animation: rotate 2s linear infinite;
            }

            .animate-rotate-slow {
                animation: rotateSlow 10s linear infinite;
            }

            .animate-bounce {
                animation: bounce 2s ease-in-out infinite;
            }

            .animate-shake {
                animation: shake 0.5s ease-in-out;
            }

            .slide-in-left {
                animation: slideInLeft 0.5s ease-out;
            }

            .slide-in-right {
                animation: slideInRight 0.5s ease-out;
            }

            /* ========== ANIMATION DELAYS ========== */
            .delay-100 { animation-delay: 0.1s; }
            .delay-200 { animation-delay: 0.2s; }
            .delay-300 { animation-delay: 0.3s; }
            .delay-400 { animation-delay: 0.4s; }
            .delay-500 { animation-delay: 0.5s; }
            .delay-600 { animation-delay: 0.6s; }
            .delay-700 { animation-delay: 0.7s; }
            .delay-800 { animation-delay: 0.8s; }
            .delay-1000 { animation-delay: 1s; }

            /* ========== ANIMATION DURATIONS ========== */
            .duration-fast { animation-duration: 0.3s; }
            .duration-normal { animation-duration: 0.5s; }
            .duration-slow { animation-duration: 1s; }
            .duration-slower { animation-duration: 2s; }

            /* ========== HOVER ANIMATIONS ========== */
            .hover-lift {
                transition: transform 0.3s ease;
            }

            .hover-lift:hover {
                transform: translateY(-5px);
            }

            .hover-scale {
                transition: transform 0.3s ease;
            }

            .hover-scale:hover {
                transform: scale(1.05);
            }

            .hover-glow {
                transition: box-shadow 0.3s ease;
            }

            .hover-glow:hover {
                box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
            }

            /* ========== SMOOTH TRANSITIONS ========== */
            .transition-smooth {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .transition-bounce {
                transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            /* ========== PREVENT FLICKER ========== */
            .fade-in-up,
            .fade-in-down,
            .fade-in-left,
            .fade-in-right,
            .scale-in,
            .scale-in-bounce {
                animation-fill-mode: both;
            }

            /* Scroll offset untuk sticky navbar - RESPONSIVE */
.scroll-offset {
    scroll-margin-top: 70px; /* Mobile */
}

@media (min-width: 768px) {
    .scroll-offset {
        scroll-margin-top: 80px; /* Desktop */
    }
}

@media (min-width: 1024px) {
    .scroll-offset {
        scroll-margin-top: 90px; /* Large Desktop */
    }
}
        `}</style>
    );
}
