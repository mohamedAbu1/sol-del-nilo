// src/app/[locale]/login/page.tsx أو layout.tsx

export async function generateMetadata({ params }) {
  const locale = params.locale;

  const metadataByLocale = {
    en: {
      title: "Login to Your Account | SolDelNilo",
      description:
        "Access your personalized travel dashboard with SolDelNilo. Log in to manage your bookings, explore magical Egyptian tours, and continue your journey.",
    },
    es: {
      title: "Inicia sesión en tu cuenta | SolDelNilo",
      description:
        "Accede a tu panel de viajes personalizado con SolDelNilo. Gestiona tus reservas y explora Egipto.",
    },
    de: {
      title: "Melde dich an | SolDelNilo",
      description:
        "Greife auf dein persönliches Reisedashboard zu. Verwalte Buchungen und entdecke Ägypten mit SolDelNilo.",
    },
    fr: {
      title: "Connectez-vous à votre compte | SolDelNilo",
      description:
        "Accédez à votre tableau de bord personnalisé et explorez l'Égypte avec SolDelNilo.",
    },
    it: {
      title: "Accedi al tuo account | SolDelNilo",
      description:
        "Accedi al tuo pannello di viaggio personalizzato e scopri l'Egitto con SolDelNilo.",
    },
  };

  const fallback = {
    title: "Login to Your Account | SolDelNilo",
    description: "Access your travel dashboard and explore Egypt.",
  };

  const selected = metadataByLocale[locale] || fallback;

  return {
    title: selected.title,
    description: selected.description,
    openGraph: {
      title: selected.title,
      description: selected.description,
      url: `https://yourdomain.com/${locale}/login`,
      images: [
        {
          url: "https://yourdomain.com/assets/Copilot_20250908_231423.png",
          width: 1200,
          height: 630,
          alt: "SolDelNilo Login",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: selected.title,
      description: selected.description,
      images: ["https://yourdomain.com/assets/Copilot_20250908_231423.png"],
    },
    alternates: {
      canonical: `https://yourdomain.com/${locale}/login`,
      languages: {
        en: "https://yourdomain.com/en/login",
        es: "https://yourdomain.com/es/login",
        de: "https://yourdomain.com/de/login",
        fr: "https://yourdomain.com/fr/login",
        it: "https://yourdomain.com/it/login",
      },
    },
  };
}
