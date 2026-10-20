import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const jet = JetBrains_Mono({ variable: "--font-jet", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haseeb Ahmed | AI Engineer",
  description:
    "AI Engineer building production LLM, RAG, voice AI and computer vision systems. FastAPI, LangChain, OpenAI, YOLO, Docker, AWS.",
  keywords: [
    "Haseeb Ahmed",
    "AI Engineer",
    "LLM",
    "RAG",
    "LangChain",
    "Voice AI",
    "Computer Vision",
    "FastAPI",
    "Generative AI",
  ],
  authors: [{ name: "Haseeb Ahmed" }],
  openGraph: {
    title: "Haseeb Ahmed | AI Engineer",
    description: "Production AI systems: voice agents, RAG pipelines and computer vision.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} ${jet.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
