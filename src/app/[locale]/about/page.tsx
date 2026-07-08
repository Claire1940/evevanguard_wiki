import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.evevanguard.wiki'
  const path = '/about'

  return {
    title: 'About EVE Vanguard Wiki - Your Ultimate Extraction FPS Resource',
    description: 'Learn about EVE Vanguard Wiki, a community-driven resource hub providing comprehensive weapons guides, loadout tips, extraction strategies, and playtest coverage for the EVE Vanguard Steam game by CCP Games.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'EVE Vanguard Wiki',
      title: 'About EVE Vanguard Wiki',
      description: 'Learn about our mission to provide the best EVE Vanguard weapons, loadout, and extraction resources.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'EVE Vanguard Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About EVE Vanguard Wiki',
      description: 'Learn about our mission to provide the best EVE Vanguard resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About EVE Vanguard Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for EVE Vanguard
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to EVE Vanguard Wiki</h2>
            <p>
              EVE Vanguard Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping players
              master the Steam game "EVE Vanguard" by CCP Games. We are a community-driven platform that provides
              comprehensive weapons guides, loadout breakdowns, extraction strategies, and playtest coverage to enhance
              your experience as an immortal warclone.
            </p>
            <p>
              Whether you're securing your first extraction or optimizing your squad loadout for high-stakes runs,
              EVE Vanguard Wiki is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower EVE Vanguard players with accurate, up-to-date information
              and powerful tools</strong> that help them succeed in the field. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest playtest changes, weapon balance updates, and patch notes</li>
              <li><strong>Build useful tools:</strong> Develop loadout planners and extraction guides that help players make informed decisions</li>
              <li><strong>Foster community:</strong> Create a welcoming space where warclones can share strategies, runs, and feedback</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for players of all skill levels</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision EVE Vanguard Wiki as the <strong>go-to destination</strong> for every EVE Vanguard player seeking
              to improve their gameplay. We want to be the resource that players trust and rely on, whether they need
              weapon breakdowns, want to study extraction routes, or are looking for advanced squad tactics.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🔫</div>
              <h3 className="text-xl font-semibold text-white mb-2">Weapons & Loadouts</h3>
              <p className="text-slate-300">
                Detailed breakdowns of every weapon, attachment, and loadout build. Find the optimal kit for
                your playstyle and dominate the battlefield.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🗺️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Maps & Extraction</h3>
              <p className="text-slate-300">
                Comprehensive battlefield maps, extraction point locations, and loot hotspots.
                Plan your routes and get out alive with the spoils.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎖️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Playtest & Release</h3>
              <p className="text-slate-300">
                Up-to-date coverage of Alpha playtest windows, release timelines, and content roadmaps
                as CCP Games evolves EVE Vanguard toward launch.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">Tactics & Strategies</h3>
              <p className="text-slate-300">
                Squad tactics, solo survival strategies, and meta analysis for every engagement.
                Learn how to outplay both AI threats and rival warclones.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">💻</div>
              <h3 className="text-xl font-semibold text-white mb-2">System Requirements</h3>
              <p className="text-slate-300">
                PC specs, recommended hardware, and performance tuning tips.
                Make sure your rig is ready to run EVE Vanguard smoothly.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages including English, German, Spanish, French,
                Japanese, Portuguese, Russian, and Turkish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              EVE Vanguard Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from warclones of all skill levels. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Player feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> New loadouts, hidden mechanics, and pro tips shared by players</li>
              <li><strong>Playtest updates:</strong> We track every playtest wave and adjust our content accordingly</li>
              <li><strong>Meta shifts:</strong> We monitor weapon and tactic trends and update guides based on real runs</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you've cracked a new loadout, mapped an extraction route,
              or have suggestions for new guides, we'd love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              EVE Vanguard Wiki is maintained by a dedicated team of passionate gamers and developers who love
              EVE Vanguard as much as you do. We're players first, constantly testing loadouts, running extractions,
              and staying updated with the latest playtest discoveries.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Game analysis:</strong> Deep understanding of EVE Vanguard mechanics, weapons, and extraction flow</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and tutorials</li>
              <li><strong>Community management:</strong> Listening to player feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: "Warclone Doctrine" – Deploying knowledge across the EVE Universe.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>EVE Vanguard Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with CCP Games (the developers of EVE Vanguard), Valve Corporation (Steam),
              or any official entities.
            </p>
            <p>
              All game content, trademarks, characters, and assets are the property of their respective owners.
              We use game-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              EVE Vanguard Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@evevanguard.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@evevanguard.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@evevanguard.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@evevanguard.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@evevanguard.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@evevanguard.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@evevanguard.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@evevanguard.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest guides, tips, and EVE Vanguard news.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
