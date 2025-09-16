// src/app/[locale]/register/page.tsx أو layout.tsx

export async function generateMetadata({ params }) {
  const locale = params.locale;

  const metadataByLocale = {
    en: {
      title: "Create Your Account | SolDelNilo",
      description:
        "Join SolDelNilo and start your journey through Egypt. Sign up now to access personalized tours, magical experiences, and exclusive offers.",
    },
    es: {
      title: "Crea tu cuenta | SolDelNilo",
      description:
        "Únete a SolDelNilo y comienza tu viaje por Egipto. Regístrate para acceder a tours personalizados y experiencias mágicas.",
    },
    de: {
      title: "Erstelle dein Konto | SolDelNilo",
      description:
        "Begib dich mit SolDelNilo auf eine Reise durch Ägypten. Jetzt registrieren und exklusive Touren entdecken.",
    },
    fr: {
      title: "Créez votre compte | SolDelNilo",
      description:
        "Rejoignez SolDelNilo et commencez votre aventure en Égypte. Inscrivez-vous pour accéder à des circuits personnalisés.",
    },
    it: {
      title: "Crea il tuo account | SolDelNilo",
      description:
        "Unisciti a SolDelNilo e inizia il tuo viaggio in Egitto. Registrati per accedere a tour personalizzati e esperienze magiche.",
    },
  };

  const fallback = {
    title: "Create Your Account | SolDelNilo",
    description: "Join SolDelNilo and start your Egyptian journey.",
  };

  const selected = metadataByLocale[locale] || fallback;

  return {
    title: selected.title,
    description: selected.description,
    openGraph: {
      title: selected.title,
      description: selected.description,
      url: `https://yourdomain.com/${locale}/register`,
      images: [
        {
          url: "https://yourdomain.com/assets/Copilot_20250908_231423.png",
          width: 1200,
          height: 630,
          alt: "SolDelNilo Registration",
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
      canonical: `https://yourdomain.com/${locale}/register`,
      languages: {
        en: "https://yourdomain.com/en/register",
        es: "https://yourdomain.com/es/register",
        de: "https://yourdomain.com/de/register",
        fr: "https://yourdomain.com/fr/register",
        it: "https://yourdomain.com/it/register",
      },
    },
  };
}
