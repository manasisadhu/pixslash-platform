import Header from "@/components/Header/Header";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import { geistSans } from "@/lib/fonts";
import { RootLayoutProps } from "@/lib/type";
import { cn } from "@/lib/utils";
import "./globals.css";

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      className={cn("font-sans", geistSans.variable)}
      suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem={false}>
          <Header />

          <main className="mx-auto max-w-7xl">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
