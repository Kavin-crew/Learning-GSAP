import FlairCursorTrailSection from "@/app/_components/FlairCursorTrailSection";

const flairImages = [
  "https://cdn-icons-png.magnific.com/512/18969/18969020.png",
  "https://cdn-icons-png.magnific.com/512/983/983816.png",
  "https://cdn-icons-png.magnific.com/512/825/825629.png",
  "https://cdn-icons-png.magnific.com/512/838/838164.png",
  "https://cdn-icons-png.magnific.com/512/4036/4036848.png",
  "https://cdn-icons-png.magnific.com/512/229/229878.png",
  "https://cdn-icons-png.magnific.com/512/3601/3601901.png",
  "https://cdn-icons-png.magnific.com/512/982/982950.png",
  "https://cdn-icons-png.magnific.com/512/4808/4808033.png",
  "https://cdn-icons-png.magnific.com/512/10600/10600421.png",
  "https://cdn-icons-png.magnific.com/512/1265/1265750.png",
  "https://cdn-icons-png.magnific.com/512/1528/1528600.png",
  "https://cdn-icons-png.magnific.com/512/16250/16250738.png",
  "https://cdn-icons-png.magnific.com/512/9650/9650604.png",
  "https://cdn-icons-png.magnific.com/512/4982/4982499.png",
];

export default function Hero() {
  return (
    <FlairCursorTrailSection
      images={[...flairImages]}
      gap={120}
      size={80}
      className="min-h-screen pt-20 flex justify-center items-center"
    >
      <video
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="max-w-600 mx-auto px-8">
        <h1 className="font-sans text-[clamp(6rem,20vw,19rem)] text-center font-bold uppercase leading-[0.7] tracking-[-28px] relative">
          Front-end Dev
          <div className="uppercase text-base font-semibold tracking-[30px] gap-[2dvw] flex absolute right-0 -bottom-15 z-10">
            <span>Based</span>
            <span>in</span>
            <span>Ph</span>
          </div>
        </h1>
      </div>
    </FlairCursorTrailSection>
  );
}
