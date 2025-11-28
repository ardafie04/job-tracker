// —————————————————————————————
// hooks/useContactForm.js
// —————————————————————————————

import { useState } from 'react';

export function useContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const validateForm = () => {
        if (!name.trim() || !email.trim() || !message.trim()) {
            setError("Semua field harus diisi!");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Format email tidak valid!");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Kirim email menggunakan mailto
        const subject = `[Job Tracker Contact] Pesan dari ${name}`;
        const body = `Nama: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0APesan:%0D%0A${message}`;

        window.location.href = `mailto:ardafie04@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        setLoading(false);
        setSuccess(true);

        // Clear form
        setName("");
        setEmail("");
        setMessage("");

        setTimeout(() => setSuccess(false), 5000);
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setMessage("");
        setError("");
        setSuccess(false);
    };

    return {
        name,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        loading,
        success,
        error,
        handleSubmit,
        clearForm
    };
}
