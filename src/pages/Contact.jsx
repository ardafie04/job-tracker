// —————————————————————————————
// Contact.jsx (CLEAN & MODULAR)
// —————————————————————————————

import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";
import DocumentTitle from "../components/DocumentTitle";
import ContactHeader from "../components/contact/ContactHeader";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import { useContactForm } from "../hooks/useContactForm";

export default function Contact() {
    const {
        name,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        loading,
        success,
        error,
        handleSubmit
    } = useContactForm();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <DocumentTitle title="Contact Us" />

            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar */}
            <PublicNavbar currentPage="contact" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <ContactHeader />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <ContactForm
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        message={message}
                        setMessage={setMessage}
                        loading={loading}
                        success={success}
                        error={error}
                        onSubmit={handleSubmit}
                    />

                    {/* Contact Info */}
                    <ContactInfo />
                </div>
            </div>

            {/* Footer */}
            <PublicFooter />
        </div>
    );
}
