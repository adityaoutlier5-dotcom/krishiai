import type { Metadata } from 'next';
import DiseaseClient from './DiseaseClient';

export const metadata: Metadata = {
  title: 'Crop Leaf Disease Detection Online | फसल की बीमारी की पहचान',
  description: 'Upload a photo of your crop leaf and get instant diagnosis, organic remedies, and chemical treatment guidelines.',
  alternates: {
    canonical: '/disease',
  },
  openGraph: {
    title: 'Crop Leaf Disease Detection Online | फसल की बीमारी की पहचान',
    description: 'Upload a photo of your crop leaf and get instant diagnosis, organic remedies, and chemical treatment guidelines.',
    url: '/disease',
    type: 'website',
  }
};

export default function DiseasePage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "KisaanBuddy AI Crop Leaf Disease Detector",
    "url": "https://kisaanbuddy.com/disease",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5. Requires camera access.",
    "description": "AI-powered Crop Disease Detection Tool. Upload or capture photos of damaged crop leaves to instantly diagnose plant pathogens and receive remedy options."
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <DiseaseClient />
    </div>
  );
}
