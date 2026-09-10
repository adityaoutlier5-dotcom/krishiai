'use client';

import Link from 'next/link';
import { 
  ArrowRight, Play, CheckCircle2, Sprout, Bug, 
  CloudSun, TrendingUp, FlaskConical, AlertTriangle, Sparkles,
  Layers, ShieldCheck, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-background py-16 md:py-24 border-b border-border/50">
      
      {/* ── BACKGROUND: Radiant Ambient Aura & Precision Tech Grid ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top radial ambient glow in emerald & gold */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[480px] bg-gradient-to-b from-emerald-500/15 via-amber-500/5 to-transparent blur-3xl opacity-90" />
        
        {/* Farmland subtle texture */}
        <div 
          className="absolute inset-0 bg-[url('/hero_farmer.png')] bg-cover bg-center opacity-[0.025] dark:opacity-[0.045] mix-blend-luminosity"
          style={{ filter: 'contrast(1.2) brightness(0.95)' }}
        />
        
        {/* High-tech grid pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:32px_32px]"
        />
        
        {/* Bottom smooth fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        
        {/* ── LEFT SIDE: Brand & Value Proposition ── */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
        >
          {/* Glowing Announcement Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-sm backdrop-blur-md select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold tracking-wide">KisaanBuddy</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">AI Farm Advisory</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-[1.08] tracking-tight text-foreground">
            {t('hero.title_line1')}<br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
              {t('hero.title_line2')} 🌾
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed font-medium">
            {t('hero.subtitle')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center justify-center gap-2.5 group text-sm font-bold h-12 px-8 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 active:scale-[0.98] transition-all duration-200">
                <span>{t('hero.start_free')}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/80 hover:bg-muted text-foreground font-semibold text-sm h-12 px-7 shadow-xs backdrop-blur-sm transition-all duration-200 active:scale-[0.98]">
                <Play className="h-3.5 w-3.5 fill-current text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t('hero.watch_demo')}</span>
              </button>
            </Link>
          </div>

          {/* Genuine Real Feature Badges (NO Fake Claims!) */}
          <div className="grid grid-cols-2 gap-3.5 pt-6 text-xs font-semibold text-muted-foreground max-w-lg w-full border-t border-border/60">
            <div className="flex items-center gap-2 justify-start">
              <div className="h-5 w-5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>10+ Regional Languages</span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <div className="h-5 w-5 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              </div>
              <span>Live eNAM Mandi Rates</span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <div className="h-5 w-5 rounded-full bg-rose-500/15 border border-rose-500/25 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
              </div>
              <span>Instant Disease Scanner</span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <div className="h-5 w-5 rounded-full bg-sky-500/15 border border-sky-500/25 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              </div>
              <span>Hyperlocal Weather Radar</span>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT SIDE: Tactile Agri-OS Dashboard Preview ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="lg:col-span-6 w-full relative"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-amber-500/10 to-teal-500/10 blur-xl opacity-75 pointer-events-none" />

          {/* OS Window Frame */}
          <div className="relative rounded-2xl border border-border/80 bg-card/90 dark:bg-card/70 backdrop-blur-xl shadow-2xl p-4 md:p-5 overflow-hidden flex flex-col gap-3.5 ring-1 ring-black/5 dark:ring-white/10">
            
            {/* Top Window Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] font-semibold text-muted-foreground/80 tracking-wide">
                  kisaanbuddy-os • live telemetry
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Models Online</span>
              </div>
            </div>

            {/* 2-Column Responsive Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              
              {/* 1. Crop Recommendation Card (Emerald Accent) */}
              <div className="rounded-xl border border-border/60 bg-background/80 dark:bg-background/50 p-3.5 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Sprout className="h-3.5 w-3.5" />
                    </div>
                    <span>{t('dashboard_mockup.crop_recommendation')}</span>
                  </span>
                  <span className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {t('dashboard_mockup.optimal')}
                  </span>
                </div>
                <div className="py-2.5">
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t('dashboard_mockup.recommended_crop')}</div>
                  <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 group-hover:translate-x-0.5 transition-transform">
                    {t('dashboard_mockup.basmati_rice')}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground bg-muted/30 px-2 py-1 rounded-lg">
                  <span>Soil Match: Sandy Loam</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">🌾 High Yield</span>
                </div>
              </div>

              {/* 2. Disease Detection Result (Rose Accent) */}
              <div className="rounded-xl border border-border/60 bg-background/80 dark:bg-background/50 p-3.5 flex flex-col justify-between hover:border-rose-500/40 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded-lg bg-rose-500/15 border border-rose-500/25 flex items-center justify-center text-rose-600 dark:text-rose-400">
                      <Bug className="h-3.5 w-3.5" />
                    </div>
                    <span>{t('dashboard_mockup.disease_scanner')}</span>
                  </span>
                  <span className="bg-rose-500/15 text-rose-700 dark:text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-rose-500/20">
                    {t('dashboard_mockup.alert')}
                  </span>
                </div>
                <div className="py-2 flex items-center gap-2.5">
                  <div className="relative h-10 w-10 rounded-lg overflow-hidden border border-border shrink-0 shadow-inner">
                    <img 
                      src="/hero_farmer.png" 
                      alt="Crop Leaf Scan" 
                      className="h-full w-full object-cover" 
                    />
                    <div className="absolute inset-0 border border-rose-500/60 rounded-lg bg-rose-500/10 pointer-events-none" />
                  </div>
                  <div>
                    <div className="text-[11px] text-foreground font-bold">{t('dashboard_mockup.early_blight_detected')}</div>
                    <div className="text-[9px] text-rose-600 dark:text-rose-400 font-semibold">Diagnosis: Potato Leaf</div>
                  </div>
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                  {t('dashboard_mockup.remedy_copper')}
                </div>
              </div>

              {/* 3. Soil Analysis Report (Teal Accent - Full Width) */}
              <div className="rounded-xl border border-border/60 bg-background/80 dark:bg-background/50 p-3.5 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-md transition-all duration-200 md:col-span-2">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <FlaskConical className="h-3.5 w-3.5" />
                    </div>
                    <span>{t('dashboard_mockup.soil_health_analysis')}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded border border-border/40">
                    SAMPLE: #KB-UP-402
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 py-2.5">
                  <div className="bg-muted/40 border border-border/50 p-2 rounded-lg text-center">
                    <span className="block text-[9px] font-semibold text-muted-foreground uppercase">{t('dashboard_mockup.nitrogen')}</span>
                    <span className="text-xs font-mono font-bold text-foreground">92 mg/kg</span>
                    <div className="w-full bg-muted mt-1 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[75%]" />
                    </div>
                  </div>
                  <div className="bg-muted/40 border border-border/50 p-2 rounded-lg text-center">
                    <span className="block text-[9px] font-semibold text-muted-foreground uppercase">{t('dashboard_mockup.phosphorus')}</span>
                    <span className="text-xs font-mono font-bold text-foreground">48 mg/kg</span>
                    <div className="w-full bg-muted mt-1 h-1 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full w-[60%]" />
                    </div>
                  </div>
                  <div className="bg-muted/40 border border-border/50 p-2 rounded-lg text-center">
                    <span className="block text-[9px] font-semibold text-muted-foreground uppercase">{t('dashboard_mockup.potassium')}</span>
                    <span className="text-xs font-mono font-bold text-foreground">205 mg/kg</span>
                    <div className="w-full bg-muted mt-1 h-1 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[85%]" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-muted-foreground font-medium pt-1 border-t border-border/30">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {t('dashboard_mockup.moisture_optimal')}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                    {t('dashboard_mockup.ph_neutral')}
                  </span>
                </div>
              </div>

              {/* 4. Weather Advisory (Sky Blue Accent) */}
              <div className="rounded-xl border border-border/60 bg-background/80 dark:bg-background/50 p-3.5 flex flex-col justify-between hover:border-sky-500/40 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded-lg bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <CloudSun className="h-3.5 w-3.5" />
                    </div>
                    <span>{t('dashboard_mockup.weather_advisory')}</span>
                  </span>
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                </div>
                <div className="py-2">
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                    {t('dashboard_mockup.rain_predicted')}
                  </span>
                  <p className="text-[9px] text-muted-foreground mt-0.5 leading-normal font-medium">
                    {t('dashboard_mockup.urea_warning')}
                  </p>
                </div>
                <div className="text-[9px] text-muted-foreground font-medium flex items-center justify-between">
                  <span>Forecast Radar</span>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold">Rain in ~2 hrs</span>
                </div>
              </div>

              {/* 5. Live Mandi Prices (Golden Amber Accent) */}
              <div className="rounded-xl border border-border/60 bg-background/80 dark:bg-background/50 p-3.5 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                    </div>
                    <span>{t('dashboard_mockup.mandi_live')}</span>
                  </span>
                  <span className="bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/20">
                    {t('dashboard_mockup.unam_live')}
                  </span>
                </div>
                <div className="py-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground font-semibold">{t('dashboard_mockup.agra_potato')}</span>
                    <span className="text-[10px] text-foreground font-mono font-bold bg-muted/40 px-1.5 py-0.5 rounded">₹1,850/Q</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground font-semibold">{t('dashboard_mockup.delhi_wheat')}</span>
                    <span className="text-[10px] text-foreground font-mono font-bold bg-muted/40 px-1.5 py-0.5 rounded">₹2,350/Q</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[9px] text-muted-foreground font-medium">
                  <span>Live APMC Feed</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">+₹50 today ↗</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
