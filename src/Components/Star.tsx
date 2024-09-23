import React from "react";

interface StarProps {
  percentage: number;
}

const Star: React.FC<StarProps> = ({ percentage }) => {
  const clipValue = 100 - percentage * 100;

  return (
    <div className="relative w-8 h-8">
      <svg
        className="absolute top-0 left-0"
        fill="none"
        height={"100%"}
        stroke="#FFA500"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
        viewBox="0 0 24 24"
        width={"100%"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <svg
        className="absolute top-0 left-0"
        fill="#FFA500"
        height={"100%"}
        stroke="#FFA500"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
        viewBox="0 0 24 24"
        width={"100%"}
        xmlns="http://www.w3.org/2000/svg"
        style={{ clipPath: `inset(0 ${clipValue}% 0 0)` }}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </div>
  );
};

export default Star;
