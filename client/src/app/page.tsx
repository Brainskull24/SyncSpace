"use client";

import Footer from "@/components/home-page/Footer";
import Benifits from "@/components/home-page/Benifits";
import Roles from "@/components/home-page/Roles";
import Features from "@/components/home-page/Features";
import HeroSection from "@/components/home-page/HeroSection";
import Header from "@/components/home-page/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header & Navigation */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* User Roles Section */}
      <Roles />

      {/* Benefits Section */}
      <Benifits />

      <Footer />
    </div>
  );
}
