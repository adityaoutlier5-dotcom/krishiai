'use client';

import Link from 'next/link';
import { ArrowRight, CloudSun, Leaf, ScanLine, Sprout } from 'lucide-react';
import { useLanguage } from '@/lib/language';

const capabilities = [
  { icon: CloudSun, key: 'weather', href: '/weather' },
  { icon: ScanLine, key: 'disease', href: '/disease' },
  { icon: Sprout, key: 'crop', href: '/crop-predictor' },
];

export function Hero() {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';

  return (
    <section className="relative overflow-hidden bg-background border-b border-border/60 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Heading + Description + CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 select-none">
            <Leaf className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>
              {isHi ? "भारतीय खेती के लिए व्यावहारिक उपकरण" : "Practical tools for Indian farming"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-display font-bold tracking-tight text-foreground leading-[1.08]">
            {isHi ? (
              <>खेत के हर फैसले को दें<br />अधिक स्पष्टता।</>
            ) : (
              <>Make every farm<br />decision with more<br />clarity.</>
            )}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
            {isHi
              ? "किसान बडी फसल योजना, रोग जांच, स्थानीय मौसम, मंडी भाव और सरकारी योजनाओं को एक सरल मंच पर लाता है।"
              : "Kisaan Buddy brings crop planning, disease checks, local weather, mandi prices, and government schemes into one simple place."}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
            <Link href="/signup">
              <button className="h-11 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-all">
                <span>{isHi ? "किसान बडी शुरू करें" : "Start using Kisaan Buddy"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/weather">
              <button className="h-11 px-5 rounded-lg border border-border bg-card hover:bg-muted/60 text-foreground text-sm font-semibold transition-all shadow-xs">
                {isHi ? "खेत का मौसम देखें" : "Check farm weather"}
              </button>
            </Link>
          </div>

          {/* Subtext note */}
          <p className="mt-4 text-xs text-muted-foreground font-normal">
            {isHi ? "शुरू करने के लिए अपनी फसल और स्थान चुनें।" : "Use your own inputs and location to get started."}
          </p>
        </div>

        {/* Right Column: Built for the field Card */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-2 sm:p-2.5 shadow-sm">
            <div className="rounded-xl border border-border/70 bg-background p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                {isHi ? "खेत के लिए निर्मित" : "BUILT FOR THE FIELD"}
              </p>
              <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {isHi ? "जरूरी चीजें, बिना किसी भटकाव के।" : "The essentials, without the clutter."}
              </h2>

              <div className="mt-6 divide-y divide-border border-y border-border">
                {capabilities.map(({ icon: Icon, key, href }) => {
                  const title = key === "weather"
                    ? (isHi ? "आपके खेत का मौसम" : "Weather for your farm")
                    : key === "disease"
                    ? (isHi ? "फसल रोग पहचानें" : "Identify crop disease")
                    : (isHi ? "अगली फसल की योजना" : "Plan the next crop");

                  return (
                    <Link
                      key={href}
                      href={href}
                      className="group flex items-center gap-4 py-4 first:pt-4 last:pb-4 transition-colors cursor-pointer"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-sm font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
