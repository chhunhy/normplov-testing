import "./globals.css";
import SessionWrapper from "./SessionProvider";
import StoreProvider from "./StoreProvider";




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



