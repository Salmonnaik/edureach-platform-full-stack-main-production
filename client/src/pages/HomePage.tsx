import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import SignupPopup from "../components/SignupPopup";
import CallPopup from "../components/CallPopup";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AchievementsSection from "../components/AchievementsSection";
import CoursesSection from "../components/CoursesSection";
import QuotesSection from "../components/QuotesSection";
import MentorsSection from "../components/MentorsSection";
import StudentLifeSection from "../components/StudentLifeSection";
import EventsGallery from "../components/EventsGallery";
import CounselorCTA from "../components/CounselorCTA";
import HiringStatsSection from "../components/HiringStatsSection";
import Footer from "../components/Footer";

// ─── Types ────────────────────────────────────────────────
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// ─── Scroll reveal hook ───────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms,
                     transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Shared style constants ───────────────────────────────
const FONTS = {
  display: "'Cormorant Garamond', Georgia, serif",
  body:    "'DM Sans', system-ui, sans-serif",
  mono:    "'DM Mono', 'Fira Code', monospace",
};

const C = {
  navy:      "#0b1628",
  navyMid:   "#122040",
  navyLight: "#1a2f55",
  gold:      "#f59e0b",
  goldLight: "#fbbf24",
  cream:     "#faf7f2",
  slate400:  "#94a3b8",
  slate500:  "#64748b",
  slate600:  "#475569",
  slate700:  "#334155",
  slate200:  "#e2e8f0",
};

// ─── Gate Section ─────────────────────────────────────────
const GATE_FEATURES = [
  "🏡 Student Life",
  "📸 Events Gallery",
  "💼 Placement Stats",
  "🤖 AI Counselor",
  "📞 Call Booking",
];

function GateSection({ onSignup }: { onSignup: () => void }) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: C.cream,
        paddingBottom: 0,
      }}
    >
      {/* ── Blurred skeleton rows ── */}
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          userSelect: "none",
          padding: "80px 32px 80px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          filter: "blur(7px)",
          opacity: 0.3,
        }}
      >
        {[
          [C.slate200, "#cbd5e1", C.slate200],
          ["#cbd5e1", C.slate200, "#cbd5e1"],
          [C.slate200, "#cbd5e1", C.slate200],
        ].map((row, i) => (
          <div
            key={i}
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              width: "100%",
            }}
          >
            {row.map((bg, j) => (
              <div
                key={j}
                style={{ height: 140, borderRadius: 20, background: bg }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* ── Fade overlay ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(250,247,242,0.4) 0%,
            rgba(250,247,242,0.88) 35%,
            ${C.cream} 68%
          )`,
          pointerEvents: "none",
        }}
      />

      {/* ── Gate card ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 20px",
        }}
      >
        <Reveal style={{ width: "100%", maxWidth: 640 } as React.CSSProperties}>
          <div
            style={{
              background: "#ffffff",
              borderRadius: 28,
              border: "1px solid rgba(15,23,42,0.07)",
              boxShadow: "0 24px 64px rgba(15,23,42,0.10)",
              padding: "clamp(36px,5vw,68px) clamp(24px,4vw,60px)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Gold top stripe */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight}, ${C.gold})`,
              }}
            />

            {/* Ambient blobs */}
            <div aria-hidden style={{
              position: "absolute", top: -50, right: -50,
              width: 220, height: 220,
              background: "rgba(245,158,11,0.07)", borderRadius: "50%",
              filter: "blur(40px)", pointerEvents: "none",
            }} />
            <div aria-hidden style={{
              position: "absolute", bottom: -40, left: -40,
              width: 180, height: 180,
              background: "rgba(59,130,246,0.05)", borderRadius: "50%",
              filter: "blur(32px)", pointerEvents: "none",
            }} />

            {/* Lock icon */}
            <div style={{
              width: 64, height: 64, borderRadius: 18, margin: "0 auto 28px",
              background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
              boxShadow: "0 8px 32px rgba(15,23,42,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.75rem",
            }}>
              🔒
            </div>

            {/* Eyebrow */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: 10, marginBottom: 18,
            }}>
              <span style={{ display: "block", width: 28, height: 1.5, background: C.gold }} />
              <span style={{
                fontFamily: FONTS.mono, fontSize: "0.68rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: C.gold, fontWeight: 600,
              }}>
                Members Only
              </span>
              <span style={{ display: "block", width: 28, height: 1.5, background: C.gold }} />
            </div>

            {/* Heading */}
            <h2 style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(1.85rem, 4vw, 2.85rem)",
              fontWeight: 700, lineHeight: 1.18,
              color: C.navy, letterSpacing: "-0.02em",
              marginBottom: 18,
            }}>
              There's a Lot More <br />
              <em style={{ fontStyle: "normal", color: C.gold }}>
                Waiting for You
              </em>
            </h2>

            {/* Subtext */}
            <p style={{
              fontFamily: FONTS.body, fontSize: "1.0625rem",
              color: C.slate500, lineHeight: 1.75,
              maxWidth: 440, margin: "0 auto 28px",
            }}>
              Sign up free to unlock campus life, events gallery, full placement
              statistics, and a live chat with our AI counselor.
            </p>

            {/* Feature pills */}
            <div style={{
              display: "flex", flexWrap: "wrap",
              gap: 8, justifyContent: "center", marginBottom: 32,
            }}>
              {GATE_FEATURES.map((f) => (
                <span key={f} style={{
                  fontFamily: FONTS.body, fontSize: "0.8125rem",
                  fontWeight: 500, padding: "6px 16px",
                  borderRadius: 100, background: C.cream,
                  border: `1px solid ${C.slate200}`, color: C.slate600,
                  boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
                }}>
                  {f}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{
              display: "flex", flexWrap: "wrap",
              gap: 14, justifyContent: "center", marginBottom: 24,
            }}>
              <GoldButton onClick={onSignup}>🚀 Sign Up — It's Free</GoldButton>
              <GhostButton onClick={onSignup}>Already have an account? Log in →</GhostButton>
            </div>

            {/* Trust */}
            <p style={{
              fontFamily: FONTS.mono, fontSize: "0.7rem",
              color: C.slate400, letterSpacing: "0.05em",
            }}>
              No credit card · No spam · 15,000+ students already joined
            </p>
          </div>
        </Reveal>
      </div>

      {/* Spacer to give the absolute card room */}
      <div aria-hidden style={{ height: 560 }} />
    </section>
  );
}

