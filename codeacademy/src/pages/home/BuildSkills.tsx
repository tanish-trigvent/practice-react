import { useMemo, useState } from "react";
import {
  FaMedal,
  FaJava,
  FaMobileAlt,
  FaBrain,
  FaGamepad,
  FaCloud,
  FaShieldAlt,
  FaNetworkWired,
  FaCode,
  FaCogs,
} from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { SiPython, SiJavascript, SiCplusplus } from "react-icons/si";
import type { IconType } from "react-icons";
import { TbBrandHtml5 } from "react-icons/tb";

type Category = {
  label: string;
  icon?: IconType;
};

const pillBaseStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "14px 18px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid transparent",
  color: "#dcdcdc",
  fontWeight: 600,
  letterSpacing: 0.3,
  cursor: "pointer",
  transition:
    "background 160ms ease, border-color 160ms ease, transform 80ms ease, box-shadow 160ms ease, color 160ms ease",
};

const Tab: React.FC<{
  active: boolean;
  label: string;
  onClick: () => void;
}> = ({ active, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        color: active ? "#ffd400" : "#bfbfbf",
        border: "none",
        fontWeight: 700,
        fontSize: 16,
        padding: "8px 10px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {label}
      {active && (
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -6,
            height: 3,
            borderRadius: 2,
            background: "#ffd400",
            display: "block",
          }}
        />
      )}
    </button>
  );
};

const BuildSkills = () => {
  const [activeTab, setActiveTab] = useState<"top" | "cert">("top");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const topSubjects = useMemo<Category[]>(
    () => [
      { label: "Code foundations", icon: FaMedal },
      { label: "Python", icon: SiPython },
      { label: "HTML & CSS", icon: TbBrandHtml5 },
      { label: "Data science", icon: FaNetworkWired },
      { label: "Professional skills", icon: FaMedal },
      { label: "Java", icon: FaJava },
      { label: "JavaScript", icon: SiJavascript },
      { label: "Web development", icon: TbBrandHtml5 },
      { label: "Data analytics", icon: FaNetworkWired },
      { label: "Interview prep", icon: FaMedal },
      { label: "Web design", icon: TbBrandHtml5 },
      { label: "Machine learning", icon: FaBrain },
      { label: "Computer science", icon: FaNetworkWired },
      { label: "C++", icon: SiCplusplus },
      { label: "Mobile development", icon: FaMobileAlt },
      { label: "AI", icon: FaBrain },
      { label: "IT", icon: FaNetworkWired },
      { label: "C#", icon: FaCode },
      { label: "Game development", icon: FaGamepad },
      { label: "Cloud computing", icon: FaCloud },
      { label: "Cybersecurity", icon: FaShieldAlt },
      { label: "Go", icon: FaGolang },
      { label: "DevOps", icon: FaCogs },
      { label: "Certification prep", icon: FaMedal },
    ],
    []
  );

  const certPrep = useMemo<Category[]>(
    () => [
      { label: "AWS", icon: FaCloud },
      { label: "Azure", icon: FaCloud },
      { label: "Google Cloud", icon: FaCloud },
      { label: "Kubernetes", icon: FaCogs },
      { label: "Security+", icon: FaShieldAlt },
      { label: "DevOps", icon: FaCogs },
    ],
    []
  );

  const categories = activeTab === "top" ? topSubjects : certPrep;

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "80%", color: "#e9e9e9" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              padding: "8px 0 20px 0",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: 40,
                letterSpacing: 0.5,
              }}
            >
              Build skills that stand out
            </h2>

            <div
              style={{
                display: "flex",
                gap: 24,
                position: "relative",
                paddingBottom: 10,
              }}
            >
              <Tab
                active={activeTab === "top"}
                label="Top subjects"
                onClick={() => setActiveTab("top")}
              />
              <Tab
                active={activeTab === "cert"}
                label="Certification prep"
                onClick={() => setActiveTab("cert")}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {categories.map((c, index) => {
              const isHover = hoverIndex === index;
              const Icon = c.icon;
              return (
                <div
                  key={`${c.label}-${index}`}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  style={{
                    ...pillBaseStyle,
                    background: isHover
                      ? "rgba(255,255,255,0.06)"
                      : pillBaseStyle.background,
                    borderColor: isHover ? "#ffffff" : "rgba(255,255,255,0.2)",
                    boxShadow: isHover
                      ? "0 0 0 1px rgba(255,255,255,0.5) inset, 0 1px 0 rgba(0,0,0,0.5)"
                      : undefined,
                    transform: isHover ? "translateY(-1px)" : "none",
                    height: "80px",
                    padding: "0px 18px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 24,
                      color: isHover ? "#ffd400" : "#cfcfcf",
                    }}
                  >
                    {Icon ? (
                      <Icon color={isHover ? "#ffd400" : "#cfcfcf"} />
                    ) : null}
                  </span>
                  <span
                    style={{
                      fontFamily:
                        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      fontWeight: 700,
                      color: isHover ? "#ffd400" : "#dcdcdc",
                      fontSize: "18px",
                    }}
                  >
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", padding: "26px 0 8px" }}>
            <a
              href="#catalog"
              style={{
                color: "#ffd400",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Explore the catalog →
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildSkills;
