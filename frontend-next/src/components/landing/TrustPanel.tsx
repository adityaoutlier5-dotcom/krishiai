'use client';

import { Languages, TrendingUp, CloudSun, Sprout, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language';
import Link from 'next/link';

export function TrustPanel() {
  const { t, lang } = useLanguage();

  const isHindi = lang === 'hi';

  const pillars = [
    {
      icon: Languages,
      href: "/#features",
      title: isHindi ? "10+ भारतीय भाषाएं" : "10+ Indian Languages",
      subtitle: isHindi ? "हिंदी, मराठी, बांग्ला, तेलुगु, पंजाबी और अन्य क्षेत्रीय भाषाएं" : "Accessible in Hindi, Bengali, Telugu, Marathi, Tamil & more",
      badge: isHindi ? "भाषा समर्थन" : "Multi-Lingual",
      gradient: "from-indigo-500/15 via-purple-500/10 to-transparent",
      borderColor: "hover:border-indigo-500/40",
      iconColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
      badgeColor: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20"
    },
    {
      icon: TrendingUp,
      href: "/mandi",
      title: isHindi ? "लाइव मंडी भाव (eNAM)" : "Live Mandi Rates",
      subtitle: isHindi ? "विभिन्न मंडियों के ताजा दैनिक थोक व खुदरा मूल्य" : "Daily APMC market rates across commodities and states",
      badge: isHindi ? "मंडी अपडेट" : "eNAM Live",
      gradient: "from-amber-500/15 via-orange-500/10 to-transparent",
      borderColor: "hover:border-amber-500/40",
      iconColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25",
      badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20"
    },
    {
      icon: CloudSun,
      href: "/weather",
      title: isHindi ? "सटीक मौसम पूर्वानुमान" : "Hyperlocal Weather",
      subtitle: isHindi ? "बारिश का रडार, तापमान और खाद छिड़काव की सलाह" : "Rain forecasts, temperature alerts & spray advisories",
      badge: isHindi ? "मौसम अलर्ट" : "Live Radar",
      gradient: "from-sky-500/15 via-blue-500/10 to-transparent",
      borderColor: "hover:border-sky-500/40",
      iconColor: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/25",
      badgeColor: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20"
    },
    {
      icon: Sprout,
      href: "/disease",
      title: isHindi ? "AI फसल व रोग डॉक्टर" : "AI Crop & Disease Doctor",
      subtitle: isHindi ? "पत्ते की फोटो से बीमारी की तुरंत पहचान व जैविक उपाय" : "Instant leaf scan diagnosis & organic treatment advice",
      badge: isHindi ? "रोग पहचान" : "AI Vision",
      gradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
      borderColor: "hover:border-emerald-500/40",
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
    }
  ];

  return (
    <section className="relative z-20 py-12 border-y border-border/60 bg-muted/20 dark:bg-card/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={item.href} className="block h-full group">
                <div className={`relative h-full p-5 rounded-2xl border border-border/70 bg-card/85 dark:bg-card/50 ${item.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between`}>
                  
                  {/* Distinct ambient corner aura */}
                  <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${item.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  <div>
                    {/* Icon & Badge Row */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border group-hover:scale-105 transition-transform duration-200 ${item.iconColor}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-sm md:text-base font-display font-bold text-foreground tracking-tight leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium mt-1.5 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Explore link */}
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>{isHindi ? "विस्तार से देखें" : "Explore"}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
