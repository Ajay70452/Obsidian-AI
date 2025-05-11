import Hero from "@/components/hero"
import Problem from "@/components/problem"
import HowItWorks from "@/components/how-it-works"
import Benefits from "@/components/benefits"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <HowItWorks />
      <Benefits />
      <Footer />
    </main>
  )
}
