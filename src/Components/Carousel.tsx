import React, { useState, useEffect, useRef } from "react";

import { MovieCardData } from "../Models/MoviesModels";
import { TvShowCardData } from "../Models/TvShowsModels";
import TabJob from "./TabJob";

const Carousel: React.FC<{
  projects: {
    job: string;
    movies: MovieCardData[];
    tvShows: TvShowCardData[];
  }[];
  currentJob: string;
  onJobClick: (job: string) => void;
}> = ({ projects, currentJob, onJobClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slidesToShow, setSlidesToShow] = useState(3);

  return (
    <div
      ref={containerRef}
      className="relative w-full whitespace-nowrap overflow-x-auto"
    >
      {projects.length > 0 &&
        projects.map((project) => (
          <TabJob
            job={project.job}
            isActive={project.job === currentJob}
            key={project.job}
            onJobClick={onJobClick}
          />
        ))}
    </div>
  );
};

export default Carousel;
