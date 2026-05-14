import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Users,
  MessageSquare,
  Search,
  UserCheck,
  ArrowRight,
  GraduationCap,
  MapPin,
  Briefcase,
  Star,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import useAuthStore from "../../store/authStore";
import { ROUTES } from "../../constants/constants";

// ─── Tiny mock data for the hero visual panel ───────────────────────────────
const MOCK_ALUMNI = [
  {
    initials: "AK",
    name: "Ahmed Khan",
    role: "Senior Engineer · Google",
    location: "San Francisco",
    tags: ["ML", "React"],
    color: "bg-teal-600",
  },
  {
    initials: "SR",
    name: "Sara Raza",
    role: "Product Manager · Microsoft",
    location: "Seattle",
    tags: ["Agile", "UX"],
    color: "bg-amber-500",
  },
  {
    initials: "HM",
    name: "Hassan Malik",
    role: "Tech Lead · Amazon",
    location: "Dubai",
    tags: ["AWS", "DevOps"],
    color: "bg-emerald-600",
  },
];

const MOCK_POST = {
  question: "How do I crack SWE interviews at FAANG companies?",
  replies: 7,
  likes: 24,
  tag: "Career",
};

// ─── Feature cards ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Users,
    title: "Alumni Directory",
    description:
      "Browse and connect with FAST-NUCES alumni across industries and locations with advanced search filters.",
  },
  {
    icon: MessageSquare,
    title: "Q&A Forum",
    description:
      "Ask questions and receive expert answers from alumni who have been exactly where you are now.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find alumni by company, expertise, city, or role — precision targeting for the mentorship you need.",
  },
  {
    icon: UserCheck,
    title: "Rich Profiles",
    description:
      "Detailed professional profiles with experience timelines, skills, and direct contact information.",
  },
];

// ─── Steps ────────────────────────────────────────────────────────────────────
const STUDENT_STEPS = [
  { n: "01", title: "Sign Up", body: "Register with your @nu.edu.pk email." },
  { n: "02", title: "Explore", body: "Browse the alumni directory by field." },
  { n: "03", title: "Connect", body: "Ask questions and get real guidance." },
];

