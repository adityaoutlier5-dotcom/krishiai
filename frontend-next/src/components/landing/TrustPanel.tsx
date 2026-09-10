'use client';

import { Users, Sparkles, Languages, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language';

export function TrustPanel() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: t("hero.trust_farmers"),
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: Sparkles,
      value: t("hero.trust_predictions"),
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
    },
    {
      icon: Languages,
      value: t("hero.trust_languages"),
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: ShieldCheck,
      value: t("hero.trust_accuracy"),
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
    }
  ];

  return (
    <section className="relative z-20 py-8 border-y border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3.5 p-4 rounded-xl border border-border/50 bg-card hover:border-emerald-500/30 transition-all duration-200 shadow-sm group"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border group-hover:scale-105 transition-transform duration-200 ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-display font-bold text-foreground tracking-tight leading-snug">
                  {item.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
