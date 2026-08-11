"use client";

import AnimatedHeading from "./AnimatedHeading";
import CursorImagePreview from "./CursorImagePreview";
import HoverImageReveal from "./HoverImageReveal";
import ProjectList from "./Projectlist";

const CERTS = [
  {
    index: "00-1",
    company: "Udemy",
    title: "The Ultimate React Course 2024: React, Next.js, Redux & More",
    when: "Feb. 2024",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064351/portfolio-images/React-2024_eiquva.jpg",
  },
  {
    index: "00-2",
    company: "Udemy",
    title: "The Complete JavaScript Course 2023: From Zero to Expert!",
    when: "Sept. 2023",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064349/portfolio-images/JS-2023_ai0mih.jpg",
  },
  {
    index: "00-3",
    company: "Udemy",
    title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
    when: "Sept. 2023",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064351/portfolio-images/SCSS-2023_kcevdp.jpg",
  },
  {
    index: "00-4",
    company: "Udemy",
    title: "Build Responsive Real-World Websites with HTML and CSS",
    when: "Nov. 2021",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064349/portfolio-images/HTML_CSS_-_2021_u6buhq.jpg",
  },
  {
    index: "00-5",
    company: "Proweaver",
    title: "2-Day Web Development Training",
    when: "Nov. 2021",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064350/portfolio-images/Nov-2021_wxvm9a.jpg",
  },
];

const AWARDS = [
  {
    index: "00-1",
    company: "Yotpo",
    title: "Top Performer",
    when: "2024 - 2025",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064350/portfolio-images/achievements-yotpo_y23f20.jpg",
  },
  {
    index: "00-2",
    company: "Yotpo",
    title: "Extra Mile Award",
    when: "Dec. 2024",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1783048477/portfolio-images/Extra_Mile_Award_kp42lv.webp",
  },
  {
    index: "00-3",
    company: "Proweaver",
    title: "WordPress Ace Developer",
    when: "Feb. 2023",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064349/portfolio-images/Feb_2023_acpv33.jpg",
  },
  {
    index: "00-4",
    company: "Proweaver",
    title: "Top Performer",
    when: "Nov. 2022",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064350/portfolio-images/Nov_-_2022_bllx54.jpg",
  },
  {
    index: "00-5",
    company: "Proweaver",
    title: "Top Performer",
    when: "Oct. 2022",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064350/portfolio-images/Oct_-_2022_cert_hxkx1b.jpg",
  },
  {
    index: "00-6",
    company: "Proweaver",
    title: "WordPress Ace Developer",
    when: "Oct. 2022",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064350/portfolio-images/Oct_2022_mxtur9.jpg",
  },
  {
    index: "00-7",
    company: "Proweaver",
    title: "WordPress Ace Developer",
    when: "Sept. 2022",
    image:
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064351/portfolio-images/Sept_2022_cd7uq8.jpg",
  },
];

export default function Awards() {
  return (
    <>
      <section
        id="achievements"
        className="bg-[#101010] min-h-screen  mx-auto py-40"
      >
        <AnimatedHeading className="font-sans text-[clamp(2rem,12dvw+1rem,13rem)] text-center font-bold uppercase leading-[.9] tracking-[-5px] text-[#efefef] pb-20">
          Awards
        </AnimatedHeading>
        <ProjectList projects={AWARDS} />
      </section>

      <section className="bg-[#101010] min-h-screen  mx-auto py-40">
        <AnimatedHeading className="font-sans text-[clamp(2rem,12dvw+1rem,13rem)] text-center font-bold uppercase leading-[.9] tracking-[-5px] text-[#efefef] pb-20">
          Certifications
        </AnimatedHeading>
        <ProjectList projects={CERTS} />
      </section>

      {/* <section className="bg-[#f7f7f7] min-h-screen max-w-400 mx-auto pt-20">
        <div className="container mx-auto px-8">
          <AnimatedHeading className="font-sans text-[clamp(2rem,12dvw+1rem,13rem)] text-center font-bold uppercase leading-[.9] tracking-[-5px] text-[#101010]">
            Achievements
          </AnimatedHeading>
          <CursorImagePreview items={ITEMS} />
        </div>
      </section>

      <section className="bg-[#f7f7f7] min-h-screen max-w-400 mx-auto pt-20">
        <div className="container mx-auto px-8">
          <AnimatedHeading className="font-sans text-[clamp(2rem,12dvw+1rem,13rem)] text-center font-bold uppercase leading-[.9] tracking-[-5px] text-[#101010]">
            Certifications
          </AnimatedHeading>
          <CursorImagePreview items={CERTS} />
        </div>
      </section> */}
    </>
  );
}
