import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUNA NAIL STUDIO | Where Beauty Becomes Art",
  description:
    "A fictional luxury nail studio. Expert gel manicures, acrylic sets, custom nail art, and spa treatments by certified nail artists.",
  keywords: "nail salon, luxury nails, gel manicure, acrylic nails, nail art, Vancouver",
  openGraph: {
    title: "LUNA NAIL STUDIO | Where Beauty Becomes Art",
    description: "A fictional luxury nail studio — expert nail art, gel manicures, and spa treatments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ fontFamily: "var(--font-poppins, sans-serif)" }}>
        {children}
        <div role="note" style={{position:"fixed",left:12,bottom:12,zIndex:99999,background:"#2d1b3d",color:"#fff",font:"600 12.5px/1.35 system-ui, sans-serif",padding:"8px 12px",borderRadius:10,boxShadow:"0 6px 18px rgba(0,0,0,.25)",maxWidth:260}}>
          Portfolio demo with a fictional brand. Not a real salon.
        </div>
      </body>
    </html>
  );
}
