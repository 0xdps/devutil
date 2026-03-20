import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function PWAUpdatePrompt() {
    const [show, setShow] = useState(false);

    const {
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // Check for updates every hour
            if (r) {
                setInterval(() => r.update(), 60 * 60 * 1000);
            }
        },
    });

    useEffect(() => {
        if (needRefresh) setShow(true);
    }, [needRefresh]);

    if (!show) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-900 border border-blue-500 text-white px-5 py-3 rounded-xl shadow-2xl text-sm">
            <span>A new version is available!</span>
            <button
                onClick={() => updateServiceWorker(true)}
                className="bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
                Update
            </button>
            <button
                onClick={() => setShow(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Dismiss"
            >
                ✕
            </button>
        </div>
    );
}
