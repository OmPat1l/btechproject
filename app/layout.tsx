import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dr. Rahul Chinawale | Expert Healthcare & Offshore Medical Services",
  description:
    "Dr. Rahul Chinawale, an experienced medical professional specializing in emergency care, offshore medical services, and endocrinology. Trusted healthcare in Dombivli & Thane.",
  keywords:
    "Dr. Rahul Chinawale, healthcare, offshore doctor, emergency medicine, endocrinologist, Thane, Dombivli, best doctor",
  openGraph: {
    title:
      "Dr. Rahul Chinawale | Expert Healthcare & Offshore Medical Services",
    description:
      "Specialist in emergency medicine, endocrinology, and offshore medical services. Book an appointment today.",
    url: "https://rahulchinawale.in",
    type: "website",
    images: [
      {
        url: "https://rahulchinawale.in/profile.png",
        width: 1200,
        height: 630,
        alt: "Dr. Rahul Chinawale - Expert Healthcare Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dr. Rahul Chinawale | Expert Healthcare & Offshore Medical Services",
    description:
      "Get professional healthcare services from Dr. Rahul Chinawale, specializing in emergency medicine, endocrinology, and offshore medical assistance.",
    images: ["https://rahulchinawale.in/profile.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              name: "Dr. Rahul Chinawale",
              url: "https://rahulchinawale.in",
              image: "https://rahulchinawale.in/profile.png",
              description:
                "Specialized in emergency medicine, endocrinology, and offshore medical services.",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "B-302, Kasturi Vihar CHS, Ambika Nagar, M.G. Road, Dombivli - West, Thane",
                addressLocality: "Thane",
                addressRegion: "MH",
                postalCode: "421202",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 9930908114",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
