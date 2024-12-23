import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import "../globals.css";
import { Inter, Suwannaphum } from "next/font/google";


const suwannaphum = Suwannaphum({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suwannaphum.className} ${inter} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full h-screen overflow-hidden">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>

    </html>
  );
}


