import Hero from "@/components/hero"
import Problem from "@/components/problem"
import Solution from "@/components/solution"
import HowItWorks from "@/components/how-it-works"
import Benefits from "@/components/benefits"
import TargetAudience from "@/components/target-audience"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Benefits />
      <TargetAudience />
      <ContactSection />
      <Footer />
    </main>
  )
}
