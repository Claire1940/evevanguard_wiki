"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Download,
  Globe,
  MonitorSmartphone,
  Package,
  ScrollText,
  Sparkles,
  Swords,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

// Tools Grid cards map 1:1 to module section ids (order must match tools.cards)
const TOOL_SECTION_IDS = [
  "download-and-alpha-access",
  "beginner-guide",
  "operation-avalon-guide",
  "weapons-and-loadout-guide",
  "extraction-and-looting-guide",
  "contracts-and-objectives-guide",
  "system-requirements-and-release-date",
  "eve-online-connection-and-rewards",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(var(--nav-theme-light))] mb-3">
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  intro,
  icon: Icon,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="text-center mb-8 md:mb-12 scroll-reveal">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
        {Icon && (
          <div
            className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-xl
                       bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
          >
            <Icon className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" />
          </div>
        )}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
      </div>
      {intro && (
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          {intro}
        </p>
      )}
    </div>
  );
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white/[0.02]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-sm md:text-base">{question}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-muted-foreground text-sm leading-6">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  // moduleLinkMap is reserved for future internal article linking; the homepage
  // intentionally renders no internal/source links per module spec.
  void moduleLinkMap;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.evevanguard.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "EVE Vanguard Wiki",
        description:
          "Complete EVE Vanguard Wiki covering release, playtests, weapons, loadouts, extraction, maps, PC specs, and beginner guides for the sci-fi extraction-adventure FPS on Steam.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "EVE Vanguard - Sci-Fi Extraction-Adventure FPS",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "EVE Vanguard Wiki",
        alternateName: "EVE Vanguard",
        url: siteUrl,
        description:
          "Complete EVE Vanguard Wiki resource hub for release, playtests, weapons, loadouts, extraction, and beginner guides",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "EVE Vanguard Wiki - Sci-Fi Extraction-Adventure FPS",
        },
        sameAs: [
          "https://evevanguard.com/",
          "https://store.steampowered.com/app/1872800/EVE_Vanguard/",
          "https://discord.gg/evevanguard",
          "https://www.youtube.com/@playevevanguard",
        ],
      },
      {
        "@type": "VideoGame",
        name: "EVE Vanguard",
        gamePlatform: ["PC", "Steam"],
        applicationCategory: "Game",
        genre: ["FPS", "Extraction Shooter", "Sci-Fi", "PvPvE"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 16,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
          url: "https://store.steampowered.com/app/1872800/EVE_Vanguard/",
        },
      },
      {
        "@type": "VideoObject",
        name: "EVE Vanguard | In Focus – First Strike",
        description:
          "Official EVE Vanguard video showcasing the sci-fi extraction-adventure FPS gameplay and Operation Avalon alpha playtest.",
        uploadDate: "2025-10-01",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/BTHEAhA3Moc",
        url: "https://www.youtube.com/watch?v=BTHEAhA3Moc",
      },
    ],
  };

  // FAQ-style module accordion states
  const [avalonExpanded, setAvalonExpanded] = useState<number | null>(null);
  const [connectionExpanded, setConnectionExpanded] = useState<number | null>(
    null,
  );
  const mobileBannerAd = getPreferredMobileBannerSelection();

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a
                href="https://evevanguard.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://store.steampowered.com/app/1872800/EVE_Vanguard/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 区域 */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="BTHEAhA3Moc"
              title="EVE Vanguard | In Focus – First Strike"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Module Navigation Cards (位于视频区之后、Latest Updates 之前) */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = TOOL_SECTION_IDS[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                bg-[hsl(var(--nav-theme)/0.1)]
                                flex items-center justify-center
                                group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: EVE Vanguard Download and Alpha Access */}
      <section
        id="download-and-alpha-access"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.eveVanguardDownloadAndAlphaAccess.eyebrow}
            title={t.modules.eveVanguardDownloadAndAlphaAccess.title}
            intro={t.modules.eveVanguardDownloadAndAlphaAccess.intro}
            icon={Download}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.eveVanguardDownloadAndAlphaAccess.cards.map(
              (card: any, index: number) => (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl
                             hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Download className="w-5 h-5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="font-bold text-base md:text-lg">{card.title}</h3>
                  </div>
                  <span
                    className="inline-block text-xs px-2 py-1 rounded-full mb-3
                               bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]
                               text-[hsl(var(--nav-theme-light))]"
                  >
                    {card.status}
                  </span>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: EVE Vanguard Beginner Guide */}
      <section
        id="beginner-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.eveVanguardBeginnerGuide.eyebrow}
            title={t.modules.eveVanguardBeginnerGuide.title}
            intro={t.modules.eveVanguardBeginnerGuide.intro}
            icon={BookOpen}
          />
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.eveVanguardBeginnerGuide.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Sparkles className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.eveVanguardBeginnerGuide.quickTips.map(
                (tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{tip}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 3: EVE Vanguard Operation Avalon Guide */}
      <section
        id="operation-avalon-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.eveVanguardOperationAvalonGuide.eyebrow}
            title={t.modules.eveVanguardOperationAvalonGuide.title}
            intro={t.modules.eveVanguardOperationAvalonGuide.intro}
            icon={Target}
          />
          <div className="scroll-reveal space-y-2 max-w-3xl mx-auto">
            {t.modules.eveVanguardOperationAvalonGuide.faqs.map(
              (faq: any, index: number) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={avalonExpanded === index}
                  onToggle={() =>
                    setAvalonExpanded(avalonExpanded === index ? null : index)
                  }
                />
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 4: EVE Vanguard Weapons and Loadout Guide */}
      <section
        id="weapons-and-loadout-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.eveVanguardWeaponsAndLoadoutGuide.eyebrow}
            title={t.modules.eveVanguardWeaponsAndLoadoutGuide.title}
            intro={t.modules.eveVanguardWeaponsAndLoadoutGuide.intro}
            icon={Swords}
          />
          <div className="scroll-reveal space-y-6">
            {t.modules.eveVanguardWeaponsAndLoadoutGuide.tiers.map(
              (tier: any, ti: number) => (
                <div
                  key={ti}
                  className="p-4 md:p-6 bg-white/5 border border-border rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Swords className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="font-bold text-base md:text-lg">
                      {tier.tier}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tier.items.map((item: any, ii: number) => (
                      <div
                        key={ii}
                        className="p-3 bg-white/5 border border-border rounded-lg"
                      >
                        <p className="font-semibold text-sm text-[hsl(var(--nav-theme-light))] mb-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 5: EVE Vanguard Extraction and Looting Guide */}
      <section
        id="extraction-and-looting-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.eveVanguardExtractionAndLootingGuide.eyebrow}
            title={t.modules.eveVanguardExtractionAndLootingGuide.title}
            intro={t.modules.eveVanguardExtractionAndLootingGuide.intro}
            icon={Package}
          />
          <div className="scroll-reveal space-y-3 md:space-y-4">
            {t.modules.eveVanguardExtractionAndLootingGuide.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 6: EVE Vanguard Contracts and Objectives Guide */}
      <section
        id="contracts-and-objectives-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.eveVanguardContractsAndObjectivesGuide.eyebrow}
            title={t.modules.eveVanguardContractsAndObjectivesGuide.title}
            intro={t.modules.eveVanguardContractsAndObjectivesGuide.intro}
            icon={ScrollText}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.eveVanguardContractsAndObjectivesGuide.cards.map(
              (card: any, index: number) => (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ScrollText className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 7: EVE Vanguard System Requirements and Release Date */}
      <section
        id="system-requirements-and-release-date"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.eveVanguardSystemRequirementsAndReleaseDate.eyebrow}
            title={t.modules.eveVanguardSystemRequirementsAndReleaseDate.title}
            intro={t.modules.eveVanguardSystemRequirementsAndReleaseDate.intro}
            icon={MonitorSmartphone}
          />
          <div className="scroll-reveal overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[hsl(var(--nav-theme)/0.1)] border-b border-border">
                  <th className="text-left p-3 md:p-4 font-semibold whitespace-nowrap">
                    {
                      t.modules.eveVanguardSystemRequirementsAndReleaseDate
                        .tableColumns.category
                    }
                  </th>
                  <th className="text-left p-3 md:p-4 font-semibold">
                    {
                      t.modules.eveVanguardSystemRequirementsAndReleaseDate
                        .tableColumns.minimum
                    }
                  </th>
                  <th className="text-left p-3 md:p-4 font-semibold">
                    {
                      t.modules.eveVanguardSystemRequirementsAndReleaseDate
                        .tableColumns.recommended
                    }
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.modules.eveVanguardSystemRequirementsAndReleaseDate.rows.map(
                  (row: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-border last:border-0 align-top"
                    >
                      <td className="p-3 md:p-4 font-medium whitespace-nowrap">
                        {row.category}
                      </td>
                      <td className="p-3 md:p-4 text-muted-foreground">
                        {row.minimum}
                      </td>
                      <td className="p-3 md:p-4 text-muted-foreground">
                        {row.recommended}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Module 8: EVE Vanguard EVE Online Connection and Rewards */}
      <section
        id="eve-online-connection-and-rewards"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow={t.modules.eveVanguardEveOnlineConnectionAndRewards.eyebrow}
            title={t.modules.eveVanguardEveOnlineConnectionAndRewards.title}
            intro={t.modules.eveVanguardEveOnlineConnectionAndRewards.intro}
            icon={Globe}
          />
          <div className="scroll-reveal space-y-2 max-w-3xl mx-auto">
            {t.modules.eveVanguardEveOnlineConnectionAndRewards.faqs.map(
              (faq: any, index: number) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={connectionExpanded === index}
                  onToggle={() =>
                    setConnectionExpanded(
                      connectionExpanded === index ? null : index,
                    )
                  }
                />
              ),
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.gg/evevanguard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@playevevanguard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/app/1872800/discussions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/1872800/EVE_Vanguard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
