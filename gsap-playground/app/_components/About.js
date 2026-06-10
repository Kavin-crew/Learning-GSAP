import Image from "next/image";
import profile from "@/public/images/dummy-image.png";
import AnimatedHeading from "./AnimatedHeading";

export default function About() {
  return (
    <section id="about" className="min-h-screen pt-20">
      <AnimatedHeading className="font-sans text-8xl font-bold uppercase text-[10dvw] leading-[0.9] tracking-[-15px] text-center">
        About Me
      </AnimatedHeading>

      <div className="max-w-600 mx-auto px-8">
        <article className="flex max-w-9/12 relative min-h-225 z-0 mt-50">
          {/* heading */}
          <div className="w-1/3  bg-[#c7c7c7] flex items-end overflow-hidden">
            <h2 className="font-sans uppercase font-black text-[10dvw] leading-[0.7] tracking-[-10px] -ml-3 -mb-3.5 text-[#F7F7F7]">
              Po
              <br />
              rtf
              <br />
              olio
            </h2>
          </div>

          {/* image area */}
          <div className="image-hero w-1/2  py-5 px-10 flex items-end bg-[#F1F1F1] relative overflow-hidden">
            <Image src={profile} alt="Profile" />
            <span className="text-[50dvw] leading-[0.7] tracking-[-20px] absolute bottom-0 -right-20">
              1
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
