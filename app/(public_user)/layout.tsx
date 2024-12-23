import type { Metadata } from "next";
import "@/app/globals.css";
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";
import NavbarPage from "@/components/Navbar/NavbarPage";
import FooterPage from "@/components/Footer/FooterPage";
import FloatingButtons from "@/components/General/FloatingButton";

const suwannaphum = Suwannaphum({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
		template: "NormPlov",
		default: "NormPlov",
	},
  description: `NormPlov is driven by a clear set of goals aimed at guiding students towards informed academic and career choices. Our primary objective is to provide personalized recommendations that match students' personality, skills, learning styles, interests, and values, helping them find paths that align with their potential. `,
  openGraph: {
		title: {
			template: "%s - NormPlov",
			default: "NormPlov",
		},
		description: `NormPlov is driven by a clear set of goals aimed at guiding students towards informed academic and career choices. Our primary objective is to provide personalized recommendations that match students' personality, skills, learning styles, interests, and values, helping them find paths that align with their potential.`,
		images: ["https://normplov-api.shinoshike.studio/assets/metadata.png"],
		url: "https://normplov.shinoshike.studio",
	},
  icons: {
    icon: "/assets/logo.jpg", // Logo for favicon (replace with your actual logo path)
    apple: "/assets/logo.jpg", // Apple touch icon (iOS)
    shortcut: "/assets/logo.jpg", // Shortcut icon for browsers
  },
};
export default function PublicUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${suwannaphum.className} ${inter} antialiased`}>
        <NavbarPage />
        <main className="w-full"> {children} <FloatingButtons/> </main>
        <FooterPage />
      </body>
    </html>
  );
}

