// Home.jsx
import { Link } from "react-router-dom";
import {
  MapPin,
  Search,
  ShieldCheck,
  Users,
  ArrowRight,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import logo from "../assets/lostlink-logo-dark.png";

function Home() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Report",
      desc: "Post what you lost or found in under a minute.",
    },
    {
      icon: Search,
      title: "Search",
      desc: "Browse listings filtered to your community.",
    },
    {
      icon: CheckCircle2,
      title: "Recover",
      desc: "Message the reporter and arrange safe handoff.",
    },
  ];

  const features = [
    {
      icon: Search,
      title: "Smart matching",
      desc: "Search surfaces likely matches between lost and found reports automatically.",
    },
    {
      icon: ShieldCheck,
      title: "Private by default",
      desc: "In-app messaging keeps phone numbers and emails hidden until you choose to share.",
    },
    {
      icon: Users,
      title: "Built for your community",
      desc: "Scoped listings mean you're only seeing items relevant to your campus or neighborhood.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* NAV */}
      <nav className="sticky top-0 z-10 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="LostLink" className="h-7 w-auto" />
            <span className="text-[15px] font-semibold text-neutral-100 tracking-tight">
              LostLink
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
            <a href="#how" className="hover:text-neutral-100 transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-neutral-100 transition-colors">
              Features
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-sm text-neutral-400 hover:text-neutral-100 px-3 py-2 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO — asymmetric, no repeated logo, single accent */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 border border-amber-400/20 bg-amber-400/5 rounded-full px-3 py-1 mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Community lost &amp; found
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold text-neutral-50 leading-[1.05] tracking-tight">
            Lost something?
            <br />
            Someone nearby
            <br />
            probably found it.
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-md">
            LostLink connects people who've lost items with people who've
            found them — scoped to your own community.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-medium px-5 py-3 rounded-lg transition-colors"
            >
              Report an item
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/items"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-neutral-100 border border-neutral-800 hover:border-neutral-700 px-5 py-3 rounded-lg transition-colors"
            >
              Browse items
            </Link>
          </div>
        </div>

        {/* Right side: structural visual, not a logo — a mini "how it feels" preview */}
        <div className="relative">
          <div className="border border-neutral-800 rounded-2xl bg-neutral-900/60 p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 border border-neutral-800 rounded-lg p-3">
                <div className="w-9 h-9 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-24 bg-neutral-700 rounded-full mb-1.5" />
                  <div className="h-2 w-16 bg-neutral-800 rounded-full" />
                </div>
                <span className="text-[10px] text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 rounded-full">
                  found
                </span>
              </div>
              <div className="flex items-center gap-3 border border-neutral-800 rounded-lg p-3">
                <div className="w-9 h-9 rounded-md bg-amber-400/10 flex items-center justify-center">
                  <Search className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-28 bg-neutral-700 rounded-full mb-1.5" />
                  <div className="h-2 w-20 bg-neutral-800 rounded-full" />
                </div>
                <span className="text-[10px] text-neutral-400 border border-neutral-700 px-2 py-0.5 rounded-full">
                  lost
                </span>
              </div>
              <div className="flex items-center gap-3 border border-neutral-800 rounded-lg p-3">
                <div className="w-9 h-9 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-20 bg-neutral-700 rounded-full mb-1.5" />
                  <div className="h-2 w-24 bg-neutral-800 rounded-full" />
                </div>
                <span className="text-[10px] text-neutral-400 border border-neutral-700 px-2 py-0.5 rounded-full">
                  recovered
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-t border-neutral-800/80">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
            Process
          </p>
          <h2 className="text-3xl font-semibold text-neutral-50 mb-14 max-w-md">
            Three steps, no back-and-forth
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-neutral-800 rounded-xl overflow-hidden">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="bg-neutral-950 p-8">
                <span className="text-xs font-mono text-neutral-600">
                  0{i + 1}
                </span>
                <Icon className="w-5 h-5 text-amber-400 mt-4 mb-4" />
                <h3 className="text-base font-medium text-neutral-100 mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-t border-neutral-800/80">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
            Why LostLink
          </p>
          <h2 className="text-3xl font-semibold text-neutral-50 mb-14 max-w-md">
            Details most lost-and-found boards skip
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <Icon className="w-5 h-5 text-blue-400 mb-4" />
                <h3 className="text-base font-medium text-neutral-100 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-800/80">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-50 mb-4">
            Get your items back.
          </h2>
          <p className="text-neutral-500 mb-8">
            Free to join. Takes less than a minute.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Create your account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800/80">
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="LostLink" className="h-5 w-auto opacity-70" />
            <span className="text-sm text-neutral-500">LostLink</span>
          </div>
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} LostLink
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;