const ALUMNI_STEPS = [
  { n: "01", title: "Register", body: "Join with your professional email." },
  { n: "02", title: "Share", body: "Complete your profile and journey." },
  {
    n: "03",
    title: "Give Back",
    body: "Mentor students and answer questions.",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "5+", label: "FAST Campuses" },
  { value: "12+", label: "Departments" },
  { value: "100%", label: "Free to Use" },
  { value: "∞", label: "Connections" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.DASHBOARD, { replace: true });
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  return (
    <div
      className="flex flex-col overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-6px);  }
        }
        .anim-up        { animation: fadeUp  0.6s ease both; }
        .anim-up-d1     { animation: fadeUp  0.6s ease 0.1s both; }
        .anim-up-d2     { animation: fadeUp  0.6s ease 0.2s both; }
        .anim-up-d3     { animation: fadeUp  0.6s ease 0.3s both; }
        .anim-fade      { animation: fadeIn  0.8s ease 0.4s both; }
        .float-card     { animation: floatCard 4s ease-in-out infinite; }
        .float-card-d   { animation: floatCard 4s ease-in-out 1.2s infinite; }
        .hero-grid-bg {
          background-image: radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0);
          background-size: 28px 28px;
        }
        .feature-card:hover { transform: translateY(-3px); }
        .feature-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — split two-column
      ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-background">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 hero-grid-bg opacity-60 dark:opacity-30" />

        {/* Teal glow top-left */}
        <div
          className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(173 58% 39% / 0.12) 0%, transparent 70%)",
          }}
        />
        {/* Amber glow bottom-right */}
        <div
          className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(38 92% 50% / 0.07) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            {/* ── Left: Text & CTAs ─────────────────────────────────────────── */}
            <div>
              <div className="anim-up">
                <Badge
                  variant="outline"
                  className="mb-6 gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide uppercase border-primary/30 text-primary bg-primary/5"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  FAST-NUCES Alumni Network
                </Badge>
              </div>

              <h1 className="anim-up-d1 text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-6">
                Where <span className="text-primary">Students</span> Meet their{" "}
                <span
                  className="relative inline-block"
                  style={{
                    WebkitTextStroke: "2px var(--color-secondary)",
                    color: "transparent",
                  }}
                >
                  Future
                </span>
              </h1>

              <p className="anim-up-d2 text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                FastConnect bridges FAST-NUCES students with alumni for
                mentorship, career guidance, and real professional connections —
                all in one place.
              </p>

              <div className="anim-up-d3 flex flex-wrap gap-3 mb-12">
                <Button
                  size="lg"
                  className="gap-2 text-base px-6 h-12 shadow-lg shadow-primary/20"
                  onClick={() => navigate(ROUTES.SIGNUP_CHOICE)}
                >
                  Get Started Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base px-6 h-12"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Log In
                </Button>
              </div>

              {/* Mini trust bar */}
              <div className="anim-fade flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  "Free for all students",
                  "All FAST campuses",
                  "Verified alumni",
                ].map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: Visual panel ───────────────────────────────────────── */}
            <div className="anim-fade hidden lg:flex flex-col gap-4 relative">
              {/* Alumni cards stack */}
              <div className="float-card bg-card border rounded-2xl shadow-xl p-5 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Alumni Directory
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {MOCK_ALUMNI.length} shown
                  </Badge>
                </div>

                {MOCK_ALUMNI.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${a.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                    >
                      {a.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{a.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                        <Briefcase className="w-3 h-3 flex-shrink-0" />
                        {a.role}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {a.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Q&A post card — offset right, floating slower */}
              <div className="float-card-d self-end w-[88%] bg-card border rounded-2xl shadow-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    ZK
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">Zainab K.</span>
                      <Badge
                        variant="default"
                        className="text-[10px] px-1.5 py-0"
                      >
                        Student
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground font-medium leading-snug">
                      "{MOCK_POST.question}"
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {MOCK_POST.replies} replies
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        {MOCK_POST.likes} likes
                      </span>
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-secondary/10 text-secondary rounded font-medium">
                        {MOCK_POST.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative badge floating top-right */}
              <div
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-2xl px-4 py-2.5 shadow-lg text-xs font-bold flex items-center gap-1.5"
                style={{ animation: "floatCard 5s ease-in-out 0.5s infinite" }}
              >
                <Globe className="w-3.5 h-3.5" />
                Global Alumni Network
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════════════ */}
      <section className="border-y bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`py-8 px-6 text-center ${
                  i < STATS.length - 1 ? "border-r border-border/60" : ""
                }`}
              >
                <p
                  className="text-4xl font-bold text-primary mb-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ABOUT — two column editorial
      ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left: big label + text */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                About FastConnect
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6">
                Built for the <br />
                FAST community
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                FastConnect is a platform designed to foster meaningful
                connections between current students and alumni of FAST-NUCES.
                Our mission is to create a supportive community where knowledge,
                experience, and opportunities flow freely.
              </p>
            </div>

            {/* Right: two cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card border rounded-2xl p-6 hover:border-primary/50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  Our Objective
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Empower FAST-NUCES students with access to a network of
                  successful alumni for guidance and career opportunities.
                </p>
              </div>

              <div className="bg-card border rounded-2xl p-6 hover:border-secondary/50 transition-colors sm:mt-6">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bridge the gap between academic learning and professional
                  success through peer-to-peer knowledge sharing.
                </p>
              </div>

              {/* Spanning accent card */}
              <div className="sm:col-span-2 bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="text-sm text-foreground font-medium">
                  Completely free for every verified FAST-NUCES student and
                  alumni — no fees, ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              Key Features
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything you need to connect
            </h2>
            <p className="text-muted-foreground text-lg">
              Tools built around how students actually seek guidance and how
              alumni want to give back.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="feature-card bg-card border rounded-2xl p-6 hover:shadow-lg hover:border-primary/40"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          HOW IT WORKS — side-by-side students + alumni
      ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              How It Works
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Simple by design
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Students */}
            <div className="bg-card border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">For Students</h3>
              </div>
              <div className="space-y-6">
                {STUDENT_STEPS.map((s) => (
                  <div key={s.n} className="flex gap-4 items-start">
                    <span className="text-3xl font-black text-primary/20 leading-none w-10 flex-shrink-0">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">
                        {s.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alumni */}
            <div className="bg-card border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">For Alumni</h3>
              </div>
              <div className="space-y-6">
                {ALUMNI_STEPS.map((s) => (
                  <div key={s.n} className="flex gap-4 items-start">
                    <span className="text-3xl font-black text-secondary/25 leading-none w-10 flex-shrink-0">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">
                        {s.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto">
            Join hundreds of FAST-NUCES students and alumni already on the
            platform. It takes less than two minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base px-8 h-12 font-semibold"
              onClick={() => navigate(ROUTES.SIGNUP_CHOICE)}
            >
              Create Your Account
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              // className="gap-2 text-base px-8 h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              className="gap-2 text-base px-8 h-12 border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Log In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
