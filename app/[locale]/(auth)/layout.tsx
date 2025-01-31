import type { Metadata } from "next";
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
// import { Toast } from "@/components/ui/toaster"

const suwannaphum = Suwannaphum({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["khmer"],
  display: "swap",
  variable: "--font-suwannaphum",
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: {
    template: "NormPlov",
    default: "NormPlov",
  },
  description: `NormPlov: Find your perfect major and confindence career.`,
  openGraph: {
    title: {
      template: "%s - NormPlov",
      default: "NormPlov",
    },
    description: `NormPlov: Find your perfect major and confindence career.`,
    images: ["https://normplov-api.shinoshike.studio/assets/metadata.png"],
    url: "https://normplov.shinoshike.studio",
  },
  icons: {
    icon: "/assets/logo.jpg", // Logo for favicon (replace with your actual logo path)
    apple: "/assets/logo.jpg", // Apple touch icon (iOS)
    shortcut: "/assets/logo.jpg", // Shortcut icon for browsers
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${suwannaphum.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        {/* Main content */}
        <main> {children}</main>
        <Toaster />
      </body>
    </html>
  );
}
