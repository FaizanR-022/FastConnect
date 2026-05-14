import {
  MapPin,
  GraduationCap,
  Briefcase,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

export default function AlumniCard({ alumni, onClick }) {
  const maxPrevCompanies = 2;
  const visiblePrev = alumni.previousCompanies.slice(0, maxPrevCompanies);
  const remainingPrev = alumni.previousCompanies.length - maxPrevCompanies;

  const maxTags = 3;
  const visibleTags = alumni.expertise.slice(0, maxTags);
  const extraTags = alumni.expertise.length - maxTags;

  return (
    <>
      <style>{`
        .alumni-card {
          transition: box-shadow 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
          border-left: 3px solid transparent;
        }
        .alumni-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px -8px rgba(0,0,0,0.12);
          border-left-color: var(--color-primary);
        }
        .alumni-card .view-btn {
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
        }
        .alumni-card:hover .view-btn {
          background: var(--color-primary);
          color: var(--color-primary-foreground);
          border-color: var(--color-primary);
        }
        .alumni-card:hover .view-btn .view-arrow {
          transform: translateX(3px);
        }
        .alumni-card .view-arrow {
          transition: transform 0.18s ease;
        }
      `}</style>

      <Card
        className="alumni-card cursor-pointer h-full flex flex-col overflow-hidden"
        onClick={() => onClick(alumni)}
      >
        <CardContent className="p-0 flex flex-col flex-1">
          {/* ── Header ──────────────────────────────────────────────── */}
          <div className="px-4 pt-4 pb-3 flex items-start gap-3">
            <Avatar className="w-11 h-11 flex-shrink-0">
              {alumni.profilePicture && (
                <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                  {alumni.avatar}
                </AvatarFallback>
              )}
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                {alumni.avatar}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-base leading-tight truncate">
                {alumni.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Class of {alumni.graduationYear}
                {alumni.campus ? ` · ${alumni.campus}` : ""}
              </p>
            </div>
          </div>

          {/* ── Current role ────────────────────────────────────────── */}
          <div className="px-4 pb-3">
            <div className="bg-primary/5 border border-primary/10 rounded-xl px-3 py-2.5">
              <div className="flex items-start gap-2">
                <Briefcase className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">
                    {alumni.currentPosition}
                  </p>
                  <p className="text-xs text-primary font-medium truncate">
                    {alumni.company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Detail rows ─────────────────────────────────────────── */}
          <div className="px-4 pb-3 space-y-1.5 flex-1">
            {/* Department */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{alumni.department}</span>
            </div>

            {/* Location */}
            {alumni.location && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{alumni.location}</span>
              </div>
            )}

            {/* Previous companies */}
            {visiblePrev.length > 0 && (
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Building2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="truncate">
                  Previously:{" "}
                  <span className="text-foreground/70">
                    {visiblePrev.map((pc) => pc.companyName).join(", ")}
                    {remainingPrev > 0 && (
                      <span className="text-muted-foreground">
                        {" "}
                        +{remainingPrev}
                      </span>
                    )}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* ── Expertise tags ──────────────────────────────────────── */}
          {alumni.expertise.length > 0 && (
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-1.5">
                {visibleTags.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
                {extraTags > 0 && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border text-muted-foreground">
                    +{extraTags}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <div className="px-4 pb-4 mt-auto">
            <div className="view-btn w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border text-sm font-semibold text-muted-foreground">
              View Profile
              <ArrowRight className="view-arrow w-3.5 h-3.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
