import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useAuthStore from "../../store/authStore";
import { getInitials } from "../../utils/userInfoHelpers";
import { ROUTES } from "../../constants/constants";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

export const WelcomeSection = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return null;

  const isAlumni = user.role === "alumni";
  const greeting = getGreeting();

  const tealGlow = "rgba(20, 184, 166, 0.14)";
  const amberGlow = "rgba(245, 158, 11, 0.12)";
  const accentGlow = isAlumni ? amberGlow : tealGlow;
  const accentColor = isAlumni ? "#fbbf24" : "#2dd4bf";
  const btnBg = isAlumni ? "#d97706" : "#0f766e";
  const btnShadow = isAlumni
    ? "0 4px 20px rgba(217,119,6,0.30)"
    : "0 4px 20px rgba(15,118,110,0.30)";

  return (
    <div className="container mx-auto pb-8">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(145deg, #071f1c 0%, #0d3530 45%, #0f4540 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Corner glow */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`,
          }}
        />

        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-6 py-6 sm:px-8 sm:py-7">
          {/* Left — avatar + name */}
          <div className="flex items-center gap-4">
            <Avatar
              className="w-14 h-14 flex-shrink-0"
              style={{ border: "2px solid rgba(255,255,255,0.13)" }}
            >
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback
                className="text-lg font-black"
                style={{
                  background: isAlumni
                    ? "linear-gradient(135deg,#d97706,#b45309)"
                    : "linear-gradient(135deg,#0f766e,#065f46)",
                  color: "#fff",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.14em] mb-0.5">
                {greeting}
              </p>

              <h2
                className="font-black text-white leading-none"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                }}
              >
                {user.firstName}{" "}
                <span style={{ color: accentColor }}>{user.lastName}</span>
              </h2>

              {/* Meta row */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: isAlumni
                      ? "rgba(245,158,11,0.15)"
                      : "rgba(20,184,166,0.15)",
                    color: accentColor,
                    border: `1px solid ${accentColor}22`,
                  }}
                >
                  {isAlumni ? "Alumni" : "Student"}
                </span>

                {user.department && (
                  <span className="text-white/35 text-xs">
                    {user.department}
                    {user.campus ? ` · ${user.campus}` : ""}
                  </span>
                )}

                {!isAlumni && user.batch && (
                  <span className="text-white/25 text-xs">
                    Batch {user.batch}
                  </span>
                )}

                {isAlumni && user.currentPosition && user.currentCompany && (
                  <span className="text-white/25 text-xs hidden sm:inline">
                    {user.currentPosition} at {user.currentCompany}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right — message + CTA */}
          <div className="flex flex-col sm:items-end gap-3">
            <p className="text-white/38 text-sm leading-relaxed max-w-[280px] sm:text-right">
              {isAlumni
                ? "Your experience can shape someone's career today."
                : "The right connection can change your trajectory."}
            </p>

            <button
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95 hover:-translate-y-0.5"
              style={{
                background: btnBg,
                color: "#fff",
                boxShadow: btnShadow,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              onClick={() =>
                navigate(isAlumni ? ROUTES.ALL_POSTS : ROUTES.ALUMNI_LIST)
              }
            >
              {isAlumni ? (
                <MessageSquare className="w-4 h-4" />
              ) : (
                <Users className="w-4 h-4" />
              )}
              {isAlumni ? "Answer Questions" : "Browse Alumni"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
