import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "./SessionProvider";
import StoreProvider from "./StoreProvider";


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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body >
        <SessionWrapper>
          <StoreProvider>
            {children}
          </StoreProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}



