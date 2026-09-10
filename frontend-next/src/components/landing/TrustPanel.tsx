'use client';

import { Sprout, TrendingUp, CloudSun, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language';

export function TrustPanel() {
  const { t, lang } = useLanguage();
  const isHi = lang === 'hi';

  const stats = [
    {
      icon: Sprout,
      metric: isHi ? "फसल व रोग AI" : "Crop Doctor",
      label: isHi ? "रोग पहचान व जैविक उपचार" : "AI disease checks & remedies",
      accent: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: TrendingUp,
      metric: isHi ? "लाइव मंडी भाव" : "Mandi Rates",
      label: isHi ? "दैनिक eNAM थोक मंडी भाव" : "Daily eNAM wholesale prices",
      accent: "from-amber-500/20 to-orange-500/10",
      iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      icon: CloudSun,
      metric: isHi ? "खेत का मौसम" : "Farm Weather",
      label: isHi ? "सटीक बारिश व तापमान रडार" : "Hyperlocal rain & spray radar",
      accent: "from-sky-500/20 to-blue-500/10",
      iconColor: "text-sky-500 bg-sky-500/10 border-sky-500/20"
    },
    {
      icon: Languages,
      metric: isHi ? "10+ भाषाएं" : "10+ Languages",
      label: isHi ? "भारतीय भाषाओं में उपलब्ध" : "10+ Indian regional languages",
      accent: "from-indigo-500/20 to-purple-500/10",
      iconColor: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20"
    }
  ];

  return (
    <section className="relative z-20 py-10 border-y border-border/60 bg-muted/20 dark:bg-card/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-3.5 md:gap-6 lg:grid-cols-4">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-4 md:p-5 rounded-2xl border border-border/70 bg-card/80 dark:bg-card/50 hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              {/* Subtle gradient hover highlight with distinct color */}
              <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${item.accent} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div className="flex items-center gap-3.5">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border group-hover:scale-105 transition-transform duration-200 ${item.iconColor}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-base md:text-lg font-display font-black text-foreground tracking-tight leading-tight">
                    {item.metric}
                  </span>
                  <span className="text-[11px] md:text-xs text-muted-foreground font-semibold truncate mt-0.5">
                    {item.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
