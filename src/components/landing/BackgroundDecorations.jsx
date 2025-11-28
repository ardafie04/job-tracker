// —————————————————————————————
// components/landing/BackgroundDecorations.jsx
// —————————————————————————————

export default function BackgroundDecorations() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div
                className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '4s' }}
            ></div>
            <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '2s', animationDuration: '4s' }}
            ></div>
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-600/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '1s', animationDuration: '5s' }}
            ></div>
        </div>
    );
}
