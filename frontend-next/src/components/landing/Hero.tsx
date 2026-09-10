'use client';

import Link from 'next/link';
import { 
  ArrowRight, Play, CheckCircle2, Sprout, Bug, 
  CloudSun, TrendingUp, FlaskConical, AlertTriangle, Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background py-16 md:py-24 border-b border-border/50">
      
      {/* ── BACKGROUND: Subtle Texture + Emerald Accents ── */}
      <div className="absolute inset-0 z-0">
        {/* Real Indian farmland subtle overlay */}
        <div 
          className="absolute inset-0 bg-[url('/hero_farmer.png')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.06] mix-blend-luminosity pointer-events-none"
          style={{ filter: 'contrast(1.2) brightness(0.9)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* ── LEFT SIDE: SaaS Value Proposition ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 select-none">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>KisaanBuddy AI Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-[1.08] tracking-tight text-foreground">
            {t('hero.title_line1')}<br />
            <span className="text-emerald-600 dark:text-emerald-400">
              {t('hero.title_line2')} 🌾
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed font-normal">
            {t('hero.subtitle')}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 group text-sm font-bold h-11 px-7 rounded-xl shadow-sm transition-all duration-200">
                {t('hero.start_free')}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="#demo" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card hover:bg-muted/50 px-7 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 h-11">
                <Play className="h-3.5 w-3.5 fill-current shrink-0" />
                {t('hero.watch_demo')}
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 text-xs font-medium text-muted-foreground max-w-md w-full border-t border-border/50">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t('hero.trust_languages')}</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t('hero.trust_predictions')}</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t('hero.trust_farmers')}</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{t('hero.trust_accuracy')}</span>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT SIDE: Clean Product Dashboard Preview ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="lg:col-span-6 w-full relative"
        >
          {/* Dashboard Frame */}
          <div className="relative rounded-2xl p-4 md:p-5 bg-card border border-border/60 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-3.5">

            {/* 1. Crop Recommendation Card */}
            <div className="rounded-xl border border-border/50 bg-background p-3.5 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                  <Sprout className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t('dashboard_mockup.crop_recommendation')}
                </span>
                <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {t('dashboard_mockup.optimal')}
                </span>
              </div>
              <div className="py-2.5">
                <div className="text-[10px] text-muted-foreground font-medium">{t('dashboard_mockup.recommended_crop')}:</div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{t('dashboard_mockup.basmati_rice')}</div>
              </div>
              <div className="text-[10px] text-muted-foreground font-normal">{t('dashboard_mockup.yield_increase')}</div>
            </div>

            {/* 2. Disease Detection Result */}
            <div className="rounded-xl border border-border/50 bg-background p-3.5 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                  <Bug className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
                  {t('dashboard_mockup.disease_scanner')}
                </span>
                <span className="bg-rose-500/10 text-rose-700 dark:text-rose-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {t('dashboard_mockup.alert')}
                </span>
              </div>
              <div className="py-2 flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-cover bg-center border border-border/50 shrink-0" style={{ backgroundImage: "url('/hero_farmer.png')" }} />
                <div>
                  <div className="text-[11px] text-foreground font-bold">{t('dashboard_mockup.early_blight_detected')}</div>
                  <div className="text-[9px] text-muted-foreground">{t('dashboard_mockup.confidence_potato')}</div>
                </div>
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{t('dashboard_mockup.remedy_copper')}</div>
            </div>

            {/* 3. Soil Analysis Report */}
            <div className="rounded-xl border border-border/50 bg-background p-3.5 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-200 md:col-span-2">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                  <FlaskConical className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                  {t('dashboard_mockup.soil_health_analysis')}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">ID: KB-NODE-042</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2.5">
                <div className="bg-muted/40 border border-border/40 p-2 rounded-lg text-center">
                  <span className="block text-[9px] text-muted-foreground">{t('dashboard_mockup.nitrogen')}</span>
                  <span className="text-xs font-mono font-bold text-foreground">92 mg/kg</span>
                </div>
                <div className="bg-muted/40 border border-border/40 p-2 rounded-lg text-center">
                  <span className="block text-[9px] text-muted-foreground">{t('dashboard_mockup.phosphorus')}</span>
                  <span className="text-xs font-mono font-bold text-foreground">48 mg/kg</span>
                </div>
                <div className="bg-muted/40 border border-border/40 p-2 rounded-lg text-center">
                  <span className="block text-[9px] text-muted-foreground">{t('dashboard_mockup.potassium')}</span>
                  <span className="text-xs font-mono font-bold text-foreground">205 mg/kg</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-muted-foreground font-medium">
                <span>{t('dashboard_mockup.moisture_optimal')}</span>
                <span>{t('dashboard_mockup.ph_neutral')}</span>
              </div>
            </div>

            {/* 4. Weather Advisory */}
            <div className="rounded-xl border border-border/50 bg-background p-3.5 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                  <CloudSun className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                  {t('dashboard_mockup.weather_advisory')}
                </span>
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="py-2">
                <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase">{t('dashboard_mockup.rain_predicted')}</span>
                <p className="text-[9px] text-muted-foreground mt-0.5 leading-normal">
                  {t('dashboard_mockup.urea_warning')}
                </p>
              </div>
              <div className="text-[9px] text-muted-foreground">Updated 2m ago</div>
            </div>

            {/* 5. Live Mandi Prices */}
            <div className="rounded-xl border border-border/50 bg-background p-3.5 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t('dashboard_mockup.mandi_live')}
                </span>
                <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                  {t('dashboard_mockup.unam_live')}
                </span>
              </div>
              <div className="py-2 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground font-medium">{t('dashboard_mockup.agra_potato')}</span>
                  <span className="text-[10px] text-foreground font-mono font-bold">₹1,850/Q</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground font-medium">{t('dashboard_mockup.delhi_wheat')}</span>
                  <span className="text-[10px] text-foreground font-mono font-bold">₹2,350/Q</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[9px] text-muted-foreground">
                <span>Updated 5m ago</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+₹50 today</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
