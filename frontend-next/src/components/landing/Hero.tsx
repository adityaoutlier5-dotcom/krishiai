"use client";

import Link from "next/link";
import { ArrowRight, CloudSun, Leaf, ScanLine, Sprout } from "lucide-react";
import { useLanguage } from "@/lib/language";

const capabilities = [
  { icon: CloudSun, key: "weather", href: "/weather" },
  { icon: ScanLine, key: "disease", href: "/disease" },
  { icon: Sprout, key: "crop", href: "/crop-predictor" },
];

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="border-b border-border bg-[hsl(var(--surface-sunken))]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <Leaf className="h-3.5 w-3.5" />
            {t("ui.home.badge")}
          </div>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className="btn-primary h-11 px-5">
              {t("hero.start_free")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/weather" className="btn-secondary h-11 px-5">
              {t("ui.home.weather_cta")}
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{t("ui.home.helper")}</p>
        </div>

        <div className="border border-border bg-card p-2 shadow-sm sm:p-3">
          <div className="border border-border/80 bg-background p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t("ui.home.field_label")}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{t("ui.home.card_title")}</h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {capabilities.map(({ icon: Icon, key, href }) => (
                <Link key={href} href={href} className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                  <span className="flex-1 text-sm font-medium text-foreground group-hover:text-primary">{t(`ui.home.capabilities.${key}`)}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
