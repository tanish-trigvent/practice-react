import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const Training = () => {
  const [ctaHover, setCtaHover] = useState(false);
  return (
    <>
      {/* Teams training CTA with hover state */}
      <div
        style={{
          marginTop: 20,
          borderRadius: 12,
          border: `1px solid ${
            ctaHover ? "#66ccff" : "rgba(102, 204, 255, 0.35)"
          }`,
          boxShadow: ctaHover
            ? "0 0 0 1px rgba(102,204,255,0.6), 0 0 18px rgba(102,204,255,0.25)"
            : undefined,
          background: ctaHover
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(255, 255, 255, 0.04)",
          overflow: "hidden",
          transition:
            "border-color 160ms ease, box-shadow 160ms ease, background 160ms ease",
        }}
      >
        <a
          href="#teams-training"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 0,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {/* dotted left rail */}
          <div
            style={{
              width: 28,
              backgroundImage: ctaHover
                ? "radial-gradient(rgba(102,204,255,0.75) 1px, transparent 1px)"
                : "radial-gradient(rgba(102,204,255,0.45) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
              transition: "background-image 160ms ease",
            }}
          />
          {/* main content */}
          <div
            style={{
              flex: 1,
              padding: "18px 20px",
              display: "flex",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    color: ctaHover ? "#8dd8ff" : "#66ccff",
                    fontSize: 22,
                    lineHeight: 1,
                    transition: "color 160ms ease",
                  }}
                >
                  »
                </span>
                <span
                  style={{
                    color: ctaHover ? "#8dd8ff" : "#66ccff",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: 0.3,
                    transition: "color 160ms ease",
                  }}
                >
                  Transform your team with Codecademy Teams training
                </span>
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 16,
                }}
              >
                Help everyone on your team build job-ready skills with a plan
                that offers flexible content assignment, progress tracking, and
                more.
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FiArrowRight
                size={34}
                color={ctaHover ? "#8dd8ff" : "#66ccff"}
                style={{
                  transform: ctaHover ? "translateX(6px)" : "translateX(0)",
                  transition: "transform 160ms ease, color 160ms ease",
                }}
              />
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Training;
