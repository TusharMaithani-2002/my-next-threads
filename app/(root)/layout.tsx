import "../../app/globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next thread application",
  description:
    "full stack nextjs application which is a better replica of threads by meta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TopBar />

          <main>
            <LeftSideBar />
                <section className="main-container">
                <div className="q-full max-w-4xl">
                  {children}
                </div>
                </section>
            <RightSideBar />
          </main>
          {children}
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
