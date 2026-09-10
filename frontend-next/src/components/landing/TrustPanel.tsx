'use client';

import { Users, Sparkles, Languages, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language';

export function TrustPanel() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      metric: "50,000+",
      label: t("hero.trust_farmers"),
      accent: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border-emerald-500/30"
    },
    {
      icon: Sparkles,
      metric: "1,000,000+",
      label: t("hero.trust_predictions"),
      accent: "from-teal-500/20 to-emerald-500/10",
      iconColor: "text-teal-600 dark:text-teal-400 bg-teal-500/15 border-teal-500/30"
    },
    {
      icon: Languages,
      metric: "10+ Languages",
      label: t("hero.trust_languages"),
      accent: "from-emerald-500/20 to-amber-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border-emerald-500/30"
    },
    {
      icon: ShieldCheck,
      metric: "95% Accurate",
      label: t("hero.trust_accuracy"),
      accent: "from-amber-500/20 to-teal-500/10",
      iconColor: "text-amber-600 dark:text-amber-400 bg-amber-500/15 border-amber-500/30"
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
              {/* Subtle gradient hover highlight */}
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
