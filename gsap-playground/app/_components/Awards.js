import AnimatedHeading from "./AnimatedHeading";
import CursorImagePreview from "./CursorImagePreview";

const ITEMS = [
  {
    company: "Yotpo",
    title: "Top Performer",
    when: "2024 - 2025",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064350/portfolio-images/achievements-yotpo_y23f20.jpg",
    ],
  },
  {
    company: "Proweaver",
    title: "WordPress Ace Developer",
    when: "Feb. 2023",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064349/portfolio-images/Feb_2023_acpv33.jpg",
    ],
  },
  {
    company: "Proweaver",
    title: "Top Performer",
    when: "Nov. 2022",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064350/portfolio-images/Nov_-_2022_bllx54.jpg",
    ],
  },
  {
    company: "Proweaver",
    title: "Top Performer",
    when: "Oct. 2022",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064350/portfolio-images/Oct_-_2022_cert_hxkx1b.jpg",
    ],
  },
  {
    company: "Proweaver",
    title: "WordPress Ace Developer",
    when: "Oct. 2022",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064350/portfolio-images/Oct_2022_mxtur9.jpg",
    ],
  },
  {
    company: "Proweaver",
    title: "WordPress Ace Developer",
    when: "Sept. 2022",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064351/portfolio-images/Sept_2022_cd7uq8.jpg",
    ],
  },
];

const CERTS = [
  {
    company: "Udemy",
    title: "The Ultimate React Course 2024: React, Next.js, Redux & More",
    when: "Feb. 2024",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064351/portfolio-images/React-2024_eiquva.jpg",
    ],
  },
  {
    company: "Udemy",
    title: "The Complete JavaScript Course 2023: From Zero to Expert!",
    when: "Sept. 2023",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064349/portfolio-images/JS-2023_ai0mih.jpg",
    ],
  },
  {
    company: "Udemy",
    title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
    when: "Sept. 2023",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064351/portfolio-images/SCSS-2023_kcevdp.jpg",
    ],
  },
  {
    company: "Udemy",
    title: "Build Responsive Real-World Websites with HTML and CSS",
    when: "Nov. 2021",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064351/portfolio-images/SCSS-2023_kcevdp.jpg",
    ],
  },
  {
    company: "Proweaver",
    title: "2-Day Web Development Training",
    when: "Nov. 2021",
    images: [
      "https://res.cloudinary.com/kavin-crew/image/upload/v1768064351/portfolio-images/Nov-2021_cert_cstyh4.jpg",
    ],
  },
];

export default function Awards() {
  return (
    <>
      <section className="bg-[#f7f7f7] min-h-screen max-w-600 mx-auto pt-20">
        <AnimatedHeading className="font-sans text-[clamp(2rem,12dvw+1rem,18rem)] font-bold uppercase leading-[.9] tracking-[-5px] text-[#101010]">
          Awards
        </AnimatedHeading>

        <CursorImagePreview items={ITEMS} />
      </section>

      <section className="bg-[#f7f7f7] min-h-screen max-w-600 mx-auto pt-20">
        <AnimatedHeading className="font-sans text-[clamp(2rem,12dvw+1rem,18rem)] font-bold uppercase leading-[.9] tracking-[-5px] text-[#101010]">
          Certs
        </AnimatedHeading>

        <CursorImagePreview items={CERTS} />
      </section>
    </>
  );
}
