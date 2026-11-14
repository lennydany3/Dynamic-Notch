import BuiltInPublic from "@/components/site/BuiltInPublic";
import Features from "@/components/site/Features";
import GetCrest from "@/components/site/GetCrest";
import Hero from "@/components/site/Hero";
import NetworkCalls from "@/components/site/NetworkCalls";
import NotchLive from "@/components/site/NotchLive";
import PageEffects from "@/components/site/PageEffects";
import SectionDivider from "@/components/site/SectionDivider";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import WhatsNew from "@/components/site/WhatsNew";
import { getReleases } from "@/lib/changelog";
import { activeSocials, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  description: site.description,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Windows 10, Windows 11",
  softwareVersion: site.version,
  downloadUrl: site.download,
  installUrl: site.store,
  url: site.url,
  license: "https://opensource.org/licenses/MIT",
  author: { "@type": "Person", name: site.author, url: site.authorUrl },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  sameAs: activeSocials.map((social) => social.href),
};

/**
 * The home page is a Server Component: every section below renders to HTML on
 * the server. The only client code on it is the pointer-follow on the 3D mark,
 * the scroll-pinned notch demo, the share button shown on phones, the changelog
 * modal, and <PageEffects>, a renderless scroll observer.
 */
export default function Home() {
  const releases = getReleases();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <NotchLive />
        <SectionDivider />
        <Features />
        <NetworkCalls />
        <SectionDivider />
        <BuiltInPublic />
        <GetCrest />
      </main>
      <SiteFooter />
      <WhatsNew releases={releases} />
      <PageEffects />
    </>
  );
}
