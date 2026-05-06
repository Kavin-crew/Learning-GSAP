import "./globals.css";
import localFont from "next/font/local";

const monaSans = localFont({
  src: [
    {
      path: "../public/fonts/MonaSansDisplay-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mona-sans",
});

export const metadata = {
  title: "GSAP Cocktail Landing Page",
  description: "Learning GSAP by building a cocktail landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${monaSans.variable}`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
