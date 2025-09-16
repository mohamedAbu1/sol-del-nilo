export async function generateMetadata({ params }) {
  const locale = params.locale;

  const metadataByLocale = {
    en: {
      title: "Discover Egypt | SolDelNilo",
      description:
        "Experience the magic of Egypt with SolDelNilo. Watch our immersive intro video, explore ancient wonders, and connect with us through stunning visuals and interactive content.",
    },
    es: {
      title: "Descubre Egipto | SolDelNilo",
      description:
        "Experimenta la magia de Egipto con SolDelNilo. Mira nuestro video introductorio, explora maravillas antiguas y conéctate con contenido visual impresionante.",
    },
    fr: {
      title: "Découvrez l'Égypte | SolDelNilo",
      description:
        "Vivez la magie de l'Égypte avec SolDelNilo. Regardez notre vidéo immersive, explorez les merveilles anciennes et profitez d’un contenu visuel captivant.",
    },
    de: {
      title: "Entdecke Ägypten | SolDelNilo",
      description:
        "Erlebe die Magie Ägyptens mit SolDelNilo. Sieh dir unser Intro-Video an, entdecke antike Wunder und genieße beeindruckende visuelle Inhalte.",
    },
    it: {
      title: "Scopri l'Egitto | SolDelNilo",
      description:
        "Vivi la magia dell'Egitto con SolDelNilo. Guarda il nostro video introduttivo, esplora meraviglie antiche e lasciati coinvolgere da contenuti visivi straordinari.",
    },
  };

  const fallback = {
    title: "Discover Egypt | SolDelNilo",
    description:
      "Experience the magic of Egypt with SolDelNilo. Watch our immersive intro video, explore ancient wonders, and connect with us through stunning visuals and interactive content.",
  };

  const selected = metadataByLocale[locale] || fallback;

  return {
    title: selected.title,
    description: selected.description,
    openGraph: {
      title: selected.title,
      description: selected.description,
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
    twitter: {
      card: "summary_large_image",
      title: selected.title,
      description: selected.description,
      images: ["https://yourdomain.com/assets/og-image.jpg"],
    },
    alternates: {
      canonical: `https://yourdomain.com/${locale}`,
      languages: {
        en: "https://yourdomain.com/en",
        es: "https://yourdomain.com/es",
        fr: "https://yourdomain.com/fr",
        de: "https://yourdomain.com/de",
        it: "https://yourdomain.com/it",
      },
    },
  };
}
