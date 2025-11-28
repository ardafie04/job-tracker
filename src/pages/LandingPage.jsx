// —————————————————————————————
// LandingPage.jsx (CLEAN & MODULAR)
// —————————————————————————————

import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";
import PublicAnimations from "../components/PublicAnimations";
import DocumentTitle from "../components/DocumentTitle";
import BackgroundDecorations from "../components/landing/BackgroundDecorations";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <PublicAnimations />
            <BackgroundDecorations />

            <PublicNavbar currentPage="home" />

            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <CTASection />

            <PublicFooter />
        </div>
    );
}
