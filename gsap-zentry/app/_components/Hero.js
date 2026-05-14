"use client";
import { useRef, useState } from "react";
import Button from "@/app/_components/Button";
import { TiLocationArrow } from "react-icons/ti";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4; // Total number of videos to load
  const nextVideoRef = useRef(null);

  // Calculate the next video index
  // 0 % 4 = 0 + 1 = 1
  // 1 % 4 = 1 + 1 = 2
  // 2 % 4 = 2 + 1 = 3
  // 3 % 4 = 3 + 1 = 4
  // 4 % 4 = 0 + 1 = 1
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  function handleMiniVideoClick() {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
  }

  function getVideoSrc(index) {
    return `videos/hero-${index}.mp4`;
  }

  function handleVideoLoad() {
    setLoadedVideos((prev) => prev + 1);
  }

  return (
    <section className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* mini video */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center rounded-lg"
                src={getVideoSrc(upcomingVideoIndex)}
                onLoadedData={handleVideoLoad}
                loop
                muted
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            src={getVideoSrc(currentIndex)}
            onLoadedData={handleVideoLoad}
            loop
            muted
          />

          {/* main video */}
          <video
            loop
            // autoPlay
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            src={getVideoSrc(currentIndex)}
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br />
              Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer "
              LeftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
        G<b>a</b>ming
      </h1>
    </section>
  );
}