// ─── Reusable button atoms ────────────────────────────────
function GoldButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "14px 34px", borderRadius: 100,
        background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
        color: C.navy, fontFamily: FONTS.body,
        fontSize: "0.9375rem", fontWeight: 700,
        border: "none", cursor: "pointer",
        boxShadow: hov
          ? "0 12px 36px rgba(245,158,11,0.55)"
          : "0 8px 24px rgba(245,158,11,0.38)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "14px 34px", borderRadius: 100,
        background: "#ffffff", color: hov ? C.gold : C.slate700,
        fontFamily: FONTS.body, fontSize: "0.9375rem", fontWeight: 600,
        border: `1.5px solid ${hov ? C.gold : C.slate200}`,
        cursor: "pointer",
        boxShadow: hov
          ? "0 8px 24px rgba(245,158,11,0.14)"
          : "0 2px 8px rgba(15,23,42,0.06)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {children}
    </button>
  );
}

// ─── HomePage ─────────────────────────────────────────────
export default function HomePage() {
  const { user } = useAuth();
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showCallPopup,   setShowCallPopup]   = useState(false);

  const handleReachMentors = () => {
    if (!user && !sessionStorage.getItem("popupShown")) {
      setShowSignupPopup(true);
      sessionStorage.setItem("popupShown", "true");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.cream }}>

      {/* ── Always visible ───────────────────────── */}
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <CoursesSection />
      <QuotesSection />
      <MentorsSection onReachMentors={handleReachMentors} />

      {/* ── Auth gate ────────────────────────────── */}
      {user ? (
        <>
          <StudentLifeSection />
          <EventsGallery />
          <CounselorCTA onOpenCall={() => setShowCallPopup(true)} />
          <HiringStatsSection />
          <Footer />
        </>
      ) : (
        <>
          <GateSection onSignup={() => setShowSignupPopup(true)} />
          <Footer />
        </>
      )}

      {/* ── Overlays ─────────────────────────────── */}
      <SignupPopup
        show={showSignupPopup}
        onClose={() => setShowSignupPopup(false)}
      />
      <CallPopup
        open={showCallPopup}
        onClose={() => setShowCallPopup(false)}
      />
    </div>
  );
}