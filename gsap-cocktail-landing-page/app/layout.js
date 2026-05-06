import "./globals.css";

export const metadata = {
  title: "GSAP Cocktail Landing Page",
  description: "Learning GSAP by building a cocktail landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
