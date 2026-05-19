import { TiLocationArrow } from "react-icons/ti";
import BentoCard from "@/app/_components/BentoCard";
import BentoTilt from "@/app/_components/BentoTilt";

export default function Features() {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular text-lg text-blue-50">
            Into the Metagame Layer
          </p>

          <p className="max-w-md font-circular text-lg text-blue-50 opacity-50">
            Immerse yourself in rich and ever-expanding universe where a
            vibrannt array of products converge into a interconnected overlay
            experience that transforms the way you interact with digital worlds.
          </p>
        </div>

        <div className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="/videos/feature-1.mp4"
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into rewarding adventure."
            title={
              <>
                radi<b>n</b>t
              </>
            }
          />
        </div>

        <div className="grid w-full grid-cols-1 gap-7 md:h-[135vh] md:grid-cols-2 md:grid-rows-3">
          <BentoTilt className="bento-tilt_1 md:row-span-2">
            <BentoCard
              src="/videos/feature-2.mp4"
              description="An anime and gaming inspired NFT collection - the IP primed for expansion"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1">
            <BentoCard
              src="/videos/feature-3.mp4"
              description="A gamified social hub, adding a new dimension of play to social interactions for Web3 communities."
              title={
                <>
                  n<b>e</b>xus
                </>
              }
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1">
            <BentoCard
              src="/videos/feature-4.mp4"
              description="A cross-world AI agent - elevating your gameplay to be more fun and productive"
              title={
                <>
                  az<b>u</b>l
                </>
              }
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h2 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on!
              </h2>

              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <video
              src="/videos/feature-5.mp4"
              className="size-full object-cover object-center"
              loop
              autoPlay
              muted
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
}
