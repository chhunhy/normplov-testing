import "@/app/globals.css";
import type { Metadata } from "next";
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";
import SideBarProfileComponent from "@/components/ProfileComponent/SideBarProfileComponent";
import NavbarPage from "@/components/Navbar/NavbarPage";
import FooterPage from "@/components/Footer/FooterPage";
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

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-bgPrimaryLight ${suwannaphum.className} ${inter} antialiased `}
      >
        <NavbarPage/>
       
        <div className=" lg:flex p-6 gap-6">
          {/* Sidebar */}
          <SideBarProfileComponent />
           
          {/* Main Content */}
          <main className=" w-full h-auto">{children}</main>
        </div>
        <FooterPage/>
      </body>
    </html>
  );
}
