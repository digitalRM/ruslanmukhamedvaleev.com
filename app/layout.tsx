import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://www.ruslanmukhamedvaleev.com"),
  title: {
    default: "Ruslan Mukhamedvaleev - Student, Researcher & Developer",
    template: "%s | Ruslan Mukhamedvaleev",
  },
  description:
    "Ruslan Mukhamedvaleev is a researcher, student, and developer focused on design, machine learning, and web development. Co-Founder of Koel Labs, Founder of FOYM, and Research Assistant at Washington State University.",
  keywords: [
    "Ruslan Mukhamedvaleev",
    "Koel Labs",
    "Student Researcher",
    "Web Developer",
    "FOYM Founder",
    "Washington State University",
    "Machine Learning",
    "Design",
    "Research Assistant",
    "Student Developer",
  ],
  authors: [{ name: "Ruslan Mukhamedvaleev", url: "https://www.ruslan.in" }],
  creator: "Ruslan Mukhamedvaleev",
  publisher: "Ruslan Mukhamedvaleev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Ruslan Mukhamedvaleev - Student, Researcher & Developer",
    description:
      "Ruslan Mukhamedvaleev is a researcher, student, and developer focused on design, machine learning, and web development. Co-Founder of Koel Labs, Founder of FOYM, and Research Assistant at Washington State University.",
    url: "https://www.ruslanmukhamedvaleev.com",
    siteName: "Ruslan Mukhamedvaleev",
    images: [
      {
        url: "/openGraph.png",
        width: 1600,
        height: 900,
        alt: "Ruslan Mukhamedvaleev - Student, Researcher & Developer",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruslan Mukhamedvaleev - Student, Researcher & Developer",
    description:
      "Ruslan Mukhamedvaleev is a researcher, student, and developer focused on design, machine learning, and web development. Co-Founder of Koel Labs, Founder of FOYM, and Research Assistant at Washington State University.",
    images: ["/openGraph.png"],
    creator: "@mukhamedvaleev",
    site: "@mukhamedvaleev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.ruslanmukhamedvaleev.com",
  },
  category: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "@id": "https://www.ruslanmukhamedvaleev.com/#person",
                "name": "Ruslan Mukhamedvaleev",
                "givenName": "Ruslan",
                "familyName": "Mukhamedvaleev",
                "description": "Ruslan Mukhamedvaleev is a researcher, student, and developer focused on design, machine learning, and web development. Co-Founder of Koel Labs, Founder of FOYM, and Research Assistant at Washington State University.",
                "url": "https://www.ruslanmukhamedvaleev.com",
                "image": {
                  "@type": "ImageObject",
                  "url": "https://www.ruslanmukhamedvaleev.com/openGraph.png",
                  "width": 1600,
                  "height": 900
                },
                "sameAs": [
                  "https://www.ruslanmukhamedvaleev.com",
                  "https://www.ruslan.in",
                  "https://github.com/digitalRM",
                  "https://www.linkedin.com/in/ruslan-muk/",
                  "https://www.instagram.com/ruslan_mk11/",
                  "https://builders.mozilla.org/profile/ruslan-mukhamedvaleev/",
                  "https://www.foym.org",
                  "https://www.behance.net/mukhamedvaleev",
                  "https://dribbble.com/RuslanMukhamedvaleev",
                  "https://x.com/mukhamedvaleev",
                  "https://scholar.google.com/citations?user=yci2oWcAAAAJ"
                ],
                "alumniOf": {
                  "@type": "Organization",
                  "name": "Kamiak High School",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Mukilteo",
                    "addressRegion": "Washington",
                    "addressCountry": "US"
                  }
                },
                "affiliation": [
                  {
                    "@type": "Organization",
                    "name": "Koel Labs",
                    "url": "https://koellabs.com",
                    "role": "Co-Founder"
                  },
                  {
                    "@type": "Organization",
                    "name": "Washington State University",
                    "url": "https://wsu.edu",
                    "role": "Research Assistant"
                  },
                  {
                    "@type": "Organization",
                    "name": "Mukilteo Robotics",
                    "url": "https://www.mukilteorobotics.org",
                    "role": "Member"
                  },
                  {
                    "@type": "Organization",
                    "name": "Legislative Youth Advisory Council",
                    "url": "https://walyac.org",
                    "role": "Member"
                  },
                  {
                    "@type": "Organization",
                    "name": "FOYM",
                    "url": "https://www.foym.org",
                    "role": "Founder"
                  }
                ],
                "knowsAbout": [
                  "Machine Learning",
                  "Web Development",
                  "UI/UX Design",
                  "Research",
                  "Robotics"
                ],
                "jobTitle": [
                  "Student Researcher",
                  "Developer",
                  "Research Assistant"
                ]
              }
            }
          `}
        </Script>
      </head>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
