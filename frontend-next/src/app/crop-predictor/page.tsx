import type { Metadata } from 'next';
import CropPredictorClient from './CropPredictorClient';

export const metadata: Metadata = {
  title: 'AI Crop Yield Prediction Online | फसल चयन',
  description: 'Input Nitrogen, Phosphorus, Potassium, temperature, humidity, pH, and rainfall to let our Machine Learning models predict the best crop for your farm.',
  alternates: {
    canonical: '/crop-predictor',
  },
  openGraph: {
    title: 'AI Crop Yield Prediction Online | फसल चयन',
    description: 'Input Nitrogen, Phosphorus, Potassium, temperature, humidity, pH, and rainfall to let our Machine Learning models predict the best crop for your farm.',
    url: '/crop-predictor',
    type: 'website',
  },
};

export default function CropPredictorPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "KisaanBuddy AI Crop Predictor",
    "url": "https://kisaanbuddy.com/crop-predictor",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "description": "AI-powered Crop Selection Tool. Enter your N-P-K soil values, pH, temperature, and rainfall parameters to predict the most profitable crop for your farmland."
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <CropPredictorClient />
    </div>
  );
}
