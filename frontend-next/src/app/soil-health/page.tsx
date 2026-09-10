import type { Metadata } from 'next';
import SoilHealthClient from './SoilHealthClient';

export const metadata: Metadata = {
  title: 'Soil Health & Fertilizer Recommendation AI | मिट्टी परीक्षण',
  description: 'Enter your soil card parameters to receive a detailed soil health report, custom NPK fertilizer dosages, and organic amendments advice.',
  alternates: {
    canonical: '/soil-health',
  },
  openGraph: {
    title: 'Soil Health & Fertilizer Recommendation AI | मिट्टी परीक्षण',
    description: 'Enter your soil card parameters to receive a detailed soil health report, custom NPK fertilizer dosages, and organic amendments advice.',
    url: '/soil-health',
    type: 'website',
  },
};

export default function SoilHealthPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "KisaanBuddy AI Soil Health & Fertilizer Advisor",
    "url": "https://kisaanbuddy.com/soil-health",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "description": "AI-powered Soil Health Card Analyst. Enter your soil N-P-K nutrient values, organic carbon, and pH to receive custom scientific fertilizer recommendations and organic soil amendments advice."
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <SoilHealthClient />
    </div>
  );
}
