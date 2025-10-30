import { useEffect, useState } from "react";
import careerDesktop from "../../assets/images/career-desktop.webp";
import potentialDesktop from "../../assets/images/potential-desktop.webp";
import selfDesktop from "../../assets/images/self-desktop.webp";
import skillsDesktop from "../../assets/images/skills-desktop.webp";
import teamDesktop from "../../assets/images/team-desktop.webp";
import TextType from "../../components/animations/textType/TextType";

const images = [
  careerDesktop,
  potentialDesktop,
  selfDesktop,
  skillsDesktop,
  teamDesktop,
];

const SLIDE_DURATION_MS = 4000; // time each image stays visible
const FADE_DURATION_MS = 800; // crossfade time

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const labels = ["/skills", "/career", "/potential", "/self", "/team"];
  const labelColors = [
    "#ffd400",
    "rgb(174, 233, 56)",
    "rgb(233, 28, 18)",
    "rgb(255, 140, 0)",
    "rgb(103, 196, 255)",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        lineHeight: 0,
        borderRadius: "10px",
        height: "570px",
      }}
    >
      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          lineHeight: 1.1,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(0,0,0,0.85)",
            color: "#fff",
            borderRadius: 12,
            padding: "10px 16px",
            fontSize: 56,
            fontWeight: 800,
          }}
        >
          Develop your
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(0,0,0,0.85)",
            color: "#ffd400",
            borderRadius: 12,
            padding: "10px 16px",
            fontSize: 52,
            fontWeight: 700,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
        >
          <TextType
            key={currentIndex}
            text={labels[currentIndex]}
            textColors={[labelColors[currentIndex]]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
          />
        </div>
      </div>
      {/* Images */}
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <img
            key={index}
            src={src}
            alt={`banner-slide-${index + 1}`}
            style={{
              width: "100%",
              display: "block",
              position: "absolute",
              inset: 0,
              //   height: "500px",
              objectFit: "cover",
              opacity: isActive ? 1 : 0,
              transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
            }}
          />
        );
      })}
      {/* Reserve layout height using the first image as intrinsic height */}
      <img
        src={images[0]}
        alt="banner-placeholder"
        style={{ width: "100%", visibility: "hidden" }}
      />
    </div>
  );
};

export default Banner;
