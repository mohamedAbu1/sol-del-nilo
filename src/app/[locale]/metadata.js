// src/app/[locale]/page.tsx أو src/app/[locale]/layout.tsx

export async function generateMetadata({ params }) {
  const locale = params.locale;

  const isSpanish = locale === "es";
  const isFrench = locale === "fr";
  const isGerman = locale === "de";
  const isItalian = locale === "it";

  return {
    title: isSpanish
      ? "Descubre Egipto | SolDelNilo"
      : isFrench
      ? "Découvrez l'Égypte | SolDelNilo"
      : isGerman
      ? "Entdecke Ägypten | SolDelNilo"
      : isItalian
      ? "Scopri l'Egitto | SolDelNilo"
      : "Discover Egypt | SolDelNilo",

    description: isSpanish
      ? "Descubre la magia de Egipto con SolDelNilo..."
      : isFrench
      ? "Découvrez la magie de l'Égypte avec SolDelNilo..."
      : isGerman
      ? "Erlebe die Magie Ägyptens mit SolDelNilo..."
      : isItalian
      ? "Vivi la magia dell'Egitto con SolDelNilo..."
      : "Experience the magic of Egypt with SolDelNilo...",

    openGraph: {
      title: "SolDelNilo",
      description: "Explore Egypt with SolDelNilo",
      url: `https://yourdomain.com/${locale}`,
      images: [
        {
          url: "https://yourdomain.com/assets/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "SolDelNilo - Discover Egypt",
        },
      ],
      type: "website",
    },

    alternates: {
      canonical: `https://yourdomain.com/${locale}`,
      languages: {
        en: "https://yourdomain.com/en",
        ar: "https://yourdomain.com/ar",
        es: "https://yourdomain.com/es",
        fr: "https://yourdomain.com/fr",
        de: "https://yourdomain.com/de",
        it: "https://yourdomain.com/it",
      },
    },
  };
}
