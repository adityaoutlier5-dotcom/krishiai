'use client';

import { useLanguage } from '@/lib/language';
import Link from 'next/link';
import { ArrowRight, Mail, CheckCircle2, Sparkles, Smartphone, Shield, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';

export function FinalCTA() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-24 px-4 md:px-8 text-center bg-muted/20 dark:bg-[#060b11] relative overflow-hidden">
      
      {/* Background Graphic Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.06] blur-3xl pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-card via-card/95 to-emerald-500/[0.04] p-10 md:p-16 backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        {/* Top radial ambient spot in emerald & amber */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-[160px] bg-gradient-to-r from-emerald-500/20 via-amber-500/10 to-teal-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top genuine pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-4 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 shadow-xs mb-6 select-none">
          <Sprout className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{lang === 'hi' ? 'हर भारतीय किसान के लिए समर्पित' : 'Dedicated to Indian Agriculture'}</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-foreground leading-[1.12] mb-4">
          {t("landing_final_cta.start_farming_smarter_today")}
        </h2>
        
        <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8 font-medium">
          {t("landing_final_cta.unlock_9_advanced_ai")}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3.5 pt-2">
          <Link href="/signup">
            <button className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold h-12 px-8 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 flex items-center gap-2.5 group transition-all duration-200 active:scale-[0.98] text-sm">
              <span>{t("landing_final_cta.launch_KisaanBuddy")}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </Link>
          <Link href="/contact">
            <button className="rounded-xl border border-border/80 bg-background/80 hover:bg-muted text-foreground font-semibold h-12 px-7 flex items-center gap-2 text-sm shadow-xs backdrop-blur-sm transition-all duration-200 active:scale-[0.98]">
              <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t("contactUs")}</span>
            </button>
          </Link>
        </div>

        {/* 3 Real Guarantees (No fake claims) */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-10 pt-8 border-t border-border/50 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Free for Farmers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Smartphone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Works on Any Mobile Phone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Open & Accessible in 10+ Languages</span>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
