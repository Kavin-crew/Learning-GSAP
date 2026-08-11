import { Sofia_Sans_Condensed, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/Navbar";

const sofiaSans = Sofia_Sans_Condensed({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Kavin A. — Impact-Driven Developer",
  description:
    "Personal Portfolio of Kavin Abregana, a Junior Web Developer with over 4 years of experience building responsive, impact-driven websites.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sofiaSans.variable} ${splineMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
