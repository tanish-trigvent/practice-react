import {
  FaGoogle,
  FaApple,
  FaInstagram,
  FaSpotify,
  FaRedditAlien,
} from "react-icons/fa";
import { TbBrandMeta } from "react-icons/tb";
import { SiEa } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa6";

const iconStyle: React.CSSProperties = {
  color: "#cfcfcf",
  opacity: 0.9,
  width: 56,
  height: 56,
};

const Learner = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
        padding: "24px 0",
      }}
    >
      <div
        style={{
          color: "rgba(255, 255, 255, 0.65)",
          fontSize: 20,
          letterSpacing: 1.2,
        }}
      >
        Our learners work at
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, minmax(48px, 1fr))",
          gap: 40,
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <TbBrandMeta style={iconStyle} />
        <FaMicrosoft style={iconStyle} />
        <FaGoogle style={iconStyle} />
        <SiEa style={iconStyle} />
        <FaApple style={iconStyle} />
        <FaInstagram style={iconStyle} />
        <FaSpotify style={iconStyle} />
        <FaRedditAlien style={iconStyle} />
        <span
          aria-label="IBM"
          title="IBM"
          style={{
            color: "#cfcfcf",
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: 2,
            backgroundImage:
              "repeating-linear-gradient(180deg, #cfcfcf 0 2px, rgba(207,207,207,0.2) 2px 4px)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          IBM
        </span>
      </div>
    </div>
  );
};

export default Learner;
