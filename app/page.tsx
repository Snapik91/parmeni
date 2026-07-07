import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutServer from "@/components/AboutServer";
import ServerStatus from "@/components/server/ServerStatus";
import OnlinePlayers from "@/components/server/OnlinePlayers";
import ServerDashboard from "@/components/server/ServerDashboard";
import LiveScumMap from "@/components/server/LiveScumMap";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <AboutServer />
      <ServerStatus />
      <OnlinePlayers />
      <ServerDashboard />
      <LiveScumMap />
    </main>
  );
}