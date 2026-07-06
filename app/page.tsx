import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutServer from "@/components/AboutServer";
import ServerStatus from "@/components/server/ServerStatus";
import OnlinePlayers from "@/components/server/OnlinePlayers";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <AboutServer />
      <ServerStatus />
    </main>
  );
}