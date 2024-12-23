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

